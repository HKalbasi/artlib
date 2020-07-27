import SVGO from "svgo";
import fs from "fs";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const fileCache = new Map();

const getFromCache = async ({ address, mime }) => {
  if (fileCache.has(address)) return fileCache.get(address);
  const t = (await readFile(address)).toString('base64');
  const data = `data:${mime};base64,${t}`;
  fileCache.set(address, data);
  return data;
};

export const compile = async (obj) => {
  const { tag, params, children } = obj;
  if (tag === 'textNode') return children;
  if (tag === undefined) throw new Error('bad object: '+JSON.stringify(obj));
  const at = (await Promise.all(Object.keys(params).map(async (x) => {
    if (x === 'href') {
      return `xlink:href="${await getFromCache(params[x])}"`;
    }
    if (x === 'transform') {
      if (typeof params[x] === 'string') {
        return `${x}="${params[x]}"`;
      }
      const value = params[x]
        .map(({ tag, params }) => `${tag}(${params.join(',')})`)
        .join(' ');
      return `${x}="${value}"`;
    }
    return `${x}="${params[x]}"`
  }))).join(' ');
  if (children.length === 0) {
    return `<${tag} ${at}/>`;
  }
  const ch = (await Promise.all(children.map(async (x) => compile(x)))).join('');
  return `<${tag} ${at}>${ch}</${tag}>`;
};

export const svg = async (element, { viewBox = '0 0 100 100' }) => 
`<?xml version="1.0" standalone="no"?>
<svg viewBox="${viewBox}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${
  await compile(element)
}</svg>`;

const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    removeDimensions: true,
  }]
});

export const storeSVG = async (path, element, params = {}) => {
  const r = await svgo.optimize(await svg(element, params));
  await writeFile(path, r.data);
};

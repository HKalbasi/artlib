import SVGO from "svgo";
import fs from "fs";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

export const compile = ({ tag, params, children }) => {
  if (tag === 'textNode') return children;
  const at = Object.keys(params).map(x => {
    if (x === 'transform') {
      const value = params[x]
        .map(({ tag, params }) => `${tag}(${params.join(',')})`)
        .join(' ');
      return `${x}="${value}"`;
    }
    return `${x}="${params[x]}"`
  }).join(' ');
  if (children.length === 0) {
    return `<${tag} ${at}/>`;
  }
  const ch = children.map(x => compile(x)).join('');
  return `<${tag} ${at}>${ch}</${tag}>`;
};

export const svg = (element, { viewBox = '0 0 100 100' }) => 
`<?xml version="1.0" standalone="no"?>
<svg viewBox="${viewBox}" version="1.1" xmlns="http://www.w3.org/2000/svg">${
  compile(element)
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
  const r = await svgo.optimize(svg(element, params));
  await writeFile(path, r.data);
};

import { svg } from "./image.mjs";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import stp from "svg-to-png";
import { spawn } from "child_process";

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const rmdir = promisify(fs.rmdir);

const objectMap = (object, mapFn) => {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key])
    return result
  }, {});
}

export const captureAt = (x, time) => {
  if (typeof x !== 'object') return x;
  if (x.tag === '#animated') {
    return captureAt(x.value(time), time);
  }
  if (x.tag === '#timeTransform') {
    return captureAt(x.value, x.transform(time));
  }
  if (x instanceof Array) {
    return x.map(k => captureAt(k, time));
  }
  return objectMap(x, k => captureAt(k, time));
};

export const renderAt = (ani, time, param = {}) => {
  return svg(captureAt(ani, time), param);
};

export const generateMp4 = async (ani, address, dur, fps, param = {}) => {
  let time = new Date;
  const passed = () => {
    const r = ((new Date) - time) / 1000;
    time = new Date;
    return `in ${r} seconds`;
  };
  const sp = path.join(address, 'svg');
  const pp = path.join(address, 'png');
  await rmdir(address, { recursive: true });
  await mkdir(sp, {recursive: true });
  await Promise.all(Array.from(Array(dur * fps)).map(async (_, i) => {
    await writeFile(path.join(sp, i+'.svg'), renderAt(ani, i/fps, param));
  }));
  console.log(`finished svg frames ${passed()}`);
  await stp.convert(sp, pp);
  console.log(`finished png ${passed()}`);
  const child = spawn(
    'ffmpeg', [
      '-framerate', '24', '-i', `${pp}/%d.png`,
      '-vf', 'format=yuv420p', `${address}/output.mp4`
    ]
  );
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  await new Promise((res) => {
    child.on('close', () => res());
  });
  console.log(`finished ${passed()}`);
};

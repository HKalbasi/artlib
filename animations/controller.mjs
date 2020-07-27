import { functionWrapper } from "./interpolation.mjs";
import { nothing } from "../base.mjs";

export const timelineSwitch = (ar) => {
  return functionWrapper((time) => {
    for (let i = 1; i < ar.length; i += 2) {
      if (time < ar[i]) return ar[i-1];
    }
    return ar[ar.length - 1];
  });
};

export const shift = (value) => (ani) => {
  return {
    tag: '#timeTransform',
    transform: t => t - value,
    value: ani,
  };
};

/**
 * 
 * @param {[[Number, any]]} ar
 */
export const shiftSwitch = (ar) => {
  const r = [nothing];
  let t = 0;
  ar.forEach(e => {
    r.push(t);
    r.push(shift (t) (e[1]));
    t += e[0];
  });
  return timelineSwitch(r);
};

export const scaleSpeed = (c, origin = 0) => (ani) => {
  return {
    tag: '#timeTransform',
    transform: t => origin + (t - origin) * c,
    value: ani,
  };
};

export const reverse = (origin) => scaleSpeed(-1, origin);
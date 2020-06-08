import { functionWrapper } from "./interpolation.mjs";

export const timelineSwitch = (ar) => {
  return functionWrapper((time) => {
    for (let i = 1; i < ar.length; i += 2) {
      if (time < ar[i]) return ar[i-1];
    }
    return ar[ar.length - 1];
  });
};

export const shift = (ani, value) => {
  return {
    tag: '#timeTransform',
    transform: t => t - value,
    value: ani,
  };
};
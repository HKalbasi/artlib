import { timelineSwitch } from "./controller.mjs";
import { nothing } from "../base.mjs";
import { linear } from "./interpolation.mjs";
import { g } from "../base.mjs";

export const appear = (time) => (ani) => {
  return timelineSwitch([
    nothing, time, ani,
  ]);
};

export const fadeIn = (time, dur) => (ani) => {
  return timelineSwitch([
    nothing,
    time,
    g([ani], {
      opacity: linear([time, 0], [time+dur, 1]),
    }),
    time+dur,
    ani,
  ]);
};
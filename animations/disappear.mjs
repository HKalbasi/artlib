import { timelineSwitch } from "./controller.mjs";
import { nothing } from "../base.mjs";
import { linear } from "./interpolation.mjs";
import { g } from "../base.mjs";

export const fadeOut = (ani, time, dur) => {
  return timelineSwitch([
    ani,
    time,
    g([ani], {
      opacity: linear([time, 1], [time+dur, 0]),
    }),
    time+dur,
    nothing,
  ]);
};
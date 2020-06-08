import { timelineSwitch } from "./controller.mjs";
import { nothing } from "../base.mjs";
import { linear } from "./interpolation.mjs";
import { g } from "../base.mjs";

export const fadeIn = (ani, time, dur) => {
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
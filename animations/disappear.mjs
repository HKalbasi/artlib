import { timelineSwitch } from "./controller.mjs";
import { nothing, pipe, scale } from "../base.mjs";
import { linear } from "./interpolation.mjs";
import { g } from "../base.mjs";

export const fadeOut = (time, dur) => (ani) => {
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

export const zoom = (time, dur) => (ani) => {
  return timelineSwitch([
    ani,
    time,
    pipe(ani,scale(linear([time, 1], [time+dur, 0]))),
    time+dur,
    nothing,
  ]);
};

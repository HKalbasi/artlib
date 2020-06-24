import { timelineSwitch } from "./controller.mjs";
import { nothing } from "../base.mjs";
import { linear } from "./interpolation.mjs";
import { g } from "../base.mjs";
import { move } from "../base.mjs";

export const moveDur = (x, y, dur, time = 0) => (ani) => {
  return timelineSwitch([
    ani,
    time,
    move(
      linear([time, 0], [time + dur, x]),
      linear([time, 0], [time + dur, y]),
    )(ani),
    time+dur,
    move(x, y)(ani),
  ]);
};
import { scale } from "../base.mjs";
import { functionWrapper } from "./interpolation.mjs";
import { pipe } from "../base.mjs";
import { timelineSwitch } from "./controller.mjs";
import { move, scale as scaleTransform } from "../base.mjs";


export const zoomCamera = (scale, [ix, iy], [fx, fy], start, end) => (ani) => {
  const rs = Math.log(scale);
  return timelineSwitch([
    ani,
    start,
    functionWrapper(t => {
      const k = (t - start) / (end-start);
      const sx = ix + (fx - ix) * k;
      const sy = iy + (fy - iy) * k;
      return pipe(
        ani,
        move(-sx, -sy),
        scaleTransform(Math.exp(rs * k)),
        move(ix, iy),
      );
    }),
    end,
    pipe(
      ani,
      move(-fx, -fy),
      scaleTransform(scale),
      move(ix, iy),
    ),
  ]);
};

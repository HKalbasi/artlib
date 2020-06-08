import { scale } from "../base.mjs";
import { functionWrapper } from "./interpolation.mjs";
import { g } from "../base.mjs";
import { timelineSwitch } from "./controller.mjs";
import { move, scale as scaleTransform } from "../base.mjs";


export const zoomToCenter = (ani, scale, [ix, iy], [fx, fy], start, end) => {
  const rs = Math.log(scale);
  return timelineSwitch([
    ani,
    start,
    functionWrapper(t => {
      const k = (t - start) / (end-start);
      const sx = ix + (fx - ix) * k;
      const sy = iy + (fy - iy) * k;
      return move(
        scaleTransform(
          move(ani, -sx, -sy),
          Math.exp(rs * k)
        ),
        ix, iy
      );
    }),
    end,
    move(scaleTransform(move(ani, -fx, -fy), scale), ix, iy),
  ]);
};

import {
  g, circle, line, move, polygon, nothing, pipe, scale,
} from "../../base.mjs";

export const doc = (px, py, content = nothing) => {
  const x = 9, y = 13, k = 4, d = 2;
  const stroke = 'black', fill = 'white';
  const doc = pipe(
    g([
      polygon({
        points: `0,0 0,${y} ${x},${y} ${x},${k} ${x-k},0 0,0`,
      }),
    ], {
      style: `stroke-width: 0.8; stroke: ${stroke}; stroke-linecap: square; fill: ${fill}`,
    }),
    move(-x/2, -y/2),
    scale(d, d),
  );
  return pipe(
    g([
      doc, content,
    ]),
    move(px, py),
  );
};

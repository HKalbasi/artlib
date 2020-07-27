import { 
  g, circle, path, line, move, pipe, scale,
} from "../../../base.mjs";

export const baseHead = g([
  circle({ cx: 0, cy: 0, r: 30, stroke: "black", 'stroke-width': 5, fill: "none" }),
  circle({ cx: -10, cy: -10, r: 3 }),
  circle({ cx: 10, cy: -10, r: 3 }),
]);

export const happyHead = g([
  baseHead,
  path({
    d: " M 18 8 A 20 20 0 0 1 -18 8",
    stroke: "black", 'stroke-width': 5, fill: "none",
  }),
]);

export const sadHead = g([
  baseHead,
  pipe(
    path({
      d: " M 18 8 A 20 20 0 0 1 -18 8",
      stroke: "black", 'stroke-width': 5, fill: "none",
    }),
    scale(-1),
    move(0, 20),
  ),
]);

export const evilHappyHead = g([
  happyHead,
  line({
    x1: -12, y1: -22, x2: -2, y2: -12,
    stroke: "black", 'stroke-width': 5, fill: "none",
  }),
  line({
    x1: 12, y1: -22, x2: 2, y2: -12,
    stroke: "black", 'stroke-width': 5, fill: "none",
  }),
]);

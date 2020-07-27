import { g, line } from "../../../base.mjs";

export const simpleBody = g([
  line({ x1: 0, y1: 30, x2: 0, y2: 90 }),
  line({ x1: 0, y1: 50, x2: -40, y2: 60 }),
  line({ x1: 0, y1: 50, x2: 40, y2: 60 }),
  line({ x1: -10, y1: 140, x2: 0, y2: 90 }),
  line({ x1: 10, y1: 140, x2: 0, y2: 90 }),
], {
  'stroke-width': 5,
  'stroke-linecap': "round",
  stroke: 'black',
});

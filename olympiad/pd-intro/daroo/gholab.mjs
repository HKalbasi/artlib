import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, textC,
} from "../../../base.mjs";
import { functionWrapper as aV } from "../../../animations/interpolation.mjs";
import { daroo } from "../pics/index.mjs";

export const gholab = (long = 200, rot = 0, txt = '1$') => {
  const dcx = 118;
  const dcy = 329;
  const daste = pipe(g([
    path({
      style: "fill:#ffff00;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path4000", d: "m 127.78071,333.9649 a 9.5835533,10.039913 0 1 1 -19.1671,0 9.5835533,10.039913 0 1 1 19.1671,0 z",
      transform: "translate(0,-4.563597)",
    }),
    path({
      style: "fill:#999999;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1", d: "m 110.89541,322.09954 17.79802,39.24694 8.21448,-4.10724 -20.07983,-37.87785 z",
      id: "path4002",
    }),
    path({
      style: "fill:#333333;fill-opacity:1;stroke:#000000;stroke-width:0.50000000000000000;stroke-linecap:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0",
      id: "path4004",
      d: "m 141.47151,361.34647 a 6.8453956,7.301755 0 1 1 -13.69079,0 6.8453956,7.301755 0 1 1 13.69079,0 z",
      transform: "translate(-0.4563597,0)",
    }),
    circle({ cx: dcx, cy: dcy, r: 3, fill: 'red' }),
  ]), move(-dcx, -dcy), rotate(rot), move(dcx, dcy));
  return pipe(g([
    path({
      style: "fill:#ffff00;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1",
      d: "m 36.141845,398.68085 69.702125,-82.60993 11.61702,11.61702 -60.666664,87.77305 c -7.804157,-1.05287 -16.258462,-2.08671 -20.652481,-16.78014 z",
    }),
    path({
      style: "fill:#ffff00;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1", d: "m 36.141845,398.68085 69.702125,-82.60993 11.61702,11.61702 -60.666664,87.77305 c -7.804157,-1.05287 -16.258462,-2.08671 -20.652481,-16.78014 z",
    }),
    path({
      style: "fill:#808000;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1", d: "M 109.71631,312.19858 C 223.71087,175.48521 330.93109,64.461706 393.68795,30.808508 301.69896,101.91367 209.94164,207.90031 121.33333,321.23404 z", id: "path2995",
    }),
    path({
      style: "fill:#0000ff;fill-opacity:1;stroke:#989800;stroke-width:1.17200005000000007;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path2997", d: "m 136.8227,339.30496 a 22.588654,21.943262 0 1 1 -45.177307,0 22.588654,21.943262 0 1 1 45.177307,0 z", transform: "translate(3.8723404,-10.326241)"
    }),
    path({
      style: "fill:none;stroke:#000000;stroke-width:1.17200005;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path3001", d: "m 400.68381,79.088005 a 1.5972589,8.4426546 0 1 1 -3.19452,0 1.5972589,8.4426546 0 1 1 3.19452,0 z", transform: "matrix(0.36754784,-0.25878538,0.27892956,0.34831755,226.67607,110.99129)"
    }),
    path({
      style: "fill:none;stroke:#000000;stroke-width:1.17200005;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path3001-6", d: "m 400.68381,79.088005 a 1.5972589,8.4426546 0 1 1 -3.19452,0 1.5972589,8.4426546 0 1 1 3.19452,0 z", transform: "matrix(0.51395222,-0.26765753,0.36288387,0.39615424,83.07535,181.80661)"
    }),
    path({
      style: "fill:none;stroke:#000000;stroke-width:1.17200005;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path3001-3", d: "m 400.68381,79.088005 a 1.5972589,8.4426546 0 1 1 -3.19452,0 1.5972589,8.4426546 0 1 1 3.19452,0 z", transform: "matrix(0.41997463,-0.43591518,0.41233199,0.41954842,46.644962,321.00294)"
    }),
    path({
      style: "fill:none;stroke:#000000;stroke-width:1.17200005;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0", id: "path3001-34", d: "m 400.68381,79.088005 a 1.5972589,8.4426546 0 1 1 -3.19452,0 1.5972589,8.4426546 0 1 1 3.19452,0 z", transform: "matrix(0.54802284,-0.44435916,0.49800168,0.47284811,-74.158331,395.3454)"
    }),
    path({
      style: "fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1",
      d: "m 138.73335,323.92498 c 13.19531,-17.09738 39.22663,-52.97832 48.37413,-66.62851 23.39311,-23.05349 47.56947,-50.99425 61.1522,-73.93027 18.83901,-13.72259 56.16724,-48.73312 70.27939,-74.84299 35.21228,-21.221886 63.46751,-57.670592 77.58115,-73.017556 -7.41464,98.941336 -0.0907,100.570596 -2.3602,"+long,
    }),
    daste,
    move(390, long+50)(g([
      daroo, textC(txt, 100, 0, 30, '#0f0'),
    ])),
  ]), scale(0.70));
};

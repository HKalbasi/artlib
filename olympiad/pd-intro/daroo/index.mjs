import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, textC, polygon,
} from "../../../base.mjs";
import { zirnevis } from "../../zirnevis.mjs";
import { timelineSwitch } from "../../../animations/controller.mjs";
import { functionWrapper as aV } from "../../../animations/interpolation.mjs";
import { moveDur } from "../../../animations/effect.mjs";
import { fadeIn } from "../../../animations/appear.mjs";
import { gholab } from "./gholab.mjs";
import { hand } from "./hand.mjs";
import { zoomCamera } from "../../../animations/zoom.mjs";
import { reverse } from "../../../animations/controller.mjs";
import { shift } from "../../../animations/controller.mjs";
import { scaleSpeed } from "../../../animations/controller.mjs";

const timeToMoney = (t) => {
  const b = Math.floor(t/2.5);
  return '1'+'0'.repeat(b)+'$';
};

const skin = [
  '#f1c27d', '#e0ac69', '#ffdbac', '#5d5524', '#c68642',
];

const death = [5, 7.5, 100, 2.5, 100];

const hands = (t) => [...Array(5).keys()].map(i => pipe(
  hand(skin[i]),
  move(180 + 40*i, 250),
  move(0, -t*8),
  moveDur(0, 200, 2, death[i]),
));

export const darooScene = g([
  timelineSwitch([
    pipe(
      g([
        gholab(250, 0, '1$'),
        ...hands(0),
      ]),
      zoomCamera(4, [200, 150], [390*0.7, 300*0.7], -3.5, -1.5),
      reverse(0),
      fadeIn(0, 0.5),
    ),
    4,
    pipe(
      aV(t=>g([
        gholab(250 - t*15, -t*300, timeToMoney(t)),
        ...hands(t),
      ])),
      scaleSpeed(1.5),
      shift(4),
    ),
  ]),
  zirnevis([
    'مثلا در زمینه دارو، درصد قابل توجهی از انسان ها',
    3,
    'به علت قیمت بالای بعضی از دارو ها',
    6,
    'نمی توانند آن را تهیه کنند',
    7.5,
    'قیمتی که تماما متاثر از انحصار دارو و قوانین مالکیت فکری است',
  ]),
]);
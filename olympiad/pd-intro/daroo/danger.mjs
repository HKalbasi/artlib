import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, textC, polygon,
} from "../../../base.mjs";
import { zirnevis } from "../../zirnevis.mjs";
import { danger } from "../pics/index.mjs";
import { blink } from "../../../animations/effect.mjs";


export const dangerScene = g([
  g([
    pipe(
      danger,
      scale(3),
      move(200, 150),
      blink(0.5),
    ),
  ]),
  zirnevis([
    'این مساله می تواند خطرناک باشد',
  ])
]);

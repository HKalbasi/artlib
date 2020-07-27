import { debugAnimation } from "../serve/animation.mjs";
import { g, path } from "../base.mjs";
import { linear } from "../animations/interpolation.mjs";
import { circle } from "../base.mjs";
import { move, scale } from "../base.mjs";
import { rect } from "../base.mjs";
import { zoomToCenter } from "../animations/zoom.mjs";
import { fadeOut } from "../animations/disappear.mjs";
import { generateMp4 } from "../render/animation.mjs";
import { rootFolder } from "../paths.mjs";
import { timelineSwitch } from "../animations/controller.mjs";
import { text } from "../base.mjs";
import { fadeIn } from "../animations/appear.mjs";
import { shift } from "../animations/controller.mjs";
import { join } from "path";

const background = rect({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  fill: '#0ff',
});

const land = rect({
  x: 0,
  y: 70,
  width: 100,
  height: 30,
  fill: '#0a0',
});

const apple = g([
  rect({
    x: 2,
    y: 0,
    width: 2,
    height: 3,
  }),
  circle({
    cx: 3,
    cy: 4,
    r: 2,
    fill: '#f05',
  }),
]);

const tree = g([
  rect({
    x: 20,
    y: 30,
    width: 10,
    height: 50,
    fill: 'brown',
  }),
  g([
    circle({
      cx: 20,
      cy: 30,
      r: 10,
    }),
    circle({
      cx: 30,
      cy: 30,
      r: 10,
    }),
    circle({
      cx: 25,
      cy: 20,
      r: 10,
    }),
  ], {
    style: 'fill: #0b0',
  }),
]);

const ro = g([
  background, land,
  fadeOut(tree, 2.8, 0.5),
  move(apple, 30, 30),
]);

const scene1 = zoomToCenter(ro, 10, [50, 50], [33, 33], 1, 3);

const bigApple = scale(apple, 10);

const message = (txt, st, en) => fadeOut(fadeIn(text({
  text: txt, x: 50, y: 90,
  style: 'font-size: 10px; text-anchor: middle;',
}), st, 0.2), en, 0.2);

const scene2 = g([
  background,
  move(bigApple, 20, 20),
  message('این یک سیب است', 0.3, 1.1),
  message('سیب یک میوه است', 1.4, 2.2),
]);

const heart = scale(move(path({
  d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z',
  fill: '#f00',
}), -50, -50), 0.3);

const goodbye = g([
  rect({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: '#000',
  }),
  text({
    text: 'تهیه شده توسط', x: 50, y: 40,
    style: 'font-size: 10px; text-anchor: middle; fill:white;',
  }),
  text({
    text: 'حمیدرضا کلباسی', x: 50, y: 60,
    style: 'font-size: 10px; text-anchor: middle; fill:white;',
  }),
  move(heart, 50, 80),
]);

const all = timelineSwitch([
  scene1,
  3.3,
  shift(scene2, 3),
  5.5,
  goodbye,
])

const main = () => {
  //debugAnimation(all);
  generateMp4(all, join(rootFolder, 'example', 'output'), 6, 24);
};

main();
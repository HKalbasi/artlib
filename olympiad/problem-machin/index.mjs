import { debugAnimation } from "../../serve/animation.mjs";
import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, text,
} from "../../base.mjs";
import { zirnevis } from "../zirnevis.mjs";
import { timelineSwitch } from "../../animations/controller.mjs";
import { moveDur } from "../../animations/effect.mjs";
import { zoomCamera } from "../../animations/zoom.mjs";
import { fadeIn } from "../../animations/appear.mjs";
import { fadeOut } from "../../animations/disappear.mjs";
import { generateMp4 } from "../../render/animation.mjs";
import { join } from "path";
import { rootFolder } from "../../paths.mjs";

const background = rect({
  x: 0, y: 0, height: 300, width: 400, fill: '#939',
});

const tala = g([
  circle({ r: 10, fill: '#ff0' }),
]);

const car = g([
  rect({ x: -12, y: -17, height: 33, width: 22, fill: '#000', }),
  move(-25, -25)(path({
    d: `M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759
    c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z
    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713
    v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336
    h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z`,
    fill: '#f00',
  })),
]);

const shahrFunc = (n, obj = []) => {
  const gr = grid(n);
  const alamat = g([
    rect({
      x: 4, y: 2, width: 2, height: 6, fill: '#f0f',
    }),
    rect({
      y: 4, x: 2, width: 6, height: 2, fill: '#f0f',
    }),
  ]);
  return move(-35, -35) (g([
    gr,
    pipe(
      tala,
      scale(0.4),
      move(35, 35),
    ),
    ...obj.map(([x, y]) => pipe(
      alamat,
      move(x*10, y*10),
    )),
  ]));
};

const shahr1 = shahrFunc(7, [
  [0, 0],
  [1, 2],
  [4, 3],
  [3, 4],
  [5, 4],
]);

const carPath = (x, y, t, ...l) => {
  let s = t;
  const ar = [0];
  l.forEach(([d, l]) => {
    ar.push(s);
    if (d === 'U') ar.push(0);
    if (d === 'D') ar.push(180);
    if (d === 'L') ar.push(270);
    if (d === 'R') ar.push(90);
    s += l*0.3;
  });
  s = t;
  return pipe(
    car,
    rotate(timelineSwitch(ar)),
    scale(0.2),
    move(10*x, 10*y),
    ...l.map(([d, l]) => {
      s += l*0.3;
      if (d === 'U') {
        return moveDur(0, -l*10, l*0.3, s-l*0.3);
      }
      if (d === 'D') {
        return moveDur(0, l*10, l*0.3, s-l*0.3);
      }
      if (d === 'L') {
        return moveDur(-l*10, 0, l*0.3, s-l*0.3);
      }
      if (d === 'R') {
        return moveDur(l*10, 0, l*0.3, s-l*0.3);
      }
    }),
    move(-30, -30),
  );
}

const initTala = pipe(
  tala,
  scale(10),
  move(200, 170),
  moveDur(80, 0, 0.5, 2),
  zoomCamera(0.4 * 0.1 * 3.5, [200, 130], [280, 170], 4, 5),
);

const sceneInit = g([
  fadeOut(4.5, 0.5) (text({
    text: 'جویندگان طلا', x: 200, y: 50,
    style: 'font-size: 30px; text-anchor: middle; fill:white;',
  })),
  initTala,
  pipe(
    car,
    scale(4),
    move(-40, 170),
    moveDur(150, 0, 0.5, 2),
    fadeOut(4.5, 0.5),
  ),
]);

const sceneCar = g([
  pipe(
    car,
    rotate(90),
    scale(5),
    move(200, 150),
  ),
]);

const sceneShahr = g([
  pipe(
    g([
      fadeIn(5.5, 0.5)(shahr1),
      carPath(
        3,9,13, ['U', 5], ['R', 2], ['U', 10],
      ),
      carPath(
        9,3,16, ['L', 5], ['D', 10],
      ),
      carPath(
        5,9,19, ['U', 5], ['L', 2], ['U', 1],
      ),
    ]),
    scale(3.5),
    move(200, 130),
  ),
  initTala,
]);

const sceneVictory = g([
  text({
    text: 'پیروزی', x: 200, y: 50,
    style: 'font-size: 30px; text-anchor: middle; fill:white;',
  }),
  pipe(
    tala,
    scale(10),
    move(200, 170),
  ),
]);

const scenes = timelineSwitch([
  sceneInit,
  5,
  sceneShahr,
  21.5,
  sceneVictory,
]);

const all = g([
  background,
  scenes,
  zirnevis([
    'جویندگان طلا',
    2,
    'شما می خواید با این ماشین طلا رو به دست بیارید',
    5,
    'طلا توی مرکز این شهره',
    7,
    'قوانین این شهر به ما می گه که توی هر خونه ای که علامت داره باید بپیچیم',
    10,
    'و توی هر خونه بی علامت باید مستقیم بریم',
    13,
    'مثلا اگه از این جا ها شروع کنیم نمی تونیم به طلا برسیم',
    18,
    'اما اگه از این جا شروع کنیم می تونیم به طلا برسیم',
    22,
    'آیا می تونین یه روشی بدین که مستقل از علامت های شهر، به طلا برسیم؟',
  ]),
]);

const main = () => {
  //debugAnimation(all, { viewBox: '0 0 400 300' });
  generateMp4(all, join(rootFolder, 'olympiad', 'problem-machin', 'output'), 30, 24, { 
    viewBox: '0 0 400 300' 
  });
  //*/
};

main();

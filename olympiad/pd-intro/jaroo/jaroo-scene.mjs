import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, textC, polygon,
} from "../../../base.mjs";
import { zirnevis } from "../../zirnevis.mjs";
import { jaroo1, jaroo2, money, lock, ghabr } from "../pics/index.mjs";
import { heads, bodies, human } from "../line-man/index.mjs";
import { timelineSwitch } from "../../../animations/controller.mjs";
import { functionWrapper as aV } from "../../../animations/interpolation.mjs";
import { shift, scaleSpeed } from "../../../animations/controller.mjs";
import { linear } from "../../../animations/interpolation.mjs";
import { zoomCamera } from "../../../animations/zoom.mjs";
import { fadeIn } from "../../../animations/appear.mjs";
import { fadeOut } from "../../../animations/disappear.mjs";
import { moveDur } from "../../../animations/effect.mjs";

const simpleMan = human(heads.happyHead, bodies.simpleBody);
const evilMan = human(heads.evilHappyHead, bodies.simpleBody);
const sadMan = human(heads.sadHead, bodies.simpleBody);

const enhesargar = g([
  pipe(
    jaroo2, move(-70, 100), moveDur(-50,20,0.8, 2),
  ),
  fadeOut(2, 0.8) (simpleMan),
]);

const data = (() => {
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
    scale(10, 10),
  );
  return g([
    doc, jaroo2,
  ]);
})();

const sandogh = (r = 90)=>{
  const k1 = 60, k2 = 40;
  const dar = pipe(
    path({ d: `M 0 0 Q -${k1} -${k1} -${2*k1} 0 Z`, fill: '#c90' }),
    rotate(r),
    move(k1, 1),
  );
  return g([
    path({ d: `M -${k1} 0 L ${k1} 0 L ${k2} 50 L -${k2} 50 Z`, fill: '#c90' }),
    dar,
  ]);
};

const docInSandogh = (() => {
  const x = aV((t) => {
    if (t < 0) return 80;
    if (t > 1) return 300;
    return 80+t*220;
  });
  const y = aV((t) => {
    if (t < 0) return 200;
    if (t > 1) return 200;
    return 100 + 400 * (t - 0.5) ** 2;
  });
  const sz = aV((t) => {
    if (t < 0) return 1;
    if (t > 1) return 0.2;
    return Math.exp(Math.log(0.2)*t);
  });
  return g([
    ...[...Array(10).keys()].map(i => {
      return pipe(
        data,
        scale(sz, sz),
        move(x, y),
        scaleSpeed(0.5),
        fadeIn(0, 0.2),
        shift(i*0.2 + 3),
      );
    }),
    pipe(
      sandogh(80), move(300, 170), fadeIn(3, 0.5),
    ),
  ]);
})();

const sandoghLock = pipe(
  g([
    sandogh(linear([7, 80], [8, 0], 'interval')),
    pipe(
      lock,
      scale(0.7),
      move(0, 10),
      fadeIn(7.8, 0.4),
    ),
  ]),
  move(300, 170),
  zoomCamera(3, [200, 120], [300, 170], 7, 8),
);

const moneyObj = (index) => {
  const dy = index % 2 === 0 ? -50 : 0;
  const dxf = (i) => {
    if (i%2 === 0) return dxf(i+1) + 50;
    if (i === 5) return 30;
    if (i === 3) return 80;
    if (i === 1) return 130;
  };
  const dx = dxf(index);
  return pipe(
    money,
    scale(0.5),
    move(75 + index * 50 , 330),
    moveDur(0, -60, 0.8, 11),
    moveDur(dx, dy, 1, 16),
  );
};

const voroodMamnoo = (txt, fx, fy) => {
  const dx = 25, dy = 7;
  return pipe(
    g([
      circle({ r: 30, fill: 'red' }),
      rect({ x: -dx, y: -dy, height: 2*dy, width: 2*dx, fill: 'white' }),
      textC(txt, 0, dy - 4, 2*dy - 4, 'black'),
    ]),
    scale(linear([13, 0], [15, 1], 'interval')),
    moveDur(fx, fy, 2, 13),
  );
};

const battle = pipe(
  g([
    pipe(
      g([
        pipe(
          jaroo2, move(-70, 100),
        ),
        timelineSwitch([simpleMan, 13, evilMan]),
        textC('5000$', -80, 40, 20, '#0a0'),
        voroodMamnoo('Patent', -290, 180),
        voroodMamnoo('I.P.', -220, 180),
        voroodMamnoo('Copyright', -150, 180),
      ]),
      move(330, 40),
    ),
    pipe(
      g([
        pipe(
          jaroo1, move(70, 100),
        ),
        timelineSwitch([simpleMan, 17, sadMan]),
        textC('500$', 70, 40, 20, '#0a0'),
      ]),
      move(70, 40),
    ),
    ...[...Array(6).keys()].map(moneyObj),
    pipe(
      ghabr, scale(4.1),
      move(110, 500), moveDur(0, -300, 1, 19),
    ),
  ]),
);

export const jarooScene = g([
  timelineSwitch([
    move(200, 80) (enhesargar),
    3,
    docInSandogh,
    7,
    fadeOut(9.4, 0.5) (sandoghLock),
    10,
    pipe(
      battle,
      zoomCamera(3, [200, 150], [330, 40], 20.2, 21.2),
      zoomCamera(8, [200, 150], [200, 150], 21.2, 23),
    ),
  ]),
  zirnevis([
    'فرض کنید که شخصی یک جاروبرقی اختراع کرده است',
    3,
    'او در ابتدا روش ساخت آن را مخفی می کند',
    6,
    'تا تنها خودش بتواند جاروبرقی بسازد',
    10,
    'سپس حتی اگر کسی یک جاروی بهتر و ارزان تر بسازد',
    13,
    'با قوانین مالکیت فکری مثل پتنت، آن را محدود می کند',
    17,
    'و بازار را در انحصار خودش می گیرد',
  ]),
]);

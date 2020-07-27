import {
  g, circle, line, move, polygon, nothing, pipe, scale,
} from "../../../base.mjs";
import { zirnevis } from "../../zirnevis.mjs";
import { jaroo1, jaroo2, mind } from "../pics/index.mjs";
import { shiftSwitch } from "../../../animations/controller.mjs"
import { moveDur } from "../../../animations/effect.mjs"
import { appear } from "../../../animations/appear.mjs"
import { doc } from "../util.mjs";

const aadamak = (x, y) => {
  const color = '#0f0';
  return move(x, y)(g([
    circle({
      cx: 0, cy: -15, r: 10, fill: color,
    }),
    g([
      line({
        x1: 0, y1: -15, x2: 0, y2: 15,
      }),
      line({
        x1: 0, y1: 0, x2: 15, y2: -5,
      }),
      line({
        x1: 0, y1: 0, x2: -15, y2: -5,
      }),
      line({
        x1: 0, y1: 15, x2: 15, y2: 30,
      }),
      line({
        x1: 0, y1: 15, x2: -15, y2: 30,
      }),
    ], {
      style: `stroke-width: 4; stroke: ${color}; stroke-linecap: round`,
    }),
  ]))
};

const peoplePos = [
  [50, 50],
  [200, 55],
  [350, 35],
  [110, 150],
  [300, 190],
  [280, 90],
  [50, 250],
  [210, 230],
  [370, 260],
];

const people = peoplePos.map(([x,y]) => aadamak(x,y));

const emptyDocPos = [
  [80, 70],
  [230, 55],
  [310, 45],
  [150, 180],
  [340, 150],
  [240, 140],
  [100, 250],
  [250, 240],
  [340, 250],
  [40, 150],
  [140, 80],
];

const jarooB = scale(0.2)(jaroo2);
const jarooG = scale(0.15)(jaroo1);

const jarooTree = {
  time: 0, angle: 70, pic: jarooB,
  children: [{
    time: 0.7, angle: -45,
    children: [{
      time: 1.1, angle: 200,
      children: [],
    }, {
      time: 1.1, angle: 0,
      children: [{
        time: 0.5, angle: -25,
        children: [],
      }, {
        time: 1, angle: 75,
        children: [],
      }],
    }],
  }, {
    time: 1, angle: 70,
    children: [{
      time: 1, angle: 180,
      children: [],
    }],
  }],
};

const upgradeJarooTree = {
  time: 0, angle: 0, pic: jarooG,
  children: [{
    time: .7, angle: 80,
    children: [],
  }, {
    time: 0.8, angle: -130,
    children: [{
      time: 1, angle: -65,
      children: [],
    }, {
      time: .7, angle: -150,
      children: [{
        time: .9, angle: 100,
        children: [{
          time: .8, angle: 200,
          children: [{
            time: .8, angle: 140,
            children: [],
          }],
        }],
      }, {
        time: 1.6, angle: 180,
        children: [],
      }],
    }],
  }],
};

const goDir = (x, y, angle, t) => {
  const a = angle * Math.PI / 180;
  const k = 100 * t;
  return [
    x + Math.cos(a) * k,
    y + Math.sin(a) * k,
  ];
};

const dfs = (root, x, y, t, defaultPic) => {
  const {
    time, angle, children, pic = defaultPic,
    delay = 0.3,
  } = root;
  const ct = t + delay;
  const ft = time + ct;
  const [fx, fy] = goDir(x, y, angle, time);
  return [
    pipe(
      doc(x, y, pic),
      moveDur(fx - x, fy - y, ft - ct, ct),
      appear(t),
    ),
    ...children.map((k)=>dfs(k, fx, fy, ft, pic)).flat(),
  ];
};

const emptyDoc = emptyDocPos.map(([x, y]) => doc(x, y));

export const pdScene = g([
  shiftSwitch([
    [2, pipe(
      mind,
      scale(3),
      move(200, 150),
    )],
    [12,g([
      ...people,
      ...emptyDoc,
      ...dfs(jarooTree, 150, 150, 1),
      ...dfs(upgradeJarooTree, 335, 197, 6),
    ])],
  ]),
  zirnevis([
    'راه حل چیست؟',
    2,
    'داده های عمومی',
    4,
    'داده هایی که عموم جامعه مالک آن است',
    7,
    'هر کسی می تواند از آن استفاده کند',
    10,
    'یا آن را بهبود دهد',
  ]),
]);
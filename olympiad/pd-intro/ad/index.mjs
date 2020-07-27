import {
  g, circle, line, move, rotate, pipe, scale,
} from "../../../base.mjs";
import { zirnevis } from "../../zirnevis.mjs";
import { lock, bugle } from "../pics/index.mjs";
import { timelineSwitch } from "../../../animations/controller.mjs"
import { moveDur } from "../../../animations/effect.mjs"
import { appear } from "../../../animations/appear.mjs"
import { zoom as zd, fadeOut } from "../../../animations/disappear.mjs"
import { doc } from "../util.mjs";
import { thinker, logo } from "../pics/index.mjs";

const lockDoc = doc(
  0, 0, scale(0.15) (lock),
);

const lockDocPos = [
  [100, 200, 5,  840, 0.2],
  [170, 150, 10, 780, 0.7],
  [140, 100, 7,  120, 1.2],
  [350, 250, 3,  260, 1.7],
  [320, 50,  2,  300, 2.2],
  [260, 50,  4,  440, 2.7],
  [300, 250, 6,  580, 3.2],
];

const lockScene = g(lockDocPos.map(([x, y, s, r, t]) => pipe(
  lockDoc,
  scale(s),
  rotate(r),
  move(x, y),
  appear(t),
)));

const bolandgoo = pipe(g([
  bugle,
  pipe(
    lock,
    scale(0.2),
    move(10, -5),
  ),
]), scale(1.4));

const bolandgooPos = [
  [60,  50],
  [60, 160],
  [70, 260],
];

const bolandgooR = [
  -30, 0, 20,
];

const adver = g([
  pipe(
    thinker,
    scale(2),
    move(200, 500),
    moveDur(0, -300, 0.5, 4),
  ),
  pipe(
    lock,
    move(155, -50),
    moveDur(0, 100, 0.5, 4),
    moveDur(45, 0, 1, 9),
  ),
  pipe(
    logo,
    zd(9, 1),
    move(240, -50),
    moveDur(0, 100, 0.5, 4),
  ),
  g(bolandgooPos.map(([x, y], i) => pipe(
    bolandgoo,
    rotate(bolandgooR[i]),
    move(600-x, y),
    moveDur(-200, 0, 1, 7),
  ))),
  g(bolandgooPos.map(([x, y], i) => pipe(
    bolandgoo,
    rotate(bolandgooR[i]),
    scale(-1,1),
    move(x-200, y),
    moveDur(200, 0, 1, 7),
  ))),
])

export const adScene = g([
  timelineSwitch([
    lockScene,
    4,
    fadeOut(11.5, 0.4) (adver),
  ]),
  zirnevis([
    'شما صرفا داده های انحصاری را بیشتر می بینید',
    4,
    'چون تبلیغات انحصار کننده مردم را به سمت داده های انحصاری تشویق کرده است',
    8,
    'با این که جایگزین هایی با کیفیت بهتر وجود دارد که خودشان مالک آن هستند',
  ]),
]);
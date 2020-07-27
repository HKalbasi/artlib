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
    'داده های عمومی',
    5,
    'در حدود ۳۰۰ سال پیش',
    8,
    'چیزی به نام حق تکثیر وجود نداشت',
    10,
    'هر کسی می توانست هر کتابی را بخواند یا رونویسی کند',
    10,
    'یا از کتاب خانه ها به امانت بگیرد',
    10,
    'علم بشر، که تقریبا تمام آن در کتاب ها قرار داشت',
    14,
    'در اختیار همه بود',
    10,
    'با اختراع ماشین چاپ',
    10,
    'سود جویان به این فکر افتادند که می توانند با ایجاد',
    10,
    'قانونی به نام حق تکثیر',
    10,
    'که تکثیر یک کتاب را تنها به اولین ناشر اجازه می دهد',
    10,
    'به سود هنگفت برسند',
    10,
    'و این مقدمه چیزی شد که امروزه آن را به عنوان مالکیت فکری می شناسیم',
    10,
    'چیزی که با آن از قضایای ریاضی تا دی ان ای ویروس ها را به نام خود می زنیم',
    10,
    'اما مشکل چیست؟',
    10,
    'این انحصار ناعادلانه، بعضا خطرناک است',
    10,
    'فرض کنید سازنده جارو به جای انحصار آن',
    50,
    'آن را در اختیار همه می گذاشت',
    10,
    'و جامعه به بهبود و کم هزینه کردن آن می پرداخت',
    10,
    'همه از جارو سود می بردند، نه فقط انحصار کننده',
    10,
    'اما ما چه کار می توانیم بکنیم؟',
    10,
    'ما از همه دعوت می کنیم که داده هایشان را انحصار نکنند',
    10,
    'اما نه یک دعوت خالی',
    10,
    'ما از داده های انحصاری استفاده نمی کنیم',
    10,
    'و تنها از داده های عمومی استفاده می کنیم',
    10,
    'تا انحصار کننده ضرر کند',
    10,
    'و به این نتیجه برسد که داده هایش را عمومی کند',
    10,
    'اما مگر ممکن است؟',
    10,
    'بله',
    10,
    'داده های عمومی گسترده تر از چیزی هستند که فکر می کنید',
    10,
    'و در بعضی زمینه ها شما را از داده های انحصاری بی نیاز می کنند',
    10,
    'مثلا نیمی از پایگاه های وب، بدون هیچ داده انحصاری اداره می شوند',
    10,
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    '',
    10,
    
  ]),
]);


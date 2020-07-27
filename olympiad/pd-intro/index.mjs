import { debugAnimation } from "../../serve/animation.mjs";
import {
  g, rect, circle, nothing, move, pipe, scale, path, rotate,
  grid, text,
} from "../../base.mjs";
import { zirnevis } from "../zirnevis.mjs";
import { shiftSwitch } from "../../animations/controller.mjs";
import { moveDur } from "../../animations/effect.mjs";
import { zoomCamera } from "../../animations/zoom.mjs";
import { fadeIn } from "../../animations/appear.mjs";
import { fadeOut } from "../../animations/disappear.mjs";
import { generateMp4 } from "../../render/animation.mjs";
import { join } from "path";
import { rootFolder } from "../../paths.mjs";
import { jarooScene } from "./jaroo/jaroo-scene.mjs";
import { darooScene } from "./daroo/index.mjs";
import { dangerScene } from "./daroo/danger.mjs";
import { pdScene } from "./pd/index.mjs";
import { adScene } from "./ad/index.mjs";


const background = rect({
  x: 0, y: 0, height: 300, width: 400, fill: '#939',
});

const all = g([
  background,
  shiftSwitch([
    [100, adScene],
    [23, jarooScene],
    [3, dangerScene],
    [12, darooScene],
    [14, pdScene],
    [5, nothing],
  ]),
]);

const main = () => {
  debugAnimation(all, { viewBox: '0 0 400 300' });
  /*generateMp4(all, join(rootFolder, 'olympiad', 'pd-intro', 'output'), 60, 24, { 
    viewBox: '0 0 400 300' 
  });*/
};

main();
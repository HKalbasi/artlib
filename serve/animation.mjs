import http from "http";
import { svg } from "../render/image.mjs";
import fs from "fs";
import path from "path";
import { rootFolder } from "../paths.mjs";
import { renderAt } from "../render/animation.mjs";

export const debugAnimation = (ani, param = {}) => {
  http.createServer((req, res) => {
    if (req.url.endsWith('.svg')) {
      res.end(renderAt(ani, Number(req.url.slice(1,-4)), param));
    }
    else {
      fs.createReadStream(path.join(rootFolder, 'serve', 'aniClient.html')).pipe(res);
    }
  }).listen(8182);
};
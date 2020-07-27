import { image, move, pipe } from "../../../base.mjs";
import path from "path";
import { rootFolder } from "../../../paths.mjs";

export const jaroo1 = pipe(
  image(
    path.join(rootFolder, 'olympiad/pd-intro/pics/jaroo1.svg'),
  ),
  move(-50, -50),
);

export const jaroo2 = pipe(
  image(
    path.join(rootFolder, 'olympiad/pd-intro/pics/jaroo2.svg'),
  ),
  move(-50, -50),
);

export const lock = pipe(
  image(
    path.join(rootFolder, 'olympiad/pd-intro/pics/lock.svg'),
  ),
  move(-50, -50),
);

export const money = pipe(
  image(
    path.join(rootFolder, 'olympiad/pd-intro/pics/money.svg'),
  ),
  move(-50, -50),
);

export const ghabr = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/ghabr.svg')),
  move(-50, -50),
);

export const daroo = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/daroo.svg')),
  move(-50, -50),
);

export const danger = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/danger.svg')),
  move(-50, -50),
);

export const mind = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/mind.svg')),
  move(-50, -50),
);

export const bugle = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/bugle.svg')),
  move(-50, -50),
);

export const thinker = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/thinker.svg')),
  move(-50, -50),
);

export const logo = pipe(
  image(path.join(rootFolder, 'olympiad/pd-intro/pics/logo.svg')),
  move(-50, -50),
);


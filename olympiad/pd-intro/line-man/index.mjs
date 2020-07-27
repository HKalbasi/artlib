import { g, pipe, move, scale } from "../../../base.mjs";
import * as heads from "./head.mjs";
import { simpleBody } from "./body.mjs";

export { heads };

export const bodies = {
  simpleBody,
}

export const human = (head, body, size = 1, x = 0, y = 0) => {
  return pipe(
    g([head, body]),
    scale(size, size),
    move(x, y),
  );
};

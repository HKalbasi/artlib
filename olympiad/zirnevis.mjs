import { text } from "../base.mjs";
import { timelineSwitch } from "../animations/controller.mjs";

export const zirnevisElement = (txt) => {
  return text({
    text: txt, x: 200, y: 280,
    style: 'font-size: 10px; text-anchor: middle; fill:white;',
  });
};

export const zirnevis = (ar) => {
  return timelineSwitch(ar.map((x, i) => {
    if (i % 2 == 0) {
      return zirnevisElement(x);
    }
    else {
      return x;
    }
  }));
};

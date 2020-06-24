export const element = (tag) => (params, children = []) => {
  Object.keys(params).forEach(x => {
    if (params[x] === undefined) throw new Error('bad param');
  });
  return {
    tag, params, children,
  };
};

export const elementG = (tag) => (children, params = {}) => {
  Object.keys(params).forEach(x => {
    if (params[x] === undefined) throw new Error('bad param');
  });
  return {
    tag, params, children,
  };
};


export const circle = element('circle');
export const rect = element('rect');
export const polygon = element('polygon');
export const line = element('line');
export const path = element('path');
export const g = elementG('g');
export const nothing = g([]);

export const text = ({ text, ...params }) => {
  return element('text')({ ...params }, [{
    tag: 'textNode',
    children: text,
  }]);
}

export const move = (x, y) => (element) => {
  return g([element], {
    transform: [{
      tag: 'translate',
      params: [x, y],
    }]
  });
};

export const pipe = (element, ...f) => {
  f.forEach(ff => {
    element = ff(element);
  });
  return element;
};

export const scale = (x = 1, y = x) => (element) => {
  return g([element], {
    transform: [{
      tag: 'scale',
      params: [x, y],
    }]
  });
};

export const rotate = (degree, x = 0, y = 0) => (element) => {
  return g([element], {
    transform: [{
      tag: 'rotate',
      params: [degree, x, y],
    }]
  });
};

export const mask = (e, mask) => {
  return g([
    element('mask')({ id: 'mask1' }, [mask]),
    g([e], { mask: 'url(#mask1)' }),
  ]);
};

export const grid = (n) => {
  return g([
    ...[...Array(n + 1).keys()].map(i => {
      return line({ x1: i*10, y1: 0, x2: i*10, y2: n*10});
    }),
    ...[...Array(n + 1).keys()].map(i => {
      return line({ y1: i*10, x1: 0, y2: i*10, x2: n*10});
    }),
  ], {
    style:`stroke-width: 1; stroke: #0f0;`
  });
};

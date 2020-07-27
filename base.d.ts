type Animated<T> = T | { tag: '#animatedValue', value: (Number) => T };

interface Element2D {
  tag: string,
  params: object,
  children: Array<Element2D>,
};

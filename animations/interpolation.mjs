export const functionWrapper = (f) => ({
  tag: '#animated',
  value: f,
});

export const linear = ([p1, v1], [p2, v2], type = 'simple') => {
  if (type === 'simple') {
    const a = (v1-v2)/(p1-p2);
    const b = v1-a*p1;
    return functionWrapper((x) => a*x+b);
  }
  if (type === 'zigzag') {
    const d = p2-p1;
    const a = (v1-v2)/(p1-p2);
    const b1 = v1-a*p1;
    const b2 = v2+a*p2;
    return functionWrapper((x) => {
      const t = Math.floor((x-p1)/d);
      const nx = x - t*d;
      if (t % 2 === 0) {
        return a * nx + b1;
      }
      return -a * (nx+d) + b2;
    });
  }
  throw new Error("bad type");
};

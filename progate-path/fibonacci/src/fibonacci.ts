// `n` must be integer (not floating point)
export const fibonacci = (n: number): number => {
  if (n <= 0) return 0;
  let prev = 0;
  let now = 1;
  for (let i = 2; i <= n; ++i) {
    const newValue = prev + now;
    prev = now;
    now = newValue;
  }
  return now;
};

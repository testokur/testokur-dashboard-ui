export default (s: string) => {
  return s.replace(/(-\w)/g, (m) => {
    return m[1].toUpperCase();
  });
};

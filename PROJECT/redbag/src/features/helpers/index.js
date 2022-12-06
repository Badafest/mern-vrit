export const randomId = () => {
  const firstPart = Date.now();
  const secondPart = Date.now();
  return parseInt(
    (Math.random() * firstPart) / 98 +
      (Math.random() * secondPart) / Math.random()
  );
};

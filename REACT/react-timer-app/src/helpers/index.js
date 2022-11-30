const hmsToSeconds = (timerString) => {
  const hourMinuteSecond = timerString.split(" ").map(parseFloat);
  return (
    hourMinuteSecond[0] * 3600 + hourMinuteSecond[1] * 60 + hourMinuteSecond[2]
  );
};

const addZeroes = (number) => `${number < 10 ? 0 : ""}${number}`;

const secondsToHms = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - hours * 60;
  const secondsLeft = Math.floor(seconds - minutes * 60 - hours * 3600);

  return `${addZeroes(hours)}h ${addZeroes(minutes)}m ${addZeroes(
    secondsLeft
  )}s`;
};

export { addZeroes, hmsToSeconds, secondsToHms };

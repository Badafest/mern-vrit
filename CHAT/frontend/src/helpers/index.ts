export const timeDiff = (time: string) => {
  const then = Date.parse(time);
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);
  const secs = seconds % 60;
  const mins = (Math.floor(seconds - secs) / 60) % 60;
  const hours = (Math.floor(seconds - secs - mins * 60) / 3600) % 24;
  const days =
    (Math.floor(seconds - secs - mins * 60 - hours * 3600) / 86400) % 30;

  if (days > 2) {
    return new Date(time).toLocaleString();
  }
  if (days === 2) {
    return "day before yesterday";
  }
  if (days === 1) {
    return "yesterday";
  }
  if (hours > 0) {
    return hours + " hours ago";
  }
  if (mins > 0) {
    return mins + " minutes ago";
  }
  if (secs > 10) {
    return secs + " seconds ago";
  }
  return "a few seconds ago";
};

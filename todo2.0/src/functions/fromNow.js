const fromNow = (thenTime) => {
  const nowTime = new Date();
  let seconds = Math.floor((nowTime.getTime() - thenTime) / 1000);
  if (seconds < 60) {
    return seconds === 0 ? "just now" : `${seconds} secs ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - minutes * 60);
    return `${minutes} min ${seconds} secs ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60 - hours * 60);
    seconds = Math.floor(seconds - minutes * 60 - hours * 3600);
    return `${hours} hr ${minutes} min ${seconds} secs ago`;
  } else if (seconds < 2592000) {
    const days = Math.floor(seconds / 86400);
    return days > 1 ? `${days} days ago` : "1 day ago";
  } else if (seconds < 31104000) {
    const months = Math.floor(seconds / 2592000);
    return months > 1 ? `${months} months ago` : "1 month ago";
  } else {
    const years = Math.floor(seconds / 31104000);
    return years > 1 ? `${years} years ago` : "1 year ago";
  }
};

export default fromNow;

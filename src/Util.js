export function range (start, end) {
  return Array.from({ length: (end - start + 1) }, (value, key) => key + start);
};

export function padZero (number, length = 2) {
  return ("00" + number).slice(-length);
}

export function convertTime (time) {
  const absTime = Math.abs(time);
  const hour = Math.floor(absTime / 3600);
  const minute = Math.floor(absTime / 60) % 60;
  const second = Math.floor(absTime % 60) % 60;
  return { hour, minute, second };
}
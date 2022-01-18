export function getMilliSeconds(time) {
  const target = new Date();
  target.setHours(...time, 0);
  return target - new Date();
}

export function timeToArray(time) {
  if(!time) return null;
  return time.split(":").map((e) => parseInt(e));
}

export function getRandomId(length) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = lower.toUpperCase();
  let tempString = "";
  const all = [...lower, ...upper , ..."0123456789"];
  for (let i = 0; i < length; i++)
    tempString += all[Math.floor(Math.random() * all.length)];
  return tempString;
}

// dateUtils.js
export function formatDate() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;

  return `${hour}:${minute}:${second}`;
}

export function dateFormat(fmt, time) {
  const date = new Date(time);
  let ret;
  const opt = {

    "Y+": date.getFullYear().toString(),

    "m+": (date.getMonth() + 1).toString(),

    "d+": date.getDate().toString()

  };

  for (const k in opt) {
    ret = new RegExp(`(${k})`).exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1? opt[k] : opt[k].padStart(ret[1].length, '0')
      );
    }
  }

  return fmt;
}

export function get1stAndToday() {
  const toData = new Date(new Date().toLocaleDateString()).getTime();
  const yesterdayStart = toData - 3600 * 24 * 1000;
  const yesterdayEnd = yesterdayStart + 24 * 60 * 60 * 1000 - 1;

  const startDay1 = dateFormat('YYYY-mm-dd', yesterdayStart);
  const endDay1 = dateFormat('YYYY-mm-dd', yesterdayEnd);

  return [startDay1, endDay1];
}

export function getDay() {
  const toData = new Date(new Date().toLocaleDateString()).getTime();
  const yesterdays = toData - 3600 * 24 * 1000;

  const yesterday = dateFormat('YYYY.mm.dd', yesterdays);
  const today = dateFormat('YYYY.mm.dd', toData);

  return [yesterday, today];
}

export function past7Day() {
  const toData = new Date(new Date().toLocaleDateString()).getTime();
  const past7daysStart = toData - 7 * 3600 * 24 * 1000;
  const past7daysEnd = toData - 1;

  const days7Start = dateFormat('YYYY-mm-dd', past7daysStart);
  const days7End = dateFormat('YYYY-mm-dd', past7daysEnd);

  return [days7Start, days7End];
}

export function past30Day() {
  const toData = new Date(new Date().toLocaleDateString()).getTime();
  const past30daysStart = toData - 30 * 3600 * 24 * 1000;
  const past30daysEnd = toData - 1;

  const days30Start = dateFormat('YYYY-mm-dd', past30daysStart);
  const days30End = dateFormat('YYYY-mm-dd', past30daysEnd);

  return [days30Start, days30End];
}

export function pastWeek() {
  const toData = new Date(new Date().toLocaleDateString()).getTime();
  const nowDayOfWeek = new Date().getDay();
  const weekStartData = toData - (nowDayOfWeek - 1) * 24 * 60 * 60 * 1000;
  const weekEndData = toData + (7 - nowDayOfWeek) * 24 * 60 * 60 * 1000;

  const weekStart = dateFormat('YYYY-mm-dd', weekStartData);
  const weekEnd = dateFormat('YYYY-mm-dd', weekEndData);

  return [weekStart, weekEnd];
}

export function pastMonth() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const monthStartData = new Date(year, month, 1).getTime();
  const monthEndData = new Date(year, month + 1, 0).getTime() + 24 * 60 * 60 * 1000 - 1;

  const monthStart = dateFormat('YYYY-mm-dd', monthStartData);
  const monthEnd = dateFormat('YYYY-mm-dd', monthEndData);

  return [monthStart, monthEnd];
}
/* eslint-disable no-restricted-syntax, no-bitwise, no-prototype-builtins  */

const throwIfInvalidDate = date => {
  if (Object.prototype.toString.call(date, null) !== '[object Date]') {
    throw new Error('The parameter type is incorrect.');
  }
};

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const convertDate = (date, format) => {
  let str = format;
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  if (/(Y+)/.test(format)) {
    str = str.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length),
    );
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      str = str.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : `00${o[k]}`.substr(o[k].toString().length),
      );
    }
  }

  return str;
};

const nextYear = (now, index = 0) => {
  throwIfInvalidDate(now);
  return new Date(
    now.getFullYear() + index,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );
};

const nextMonth = (now, index = 0) => {
  throwIfInvalidDate(now);
  const year = now.getFullYear();
  const month = now.getMonth() + index;
  const dayOfMonth = Math.min(now.getDate(), daysInMonth(year, month));
  return new Date(
    year,
    month,
    dayOfMonth,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );
};

const nextDate = (now, index = 0) => {
  throwIfInvalidDate(now);
  return new Date(now.getTime() + index * 24 * 60 * 60 * 1000);
};

const nextHour = (now, index = 0) => {
  throwIfInvalidDate(now);
  return new Date(now.getTime() + index * 60 * 60 * 1000);
};

const nextMinute = (now, index = 0) => {
  throwIfInvalidDate(now);
  return new Date(now.getTime() + index * 60 * 1000);
};

const nextSecond = (now, index = 0) => {
  throwIfInvalidDate(now);
  return new Date(now.getTime() + index * 1000);
};

const getTimeType = format => {
  const typeMap = {
    Y: 'Year',
    M: 'Month',
    D: 'Date',
    h: 'Hour',
    m: 'Minute',
    s: 'Second',
  };

  for (const key in typeMap) {
    if (typeMap.hasOwnProperty(key)) {
      if (~format.indexOf(key)) {
        return typeMap[key];
      }
    }
  }
  return null;
};

export {
  convertDate,
  nextYear,
  nextMonth,
  nextDate,
  nextHour,
  nextMinute,
  nextSecond,
  getTimeType,
  throwIfInvalidDate,
  daysInMonth,
};

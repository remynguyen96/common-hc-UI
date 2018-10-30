import {
  throwIfInvalidDate,
  daysInMonth,
  convertDate,
  nextYear,
  nextMonth,
  nextDate,
  nextHour,
  nextMinute,
  nextSecond,
  getTimeType,
} from '../time';

const initialDate = 'November 29, 2018 06:30:00';
describe('utils/time.js', () => {
  let date;
  beforeEach(() => {
    date = new Date(initialDate);
  });

  test('throwIfInvalidDate should return true', () => {
    const result = throwIfInvalidDate(date);
    expect(result).toBeUndefined();
  });

  test('throwIfInvalidDate should return error', () => {
    let result;
    try {
      throwIfInvalidDate(date.getTime());
    } catch (err) {
      result = err.message;
    }
    expect(result).toBe('The parameter type is incorrect.');
  });

  test('daysInMonth should return number', () => {
    const result = daysInMonth(date.getYear(), date.getMonth());
    expect(result).toBe(30);
  });

  test('convertDate should return string', () => {
    const month = convertDate(date, 'M');
    const day = convertDate(date, 'D');
    const hour = convertDate(date, 'h');
    const minute = convertDate(date, 'm');
    const second = convertDate(date, 's');
    expect(month).toBe('11');
    expect(day).toBe('29');
    expect(hour).toBe('6');
    expect(minute).toBe('30');
    expect(second).toBe('0');
  });

  test('nextYear should return Date', () => {
    const index = 6;
    const nextYearWithoutIndex = nextYear(date);
    expect(nextYearWithoutIndex.getTime()).toBe(date.getTime());

    const nextYearWithIndex = nextYear(date, index);
    const timeNextYear = new Date();
    timeNextYear.setTime(date.getTime());
    timeNextYear.setYear(timeNextYear.getFullYear() + index);
    expect(nextYearWithIndex.getTime()).toBe(timeNextYear.getTime());
  });

  test('nextMonth should return Date', () => {
    const index = 5;
    const nextMonthWithoutIndex = nextMonth(date);
    expect(nextMonthWithoutIndex.getTime()).toBe(date.getTime());

    const nextMonthWithIndex = nextMonth(date, index);
    const timeNextMonth = new Date();
    timeNextMonth.setTime(date.getTime());
    timeNextMonth.setMonth(timeNextMonth.getMonth() + index);
    expect(nextMonthWithIndex.getTime()).toBe(timeNextMonth.getTime());
  });

  test('nextDate should return Date', () => {
    const index = 4;
    const nextDateWithoutIndex = nextDate(date);
    expect(nextDateWithoutIndex.getTime()).toBe(date.getTime());

    const nextDateWithIndex = nextDate(date, index);
    const timeNextDate = new Date();
    timeNextDate.setTime(date.getTime());
    timeNextDate.setDate(timeNextDate.getDate() + index);
    expect(nextDateWithIndex.getTime()).toBe(timeNextDate.getTime());
  });

  test('nextHour should return Date', () => {
    const index = 3;
    const nextHourWithoutIndex = nextHour(date);
    expect(nextHourWithoutIndex.getTime()).toBe(date.getTime());

    const nextHourWithIndex = nextHour(date, index);
    const timeNextHour = new Date();
    timeNextHour.setTime(date.getTime());
    timeNextHour.setHours(timeNextHour.getHours() + index);
    expect(nextHourWithIndex.getTime()).toBe(timeNextHour.getTime());
  });

  test('nextMinute should return Date', () => {
    const index = 2;
    const nextMinuteWithoutIndex = nextMinute(date);
    expect(nextMinuteWithoutIndex.getTime()).toBe(date.getTime());

    const nextMinuteWithIndex = nextMinute(date, index);
    const timeNextMinute = new Date();
    timeNextMinute.setTime(date.getTime());
    timeNextMinute.setMinutes(timeNextMinute.getMinutes() + index);
    expect(nextMinuteWithIndex.getTime()).toBe(timeNextMinute.getTime());
  });

  test('nextSecond should return Date', () => {
    const index = 1;
    const nextSecondWithoutIndex = nextSecond(date);
    expect(nextSecondWithoutIndex.getTime()).toBe(date.getTime());

    const nextSecondWithIndex = nextSecond(date, index);
    const timeNextSecond = new Date();
    timeNextSecond.setTime(date.getTime());
    timeNextSecond.setSeconds(timeNextSecond.getSeconds() + index);
    expect(nextSecondWithIndex.getTime()).toBe(timeNextSecond.getTime());
  });

  test('getTimeType should return Date', () => {
    const timeYear = getTimeType('Y');
    const timeMonth = getTimeType('M');
    const timeDate = getTimeType('D');
    const timeHour = getTimeType('h');
    const timeMinute = getTimeType('m');
    const timeSecond = getTimeType('s');

    expect(timeYear).toBe('Year');
    expect(timeMonth).toBe('Month');
    expect(timeDate).toBe('Date');
    expect(timeHour).toBe('Hour');
    expect(timeMinute).toBe('Minute');
    expect(timeSecond).toBe('Second');
  });
});

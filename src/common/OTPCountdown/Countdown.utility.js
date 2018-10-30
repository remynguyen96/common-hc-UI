/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export const calculateCountdown = endDate => {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  // clear countdown when date is reached
  if (diff < 0) return false;

  const timeLeft = {
    min: 0,
    sec: 0,
  };

  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = parseInt(diff, 0);

  return timeLeft;
};

/**
 * Add Leading Zero
 *
 * @param  {Number} value   Value need to add zero
 * @return {String}         String value after add leading zero
 */
export const addLeadingZeros = value => {
  let stringValue = String(value);

  while (stringValue.length < 2) {
    stringValue = `0${stringValue}`;
  }
  return stringValue;
};

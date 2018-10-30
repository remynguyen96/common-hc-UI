/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable react/no-did-update-set-state */

import React, { PureComponent } from 'react';
import { noop } from 'lodash';
import { number, func, string } from 'prop-types';
import { calculateCountdown, addLeadingZeros } from './Countdown.utility';

class Countdown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min,
      sec: props.sec,
    };
  }

  static propTypes = {
    min: number.isRequired,
    sec: number.isRequired,
    endTimeCallback: func,
    className: string,
    resetCounter: number,
  };

  static defaultProps = {
    endTimeCallback: noop,
    className: '',
    resetCounter: 0,
  };

  componentDidMount() {
    this.initInterval();
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetCounter !== prevProps.resetCounter) {
      // Stop the current interval
      this.stop();
      this.initInterval();
    }
  }

  /**
   * Stop interval
   * @return {void}
   */
  componentWillUnmount() {
    this.stop();
  }

  /**
   * Init an interval to calculate time after 1 second
   * @return {void}
   */
  initInterval = () => {
    const { min, sec } = this.props;
    const endDate = new Date().getTime() + min * 60 * 1000 + sec * 1000;

    // update every second
    this.interval = setInterval(() => {
      const date = calculateCountdown(endDate);
      date ? this.setState(date) : this.stop();
    }, 1000);
  };

  /**
   * Stop interval & call callback function to notify time end
   * @return {void}
   */
  stop() {
    const { endTimeCallback } = this.props;

    clearInterval(this.interval);
    endTimeCallback && endTimeCallback();
  }

  render() {
    const countDown = this.state;

    return (
      <span className={this.props.className}>
        <span>{addLeadingZeros(countDown.min)}</span>:
        <span>{addLeadingZeros(countDown.sec)}</span>
      </span>
    );
  }
}

export default Countdown;

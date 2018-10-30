/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { PureComponent } from 'react';
import { noop } from 'lodash';
import { func } from 'prop-types';
import classNames from 'classnames';
import { COUNT_DOWN_TEXTS } from './constant';
import Countdown from './Countdown';
import s from './OTPCountdown.css';

class OTPCountdown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      canResend: false,
      resetCounter: 1
    };
  }

  static propTypes = {
    resendOTP: func
  };

  static defaultProps = {
    resendOTP: noop
  };

  /**
   * Show resend text, clear time out count down
   * @return {type} {description}
   */
  resendTimeout = () => {
    this.setState({ canResend: true });
  };

  /**
   * Show count down again & call callback to send OTP
   * @return {type} {description}
   */
  resendOTP = () => {
    const { resendOTP } = this.props;

    this.setState((prevState) => {
      return {
        canResend: false,
        resetCounter: prevState.resetCounter + 1
      };
    });

    resendOTP && resendOTP();
  };

  render() {
    const { canResend, resetCounter } = this.state;
    const retryClass = classNames(s.text, s.smallText);

    return (
      <div className={s.countdown}>
        <span className={s.text}>{COUNT_DOWN_TEXTS.EXPIRED}</span>
        <div>
          <Countdown
            className={s.expiredTime}
            min={5}
            sec={0}
            resetCounter={resetCounter}
          />
        </div>
        {canResend ? (
          <p className={s.resend} onClick={this.resendOTP}>
            {COUNT_DOWN_TEXTS.RESEND}
          </p>
        ) : (
          <p className={retryClass}>
            {COUNT_DOWN_TEXTS.RETRY}{' '}
            <Countdown min={3} sec={0} endTimeCallback={this.resendTimeout} />{' '}
          </p>
        )}
      </div>
    );
  }
}

export default OTPCountdown;

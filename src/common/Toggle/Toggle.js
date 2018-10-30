/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, { PureComponent, createRef } from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';

import s from './Toggle.css';

export default class Toggle extends PureComponent {
  static propTypes = {
    checked: bool,
    className: string,
    disabled: bool,
    onChange: func,
  };

  static defaultProps = {
    checked: false,
    className: null,
    disabled: false,
    onChange: noop,
  };

  inputRef = createRef();

  handleToggle = event => {
    const { onChange, checked, disabled } = this.props;

    if (event.pageX !== 0 && event.pageY !== 0) {
      this.blur();
    }

    if (!disabled && onChange) {
      onChange(!checked, event);
    }
  };

  get currentInput() {
    return this.inputRef.current;
  }

  blur() {
    this.currentInput.blur();
  }

  focus() {
    this.currentInput.focus();
  }

  render() {
    const { onChange, className, disabled, ...others } = this.props;
    const classWrapper = classNames(
      disabled && s.switchDisable,
      className,
    );
    return (
      <label className={classWrapper}>
        <input
          {...others}
          className={s.switchInput}
          onClick={this.handleToggle}
          readOnly
          ref={this.inputRef}
          type="checkbox"
        />
        <span className={classNames(s.switch, s.ripple)} />
      </label>
    );
  }
}

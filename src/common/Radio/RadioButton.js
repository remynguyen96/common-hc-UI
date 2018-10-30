/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-for, css-modules/no-unused-class */
import React, { PureComponent } from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';
import ClassNames from 'classnames';
import Radio from './Radio';
import s from './Radio.css';

class RadioButton extends PureComponent {
  static propTypes = {
    checked: bool,
    className: string,
    disabled: bool,
    label: string,
    name: string,
    onBlur: func,
    onChange: func,
    onFocus: func,
    value: string,
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false,
    label: '',
    name: '',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    value: '',
  };

  handleClick = event => {
    const { checked, disabled, onChange, value } = this.props;
    if (event.pageX !== 0 && event.pageY !== 0) {
      this.blur();
    }
    if (!disabled && !checked && onChange) {
      onChange(value);
    }
  };

  blur() {
    this.inputNode.blur();
  }

  focus() {
    this.inputNode.focus();
  }

  nodeRef = node => {
    this.inputNode = node;
  };

  render() {
    const className = ClassNames(
      this.props.disabled ? s.disabled : s.field,
      this.props.className,
    );
    const { onChange, ...others } = this.props;

    return (
      <label className={className}>
        <input
          {...others}
          className={s.input}
          onClick={this.handleClick}
          readOnly
          ref={this.nodeRef}
          type="radio"
        />
        <Radio checked={this.props.checked} disabled={this.props.disabled} />
        {this.props.label && <span className={s.text}>{this.props.label}</span>}
      </label>
    );
  }
}

export default RadioButton;

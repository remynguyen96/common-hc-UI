/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/label-has-for, react/require-default-props, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */

import React, { PureComponent } from 'react';
import { string, oneOfType, bool, number, func, object } from 'prop-types';
import classNames from 'classnames';
import { isNil, isEmpty, get, trim } from 'lodash';

import Popover from '../Popover';
import s from './Input.css';

const getClassName = (orginalClass, additionalClass, conditional) =>
  classNames(orginalClass, { [additionalClass]: !isNil(conditional) });

const errorIcon = 'error_outline';
const successIcon = 'check';
class Input extends PureComponent {
  /**
   * Input propTypes
   */
  static propTypes = {
    id: string,
    type: string,
    name: string,
    className: string,
    value: oneOfType([string, number]),
    label: string,
    disabled: bool,
    readOnly: bool,
    icon: string,
    onChange: func,
    onBlur: func,
    errorMsg: string,
    touched: oneOfType([bool, object]),
    placeholder: string,
    onMouseDown: func,
    maxLength: number,
    autoFocus: bool,
    require: bool,
  };

  static defaultProps = {
    id: '',
    className: null,
    errorMsg: '',
    touched: false,
    type: 'text',
    maxLength: null,
    autoFocus: false,
    require: false,
  };

  componentDidMount() {
    this.props.autoFocus && this.input.focus();
  }

  get renderErrorIcon() {
    const { touched, errorMsg, value } = this.props;

    // Not render icon for 2 following case:
    // 1. Input not touched
    // 2. Touch but not validate & value is empty
    if (!touched || (isEmpty(value) && errorMsg === '')) return null;

    return errorMsg !== '' ? (
      <Popover
        placement="right"
        className={s.iconError}
        component={<i className="material-icons">{errorIcon}</i>}
      >
        {errorMsg}
      </Popover>
    ) : (
      <span className={s.iconSuccess} role="button">
        <i className="material-icons">{successIcon}</i>
      </span>
    );
  }

  setInput = ref => {
    this.input = ref;
  };

  /**
   * Handle event onChange
   *
   * @param  {SyntheticEvent} event   The Synthetic event
   * @returns {Void}
   */
  handleOnChange = event => {
    const { maxLength, onChange } = this.props;
    const value = get(event, 'target.value') || '';
    const trimValue = trim(value);

    // Don't fire change event for all space characters
    if (value !== trimValue && isEmpty(trimValue)) {
      return;
    }

    // Don't have maxLength, allow to input all
    if (isNil(maxLength)) {
      onChange && onChange(event);
    } else {
      value.length <= maxLength && onChange && onChange(event, null, trimValue);
    }
  };

  /**
   * Handle event onBlur
   *
   * @param  {SyntheticEvent} event   The Synthetic event
   * @returns {Void}
   */
  handleOnBlur = event => {
    this.props.onBlur && this.props.onBlur(event);
  };

  /**
   * Handle event onMouseDown
   *
   * @param  {SyntheticEvent} event   The Synthetic event
   * @returns {Void}
   */
  handleMouseDown = event => {
    this.props.onMouseDown && this.props.onMouseDown(event);
  };

  render() {
    const {
      placeholder,
      name,
      type,
      value,
      disabled,
      readOnly,
      icon,
      label,
      id,
      errorMsg,
      touched,
      maxLength,
      className,
      require,
    } = this.props;
    const wrapperClassName = classNames(className, s.wrapper, {
      [s.hasValue]: !isEmpty(placeholder) || !isEmpty(value),
      [s.hasError]: !isEmpty(errorMsg) && touched,
    });
    const iconClassName = classNames('material-icons', s.icon);
    const inputClassName = getClassName(s.input, s.inputIcon, icon);
    const labelClassName = getClassName(s.label, s.inputIcon, icon);
    const inputProps = type === 'number' ? { pattern: '[0-9]*' } : {};

    return (
      <div className={wrapperClassName}>
        <i className={iconClassName}>{icon}</i>
        <input
          id={id}
          ref={this.setInput}
          placeholder={placeholder}
          type={type}
          name={name}
          className={inputClassName}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onMouseDown={this.handleMouseDown}
          maxLength={maxLength}
          {...inputProps}
        />
        {this.renderErrorIcon}
        <label className={labelClassName} htmlFor={id}>
          {label}
          {require && <sup>(*)</sup>}
        </label>
        <div className={s.underline} />
      </div>
    );
  }
}

export default Input;

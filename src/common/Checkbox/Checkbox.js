/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-for, css-modules/no-unused-class, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import { bool, string, func } from 'prop-types';
import classNames from 'classnames';

import { noop } from 'lodash';

import s from './Check.css';
import Check from './Check';

class Checkbox extends React.Component {
  static propTypes = {
    checked: bool,
    className: string,
    disabled: bool,
    label: string,
    onChange: func,
    error: bool,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    error: false,
    className: '',
    label: '',
    onChange: noop,
  };

  handleToggle = event => {
    const { onChange, checked, disabled } = this.props;

    if (event.pageX !== 0 && event.pageY !== 0) {
      this.blur();
    }

    if (!disabled && onChange) {
      onChange(!checked, event);
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

  /**
   * Handle click on a children, prevent a default action toogle checkbox
   *
   * @param  {Event} event
   * @return {void}
   */
  toogleChildren = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    const {
      onChange,
      label,
      checked,
      disabled,
      children,
      error,
      ...others
    } = this.props;
    const className = classNames(
      s.field,
      disabled && s.disabled,
      this.props.className,
      { [s.textError]: error },
    );
    const textClass = classNames(s.text, { [s.textError]: error });

    return (
      <label className={className}>
        <input
          {...others}
          className={s.input}
          onClick={this.handleToggle}
          readOnly
          ref={this.nodeRef}
          type="checkbox"
        />
        <Check error={error} checked={checked} disabled={disabled} />
        {label && (
          <span className={textClass}>
            {label}
            {children && <span onClick={this.toogleChildren}>{children}</span>}
          </span>
        )}
      </label>
    );
  }
}

export default Checkbox;

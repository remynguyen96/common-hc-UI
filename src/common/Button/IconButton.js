/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PureComponent } from 'react';
import { oneOfType, element, string, bool, func } from 'prop-types';
import classnames from 'classnames';
import { noop } from 'lodash';
import FontIcon from '../FontIcon';
import s from './IconButton.css';

class IconButton extends PureComponent {
  static propTypes = {
    children: oneOfType([string, element]),
    className: string,
    disabled: bool,
    href: string,
    icon: oneOfType([string, element]),
    inverse: bool,
    neutral: bool,
    onMouseLeave: func,
    onMouseUp: func,
    primary: bool,
    smallIcon: bool,
  };

  static defaultProps = {
    children: null,
    disabled: false,
    href: null,
    icon: null,
    inverse: false,
    onMouseLeave: noop,
    onMouseUp: noop,
    className: '',
    neutral: true,
    primary: false,
    smallIcon: false,
  };

  handleMouseUp = event => {
    this.buttonNode.blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  handleMouseLeave = event => {
    this.buttonNode.blur();
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  buttonRef = node => {
    this.buttonNode = node;
  };

  render() {
    const {
      children,
      className,
      href,
      icon,
      inverse,
      neutral,
      primary,
      smallIcon,
      ...others
    } = this.props;
    const element = href ? 'a' : 'button';
    const classes = classnames(
      s.toggle,
      neutral && (primary ? s.primary : s.neutral),
      inverse && s.inverse,
      className,
      { [s.smallIcon]: smallIcon },
    );
    const iconClass = classnames(s.icon, { [s.smallIcon]: smallIcon });

    const props = {
      ...others,
      href,
      ref: this.buttonRef,
      className: classes,
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
    };

    return React.createElement(
      element,
      props,
      icon && <FontIcon className={iconClass} value={icon} />,
      children,
    );
  }
}

export default IconButton;

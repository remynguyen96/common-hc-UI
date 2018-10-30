/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PureComponent } from 'react';
import { oneOfType, func, string, bool, element } from 'prop-types';
import { noop } from 'lodash';
import classNames from 'classnames';
import s from './Button.css';

class Button extends PureComponent {
  static propTypes = {
    onClick: func.isRequired,
    // Disables the button
    disabled: bool,
    // If `link` is set, then the button is gonna be an <a/> tag.
    link: oneOfType([string, bool]),
    // Custom React component for the button.
    component: element,
    // HTML `title` attribute
    title: string,
    // Set to `true` to stretch the button to full width
    stretch: bool,
    // CSS class name
    className: string,
    children: oneOfType([string, element]),
  };

  static defaultProps = {
    onClick: noop,
    disabled: false,
    stretch: false,
    link: false,
    component: null,
    children: null,
    title: '',
    className: '',
  };

  storeInstance = ref => {
    this.button = ref;
  };

  focus = () => this.button.focus();

  linkOnClick = event => {
    const { disabled, onClick } = this.props;

    // Only handle left mouse button clicks
    // ignoring those ones with a modifier key pressed.
    if (
      event.button !== 0 ||
      event.shiftKey ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return;
    }

    if (disabled) {
      return;
    }

    if (onClick) {
      event.preventDefault();
    }

    this.buttonOnClick();
  };

  buttonOnClick = () => {
    const { onClick } = this.props;
    onClick && onClick();
  };

  render() {
    const {
      component,
      link,
      title,
      disabled,
      onClick,
      stretch,
      className,
      children,
      ...rest
    } = this.props;

    const properties = {
      ...rest,
      ref: this.storeInstance,
      title,
      className: classNames(
        s.buttonReset,
        s.button,
        disabled && s.buttonDisabled,
        stretch && s.buttonStretch,
        link && s.buttonResetLink,
        className,
      ),
    };

    if (link) {
      const LinkComponent = component || 'a';

      return (
        <LinkComponent
          href={component ? undefined : link}
          onClick={this.linkOnClick}
          {...properties}
        >
          {children}
        </LinkComponent>
      );
    }

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={this.buttonOnClick}
        {...properties}
      >
        {children}
      </button>
    );
  }
}

export default Button;

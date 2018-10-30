/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PureComponent } from 'react';
import { element, string, oneOfType } from 'prop-types';
import classnames from 'classnames';

class FontIcon extends PureComponent {
  static propTypes = {
    children: element,
    className: string,
    value: oneOfType([string, element]),
  };
  static defaultProps = {
    children: null,
    className: '',
    value: '',
  };

  render() {
    const { children, className, value, ...other } = this.props;
    const classes = classnames(
      { 'material-icons': typeof value === 'string' },
      className,
    );
    return (
      <span className={classes} {...other}>
        {value}
        {children}
      </span>
    );
  }
}

export default FontIcon;

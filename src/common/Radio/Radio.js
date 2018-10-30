/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable css-modules/no-unused-class */

import React, { PureComponent } from 'react';
import { bool, node, func } from 'prop-types';
import { noop } from 'lodash';
import s from './Radio.css';

class Radio extends PureComponent {
  static propTypes = {
    checked: bool,
    children: node,
    onMouseDown: func,
  };

  static defaultProps = {
    checked: false,
    children: null,
    onMouseDown: noop,
  };

  render() {
    const { checked, children, onMouseDown } = this.props;
    const className = checked ? s.radioChecked : s.radio;
    return (
      <div
        onMouseDown={onMouseDown}
        className={className}
        tabIndex="0"
        role="button"
      >
        {children}
      </div>
    );
  }
}

export default Radio;

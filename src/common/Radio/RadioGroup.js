/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, { PureComponent, Children } from 'react';
import { node, string, bool, func } from 'prop-types';
import RadioButton from './RadioButton';
import { isComponentOfType } from '../../utils/isComponentOfType';

class RadioGroup extends PureComponent {
  static propTypes = {
    children: node,
    className: string,
    disabled: bool,
    name: string,
    onChange: func,
    value: string,
  };

  static defaultProps = {
    children: null,
    className: '',
    disabled: false,
    name: '',
    onChange: () => {
    },
    value: '',
  };

  handleChange = value => {
    const { onChange, name } = this.props;
    onChange && onChange(value, name);
  };

  renderRadioButtons() {
    const { children, value, disabled } = this.props;
    return Children.map(
      children,
      (radio, idx) =>
        !isComponentOfType(RadioButton, radio) ? (
          radio
        ) : (
          <RadioButton
            {...radio.props}
            checked={radio.props.value === value}
            disabled={disabled || radio.props.disabled}
            key={idx}
            label={radio.props.label}
            onChange={this.handleChange}
            value={radio.props.value}
          />
        ),
    );
  }

  render() {
    return (
      <div className={this.props.className}>{this.renderRadioButtons()}</div>
    );
  }
}

export default RadioGroup;

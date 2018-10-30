/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable css-modules/no-undef-class */

import React, { Component } from 'react';
import { string, func, bool, arrayOf, instanceOf, oneOfType, object } from 'prop-types';
import { isDate, noop } from 'lodash';
import {
  DATE_FORMAT,
  DATE_DISPLAY,
  DEFAULT_DATE,
  MIN_DATE,
  MAX_DATE,
} from 'constants/date';
import { convertDate } from 'utils/time';
import classNames from 'classnames';
import DatePickerDialog from './DatePickerDialog';
import Overlay from '../Overlay';
import Input from '../Input';
import IconButton from '../Button/IconButton';
import s from './DatePicker.css';

class DatePicker extends Component {
  static propTypes = {
    errorMsg: string,
    label: string,
    name: string,
    onChange: func,
    touched: oneOfType([bool, object]),
    showFormat: string,
    dateFormat: arrayOf(string),
    maxDate: instanceOf(Date),
    minDate: instanceOf(Date),
    value: oneOfType([instanceOf(Date), string]),
    onClickHelpIcon: func,
    leftIcon: bool,
    require: bool,
    className: string,
  };

  static defaultProps = {
    errorMsg: '',
    label: '',
    name: '',
    touched: false,
    onChange: noop,
    showFormat: DATE_FORMAT,
    dateFormat: DATE_DISPLAY,
    value: DEFAULT_DATE,
    minDate: MIN_DATE,
    maxDate: MAX_DATE,
    className: '',
    onClickHelpIcon: noop,
    leftIcon: false,
    require: false,
  };

  state = {
    active: false,
  };

  getValue = () => {
    const { value, showFormat, maxDate } = this.props;
    const date = new Date() > maxDate ? maxDate : new Date();

    if (!isDate(value)) {
      return { value: '', date };
    }

    return { value: convertDate(date, showFormat), date: new Date(value) };
  };

  handleDismiss = () => {
    this.setState({ active: false });
  };

  handleInputMouseDown = event => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ active: true });
  };

  handleSelect = value => {
    const { onChange, name } = this.props;

    onChange && onChange(name, value);
    this.setState({ active: false });
  };

  render() {
    const {
      dateFormat,
      minDate,
      maxDate,
      name,
      label,
      errorMsg,
      touched,
      onClickHelpIcon,
      leftIcon,
      require,
      className,
    } = this.props;
    const { active } = this.state;
    const { date, value } = this.getValue();
    const icon = leftIcon ? 'date_range' : '';
    const inputClass = leftIcon ? null : s.input;

    return (
      <div className={classNames(s.datepicker, className)}>
        <Input
          id={name}
          errorMsg={errorMsg}
          touched={touched}
          label={label}
          icon={icon}
          name={name}
          readOnly
          type="text"
          value={value}
          onMouseDown={this.handleInputMouseDown}
          className={inputClass}
          require={require}
        />
        {!leftIcon && <IconButton icon="date_range" primary />}
        <IconButton
          className={s.helpIcon}
          onMouseUp={onClickHelpIcon}
          icon="help_outline"
          primary
          smallIcon
        />
        {active && (
          <Overlay
            onClick={this.handleDismiss}
            onEscKeyDown={this.handleDismiss}
          >
            <DatePickerDialog
              minDate={minDate}
              maxDate={maxDate}
              dateFormat={dateFormat}
              value={date}
              onSelect={this.handleSelect}
            />
          </Overlay>
        )}
      </div>
    );
  }
}

export default DatePicker;

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
import PropTypes from 'prop-types';
import { isDate, noop } from 'lodash';
import {
  DATE_FORMAT,
  DATE_DISPLAY,
  DEFAULT_DATE,
  MIN_DATE,
  MAX_DATE,
} from 'constants/date';
import classNames from 'classnames';
import { convertDate } from 'utils/time';
import DatePickerDialog from './DatePickerDialog';
import Overlay from '../Overlay';
import Input from '../Input';
import IconButton from '../Button/IconButton';
import s from './DatePicker.css';

class DatePicker extends Component {
  static propTypes = {
    errorMsg: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    touched: PropTypes.bool,
    showFormat: PropTypes.string,
    dateFormat: PropTypes.arrayOf(PropTypes.string),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    onClickHelpIcon: PropTypes.func,
    leftIcon: PropTypes.bool,
    require: PropTypes.bool,
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
    this.props.onChange && this.props.onChange(this.props.name, value);
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
    } = this.props;
    const { active } = this.state;
    const { date, value } = this.getValue();
    const icon = leftIcon ? 'date_range' : '';
    const inputClass = leftIcon ? null : s.input;

    return (
      <div className={classNames(s.datepicker, className)}>
        <Input
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

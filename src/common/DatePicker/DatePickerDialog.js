/* eslint-disable camelcase */
import React, { Component } from 'react';
import { instanceOf, arrayOf, string, func } from 'prop-types';
import { nextDate, getTimeType } from 'utils/time';
import DatePickerItem from './DatePickerItem';
import s from './DatePickerDialog.css';
import { MAPPING_TEXT_DATES } from './constant';

class DatePickerDialog extends Component {
  static propTypes = {
    value: instanceOf(Date),
    minDate: instanceOf(Date).isRequired,
    maxDate: instanceOf(Date).isRequired,
    dateFormat: arrayOf(string).isRequired,
    confirmText: string,
    onSelect: func.isRequired,
  };

  static defaultProps = {
    value: new Date(),
    confirmText: 'Đồng ý',
  };

  constructor(props) {
    super(props);
    this.state = { value: nextDate(this.props.value) };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const date = nextDate(nextProps.value);
    if (date.getTime() !== this.state.value.getTime()) {
      this.setState({ value: date });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const date = nextDate(nextState.value);
    return date.getTime() !== this.state.value.getTime();
  }

  handleFinishBtnClick = () => {
    this.props.onSelect(this.state.value);
  };

  handleDateSelect = value => {
    this.setState({ value });
  };

  render() {
    const { minDate, maxDate, dateFormat, confirmText } = this.props;
    const { value } = this.state;

    return (
      <div className={s.datepicker}>
        <div className={s.datepickerHeader}>
          {dateFormat.map(format => (
            <span key={format}>{MAPPING_TEXT_DATES[getTimeType(format)]}</span>
          ))}
        </div>
        <div className={s.datepickerContent}>
          {dateFormat.map(format => (
            <DatePickerItem
              key={format}
              value={value}
              minDate={minDate}
              maxDate={maxDate}
              format={format}
              onSelect={this.handleDateSelect}
            />
          ))}
        </div>
        <div
          role="button"
          tabIndex="0"
          className={s.datepickerNavbar}
          onClick={this.handleFinishBtnClick}
          onKeyDown={this.handleFinishBtnClick}
        >
          {confirmText}
        </div>
      </div>
    );
  }
}

export default DatePickerDialog;

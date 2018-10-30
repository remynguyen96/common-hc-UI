import React, { Component } from 'react';
import { oneOf, string, func, oneOfType, number, bool } from 'prop-types';
import { toString, noop } from 'lodash';
import {
  setCaretPosition,
  formatInput,
  getCursorPosition,
} from './NumberUtils';
import Input from '../Input';

/* eslint-disable react/no-unused-prop-types, react/no-unused-state */

class NumberInput extends Component {
  static propTypes = {
    thousandSeparator: oneOf([',', '.', true, false]),
    decimalSeperator: oneOf([',', '.', true, false]),
    displayType: oneOf(['input', 'text']),
    prefix: string,
    suffix: string,
    format: oneOfType([string, func]),
    disabled: bool,
    mask: string,
    value: oneOfType([number, string]),
    name: string.isRequired,
    label: string.isRequired,
    touched: oneOfType([bool]),
    errorMsg: string,
    onChange: func,
    onBlur: func,
    maxLength: number,
    id: string.isRequired,
    className: string,
  };

  static defaultProps = {
    thousandSeparator: false,
    displayType: 'input',
    prefix: '',
    suffix: '',
    format: null,
    mask: '',
    decimalSeperator: '.',
    value: null,
    touched: null,
    className: null,
    errorMsg: '',
    onBlur: noop,
    disabled: false,
    maxLength: 0,
    onChange: noop,
  };

  state = {
    value: '',
    numAsString: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.numAsString) {
      const data = formatInput(props.value, props);

      return {
        value: data.formattedValue,
        numAsString: data.value,
      };
    }

    return null;
  }

  onChange = e => {
    e.persist();
    const inputValue = toString(e.target.value);
    const { formattedValue, value } = formatInput(inputValue, this.props);
    let cursorPos = e.target.selectionStart;

    this.setState({ value: formattedValue }, () => {
      cursorPos = getCursorPosition(
        this.props,
        inputValue,
        formattedValue,
        cursorPos,
      );
      setCaretPosition(e, cursorPos);
      this.props.onChange && this.props.onChange(e.target.name, value);
    });

    return value;
  };

  render() {
    const {
      name,
      label,
      className,
      id,
      touched,
      errorMsg,
      onBlur,
      displayType,
      disabled,
    } = this.props;

    if (displayType === 'text') {
      return <span>{this.state.value}</span>;
    }

    return (
      <Input
        name={name}
        id={id}
        label={label}
        className={className}
        touched={touched}
        errorMsg={errorMsg}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    );
  }
}

export default NumberInput;

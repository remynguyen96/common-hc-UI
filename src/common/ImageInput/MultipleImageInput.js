/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/label-has-for, react/require-default-props, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/forbid-prop-types  */

import React, { Component } from 'react';
import { bool, number, string, func, object } from 'prop-types';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import { noop, isEmpty } from 'lodash';

import Popover from '../Popover';
import ImageThumbnail from './ImageThumbnail';
import style from './MultipleImageInput.css';
import IconButton from '../Button/IconButton';

class MultipleImageInput extends Component {
  static propTypes = {
    multiple: bool,
    required: bool,
    min: number,
    max: number,
    label: string,
    rtl: bool,
    errorMsg: string,
    touched: bool,
    onChange: func,
    setFieldTouched: func,
    setFieldError: func,
    name: string,
    value: object,
    require: bool,
    onClickHelpIcon: func,
  };

  static defaultProps = {
    multiple: false,
    required: false,
    min: 0,
    max: 100,
    label: '',
    name: '',
    rtl: false,
    errorMsg: '',
    touched: false,
    setFieldTouched: noop,
    setFieldError: noop,
    onChange: noop,
    value: {},
    require: false,
    onClickHelpIcon: noop,
  };

  constructor(props) {
    super();
    this.state = {
      showPreview: false,
    };
    this.images = props.value;
    this.inputRef = React.createRef();

    this.mobileMenuContainer = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('change', this.handleFileChange);
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('change', this.handleFileChange);
  }

  onClick = () => {
    this.setState({
      showPreview: true,
    });
  };

  onDelete = id => {
    delete this.images[id];

    this.validate();
    this.inputRef.current.value = null;
  };

  onCaptured = imageData => {
    this.images =
      this.props.multiple || this.props.min > 1
        ? Object.assign(this.images, imageData)
        : imageData;
    this.state.showPreview = false;
    this.validate();
  };

  get hasError() {
    const { touched, errorMsg } = this.props;

    return touched && !isEmpty(errorMsg);
  }

  get renderErrorIcon() {
    const { touched, errorMsg } = this.props;

    // Not render icon for 2 following case:
    // 1. Input not touched
    // 2. Touch but not validate & value is empty
    if (!touched || (isEmpty(this.images) && errorMsg === '')) return null;

    return errorMsg !== '' ? (
      <Popover
        placement="right"
        className={style.iconError}
        component={<i className="material-icons">error_outline</i>}
      >
        {errorMsg}
      </Popover>
    ) : (
      <span className={style.iconSuccess} role="button">
        <i className="material-icons">done</i>
      </span>
    );
  }

  handleFileChange = e => {
    const { onChange, name, setFieldTouched, multiple, min } = this.props;
    const reader = new FileReader();

    reader.onload = ev => {
      const file = ev.target.result;

      this.images =
        multiple || min > 1
          ? Object.assign(this.images, { [uuid()]: file })
          : { [uuid()]: file };
      setFieldTouched(name, true);
      onChange && onChange({ target: { name, value: this.images } });
      this.validate();
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  validate() {
    const { name, setFieldError, min, max, required } = this.props;
    const numOfImages = Object.keys(this.images).length;
    let errorMessage = '';

    if (
      numOfImages < min ||
      numOfImages > max ||
      (numOfImages < 1 && required)
    ) {
      if (numOfImages < 1 && required) {
        errorMessage = 'Hình ảnh bắt buộc';
      } else if (numOfImages < min) {
        errorMessage = `Ít nhất ${min} hình`;
      } else {
        errorMessage = `Nhiều nhất ${max} hình`;
      }
    }
    !isEmpty(errorMessage) && setFieldError(name, errorMessage);
  }

  render() {
    const { touched, require, onClickHelpIcon } = this.props;

    return (
      <div
        className={classnames({
          [style.container]: true,
          [style.hasError]: touched && this.hasError,
          [style.hasSuccess]: touched && !this.hasError,
          [style.rtl]: this.props.rtl,
        })}
      >
        <label
          className={classnames({
            [style.hasValue]:
              Object.keys(this.images).length !== 0 || this.props.rtl,
          })}
        >
          {this.props.label}
          {require && <sup>(*)</sup>}
        </label>
        <div className={style.imagelist}>
          {Object.keys(this.images).map(key => (
            <ImageThumbnail
              key={key}
              id={key}
              imageDatum={this.images[key]}
              onDelete={this.onDelete}
            />
          ))}
        </div>
        {this.renderErrorIcon}
        <div className={style.camerabutton} onClick={this.onClick}>
          <span className={`material-icons ${style.icon}`}>photo_camera</span>
          <input
            type="file"
            accept="image/*"
            style={{ position: 'relative', top: 0 }}
            multiple
            ref={this.inputRef}
            onClick={this.onClick}
          />
          )
        </div>
        <IconButton
          onMouseUp={onClickHelpIcon}
          className={classnames(style.helpIcon)}
          icon="help_outline"
          primary
          smallIcon
        />
      </div>
    );
  }
}

export default MultipleImageInput;

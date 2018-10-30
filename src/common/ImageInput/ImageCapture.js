import React, { Component, Fragment } from 'react';
import { string, bool, func } from 'prop-types';
import { isEmpty, noop } from 'lodash';
import Input from '../Input';
import IconButton from '../Button/IconButton';
import TakePhoto from './TakePhoto';
import s from './ImageCapture.css';

class ImageCapture extends Component {
  static propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    name: string.isRequired,
    touched: bool,
    errorMsg: string,
    onChange: func.isRequired,
  };

  static defaultProps = {
    touched: false,
    errorMsg: '',
  };

  state = { captured: false };

  getText = (value, label) =>
    isEmpty(value)
      ? {
        placeholderText: label,
        labelText: '',
      }
      : {
        placeholderText: 'Chạm vào để chỉnh sửa',
        labelText: label,
      };

  handleTakePhoto = () => {
    this.setState({ captured: true });
  };

  handleImageChange = src => {
    this.setState({ captured: false });
    this.props.onChange && this.props.onChange(this.props.name, src);
  };

  render() {
    const { label, value, name, touched, errorMsg } = this.props;
    const { captured } = this.state;
    const { placeholderText, labelText } = this.getText(value, label);

    return (
      <Fragment>
        {captured ? (
          <TakePhoto onChange={this.handleImageChange} />
        ) : (
          <div className={s.container}>
            <Input
              label={labelText}
              type="text"
              name={name}
              value=""
              onChange={noop}
              touched={touched}
              errorMsg={errorMsg}
              className={s.input}
              placeholder={placeholderText}
              onMouseDown={this.handleTakePhoto}
              readOnly
            />
            <IconButton
              className={s.icon}
              primary
              onClick={this.handleTakePhoto}
              icon={value ? null : 'photo_camera'}
            >
              {!!value && <img src={value} alt="img" />}
            </IconButton>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ImageCapture;

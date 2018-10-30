import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import IconButton from '../Button/IconButton';
import s from './ImageField.css';

class ImageField extends PureComponent {
  static propTypes = {
    onChange: func.isRequired,
    name: string.isRequired,
    label: string.isRequired,
    value: string.isRequired,
  };

  handleFieldChange = event => {
    const file = event.target.files;
    if (file.length > 0) {
      const windowURL = window.URL || window.webkitURL;
      this.props.onChange &&
      this.props.onChange(
        this.props.name,
        windowURL.createObjectURL(file[0]),
      );
    }
  };

  openFileChooser = () => {
    this.inputElement.value = null;
    this.inputElement.click();
  };

  inputRef = element => {
    this.inputElement = element;
  };

  render() {
    const { value, name, label } = this.props;
    const labelClasses = classNames(s.label, !isEmpty(value) && s.hasValue);

    return (
      <div className={s.container}>
        <input
          capture
          type="file"
          accept="image/*"
          name={name}
          className={s.input}
          ref={this.inputRef}
          onChange={this.handleFieldChange}
        />
        <span className={labelClasses}>{label}</span>
        {!isEmpty(value) && (
          <span
            className={s.tapEdit}
            onClick={this.openFileChooser}
            onKeyDown={this.openFileChooser}
            role="button"
            tabIndex="0"
          >
            Nhấn vào để chỉnh sửa
          </span>
        )}
        <IconButton
          className={s.icon}
          primary
          onClick={this.openFileChooser}
          icon={value ? null : 'photo_camera'}
        >
          {!!value && <img src={value} alt="img" />}
        </IconButton>
      </div>
    );
  }
}

export default ImageField;


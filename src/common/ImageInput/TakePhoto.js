/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import Camera from '../Camera';
import Button from '../Button';
import s from './TakePhoto.css';

class TakePhoto extends PureComponent {
  static propTypes = {
    onChange: func,
  };

  static defaultProps = {
    onChange: () => {
    },
  };

  state = { captured: false };

  takePicture = () => {
    this.setState({
      captured: true,
      imageUrl: this.camera.getScreenshot(),
    });
  };

  handleRecapture = () => {
    this.setState({ captured: false });
  };

  handleConfirm = () => {
    const { onChange } = this.props;
    const { imageUrl } = this.state;
    onChange && onChange(imageUrl);
  };

  cameraRef = ref => {
    this.camera = ref;
  };

  renderImage = imageUrl => (
    <div className={s.cameraContainer}>
      <div className={s.preview}>
        <img className={s.captureImage} alt="Hình người dùng" src={imageUrl} />
      </div>
      <div className={s.footerContainer}>
        <Button onClick={this.handleRecapture} className={s.footerButton}>
          Chụp lại
        </Button>
        <Button onClick={this.handleConfirm} className={s.footerButton}>
          Xác nhận
        </Button>
      </div>
    </div>
  );

  renderCamera = () => (
    <div className={s.cameraContainer}>
      <div className={s.preview}>
        <Camera ref={this.cameraRef} width="100%" height="100%" />
        <div className={s.faceOval} />
        <div
          className={s.captureContainer}
          onClick={this.takePicture}
          onKeyDown={this.takePicture}
          role="button"
          tabIndex="0"
        >
          <div className={s.borderCaptureButton}>
            <div className={s.captureButton} />
          </div>
        </div>
      </div>
      <div className={s.footerContainer}>
        <span>
          Hãy đảm bảo rằng khuôn mặt của bạn nằm ở giữa và bạn không đội mũ hoặc
          đeo kính.
        </span>
      </div>
    </div>
  );

  render() {
    const { captured, imageUrl } = this.state;
    return (
      <div className={s.container}>
        {captured ? this.renderImage(imageUrl) : this.renderCamera()}
      </div>
    );
  }
}

export default TakePhoto;

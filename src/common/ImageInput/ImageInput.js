import React, { PureComponent } from 'react';
import { hasGetUserMedia } from 'utils/browser';
import ImageField from './ImageField';
import ImageCapture from './ImageCapture';

class ImageInput extends PureComponent {
  render() {
    return hasGetUserMedia() ? (
      <ImageCapture {...this.props} />
    ) : (
      <ImageField {...this.props} />
    );
  }
}

export default ImageInput;

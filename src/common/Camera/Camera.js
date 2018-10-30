import React, { Component } from 'react';
import { func, oneOfType, string, number, oneOf } from 'prop-types';
import { noop } from 'lodash';
import { hasGetUserMedia } from 'utils/browser';

class Camera extends Component {
  static defaultProps = {
    className: '',
    height: 480,
    onUserMedia: noop,
    onUserMediaError: noop,
    screenshotFormat: 'image/png',
    width: 640,
  };

  static propTypes = {
    onUserMedia: func,
    onUserMediaError: func,
    height: oneOfType([number, string]),
    width: oneOfType([number, string]),
    screenshotFormat: oneOf([
      'image/webp',
      'image/png',
      'image/jpeg',
    ]),
    className: string,
  };

  static mountedInstances = [];
  static userMediaRequested = false;

  static requestUserMedia() {
    navigator.getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(stream => {
        Camera.mountedInstances.forEach(instance =>
          instance.handleUserMedia(null, stream),
        );
      })
      .catch(e => {
        Camera.mountedInstances.forEach(instance =>
          instance.handleUserMedia(e),
        );
      });

    Camera.userMediaRequested = true;
  }

  state = { hasUserMedia: false };

  componentDidMount() {
    if (!hasGetUserMedia()) {
      return;
    }

    Camera.mountedInstances.push(this);
    if (!this.state.hasUserMedia && !Camera.userMediaRequested) {
      Camera.requestUserMedia();
    }
  }

  componentWillUnmount() {
    const index = Camera.mountedInstances.indexOf(this);
    Camera.mountedInstances.splice(index, 1);
    Camera.userMediaRequested = false;

    if (Camera.mountedInstances.length === 0 && this.state.hasUserMedia) {
      if (this.stream.getVideoTracks && this.stream.getAudioTracks) {
        this.stream.getVideoTracks().map(track => track.stop());
        this.stream.getAudioTracks().map(track => track.stop());
      } else {
        this.stream.stop();
      }
      window.URL.revokeObjectURL(this.state.src);
    }
  }

  getScreenshot() {
    if (!this.state.hasUserMedia) {
      return null;
    }

    const canvas = this.getCanvas();
    return canvas && canvas.toDataURL(this.props.screenshotFormat);
  }

  getCanvas() {
    if (!this.state.hasUserMedia || !this.video.videoHeight) {
      return null;
    }

    if (!this.ctx) {
      const canvas = document.createElement('canvas');
      const aspectRatio = this.video.videoWidth / this.video.videoHeight;
      const canvasWidth = this.video.clientWidth;

      canvas.width = canvasWidth;
      canvas.height = canvasWidth / aspectRatio;

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    const { ctx, canvas } = this;
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    return canvas;
  }

  handleUserMedia(err, stream) {
    if (err) {
      this.setState({ hasUserMedia: false });
      this.props.onUserMediaError(err);

      return;
    }

    this.stream = stream;

    try {
      this.video.srcObject = stream;
      this.setState({ hasUserMedia: true });
    } catch (error) {
      this.setState({
        hasUserMedia: true,
        src: window.URL.createObjectURL(stream),
      });
    }

    this.props.onUserMedia();
  }

  videoRef = ref => {
    this.video = ref;
  };

  render() {
    return (
      <video
        muted
        autoPlay
        playsInline
        width={this.props.width}
        height={this.props.height}
        src={this.state.src}
        className={this.props.className}
        ref={this.videoRef}
      />
    );
  }
}

export default Camera;

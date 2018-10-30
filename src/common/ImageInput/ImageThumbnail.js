/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/label-has-for, react/require-default-props, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions  */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageThumbnail.css';

class ImageThumbnail extends Component {
  static propTypes = {
    imageDatum: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    height: undefined,
    width: undefined,
  };

  state = {
    fullscreen: false,
  };

  handleDelete = e => {
    e.stopPropagation();
    this.props.onDelete(this.props.id);
  };

  displayFullscreen = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
  };

  render() {
    const { imageDatum, height, width } = this.props;
    return (
      <div className={this.state.fullscreen ? style.fullscreen : null}>
        <img
          alt="thumbnail"
          height={height}
          width={width}
          src={imageDatum}
          onClick={this.displayFullscreen}
        />
        <div className={style.close}>
          <span className="material-icons" onClick={this.handleDelete}>
            clear
          </span>
        </div>
      </div>
    );
  }
}

export default ImageThumbnail;

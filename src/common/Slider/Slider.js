/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/label-has-for, react/require-default-props, jsx-a11y/no-static-element-interactions */
/* eslint no-debugger: "warn" */
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { number, string, bool, func } from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import { capitalize, clamp } from './Slider.utility';
import { orientations, ORIENTATION } from './Slider.constant';

import s from './Slider.css';

class Slider extends PureComponent {
  static propTypes = {
    className: string,
    min: number,
    max: number,
    step: number,
    value: number,
    orientation: string,
    tooltip: bool,
    format: func,
    onChangeStart: func,
    onChange: func,
    onChangeComplete: func,
  };

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: ORIENTATION.HORIZONTAL,
    tooltip: false,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: false,
      limit: 0,
      grab: 0,
    };
  }

  componentDidMount() {
    this.handleUpdate();
    const resizeObserver = new ResizeObserver(this.handleUpdate);
    resizeObserver.observe(this.slider);
  }

  /**
   * Check the orientation is horizontal
   */
  get isHorizontal() {
    return this.props.orientation === ORIENTATION.HORIZONTAL;
  }

  /**
   * Set the reference of the Slider element
   *
   * @param {Object} ref The element reference
   * @returns {void}
   */
  setSliderRef = ref => {
    this.slider = ref;
  };

  /**
   * Set the reference of the Handle element
   *
   * @param {Object} ref The element reference
   * @returns {void}
   */
  setHandleRef = ref => {
    this.handle = ref;
  };

  /**
   * Translate position of slider to slider value
   * @param  {number} pos - Current position/coordinates of slider
   * @return {number} value - Slider value
   */
  getValueFromPosition = pos => {
    const { limit } = this.state;
    const { min, max, step } = this.props;
    const percentage = clamp(pos, 0, limit) / (limit || 1);
    const baseVal = step * Math.round((percentage * (max - min)) / step);
    const value = this.isHorizontal ? baseVal + min : max - baseVal;

    return clamp(value, min, max);
  };

  /**
   * Calculate position of slider based on its value
   * @param  {number} value - Current value of slider
   * @return {number} pos - Calculated position of slider based on value
   */
  getPositionFromValue = value => {
    const { limit } = this.state;
    const { min, max } = this.props;
    const diffMaxMin = max - min;
    const diffValMin = value - min;
    const percentage = diffValMin / diffMaxMin;

    return Math.round(percentage * limit);
  };

  /**
   * Support for key events on the slider handle
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleKeyDown = e => {
    e.preventDefault();

    const { keyCode } = e;
    const { value, min, max, step, onChange } = this.props;
    let sliderValue;

    switch (keyCode) {
      case 38:
      case 39:
        sliderValue = value + step > max ? max : value + step;
        onChange && onChange(sliderValue, e);
        break;
      case 37:
      case 40:
        sliderValue = value - step < min ? min : value - step;
        onChange && onChange(sliderValue, e);
        break;
      default:
        break;
    }
  };

  /**
   * Detach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleEnd = e => {
    const { onChangeComplete } = this.props;

    this.setState(
      {
        active: false,
      },
      () => {
        onChangeComplete && onChangeComplete(e);
      },
    );

    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleEnd);
  };

  /**
   * Handle drag/mousemove event
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    const { onChange } = this.props;
    const value = this.position(e);

    onChange && onChange(value, e);
  };

  /**
   * Update slider state on change
   * @return {void}
   */
  handleUpdate = () => {
    if (!this.slider) {
      // for shallow rendering
      return;
    }
    const { orientation } = this.props;
    const dimension = capitalize(orientations[orientation].dimension);
    const sliderPos = this.slider[`offset${dimension}`];
    const handlePos = this.handle[`offset${dimension}`];

    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2,
    });
  };

  /**
   * Attach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleStart = e => {
    e.preventDefault();
    const { onChangeStart } = this.props;

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleEnd);
    this.setState(
      {
        active: true,
      },
      () => {
        onChangeStart && onChangeStart(e);
      },
    );
  };

  /**
   * Format label/tooltip value
   * @param  {Number} - value
   * @return {Formatted Number}
   */
  handleFormat = value => {
    const { format } = this.props;

    return format ? format(value) : value;
  };

  /**
   * Calculate position of slider based on value
   * @param  {Object} e - Event object
   * @return {number} value - Slider value
   */
  position = e => {
    const { grab } = this.state;
    const { orientation } = this.props;
    const node = this.slider;
    const coordinateStyle = orientations[orientation].coordinate;
    const directionStyle = orientations[orientation].direction;
    const clientCoordinateStyle = `client${capitalize(coordinateStyle)}`;
    const coordinate = !e.touches
      ? e[clientCoordinateStyle]
      : e.touches[0][clientCoordinateStyle];
    const direction = node.getBoundingClientRect()[directionStyle];
    const pos = coordinate - direction - grab;

    return this.getValueFromPosition(pos);
  };

  /**
   * Grab coordinates of slider
   * @param  {Object} pos - Position object
   * @return {Object} - Slider fill/handle coordinates
   */
  coordinates = pos => {
    const { limit, grab } = this.state;
    const value = this.getValueFromPosition(pos);
    const position = this.getPositionFromValue(value);
    const handlePos = this.isHorizontal ? position + grab : position;
    const fillPos = this.isHorizontal ? handlePos : limit - handlePos;

    return {
      fill: fillPos,
      handle: handlePos,
      label: handlePos,
    };
  };

  render() {
    const { value, orientation, className, tooltip, min, max } = this.props;
    const { active } = this.state;
    const { dimension, direction } = orientations[orientation];
    const position = this.getPositionFromValue(value);
    const coords = this.coordinates(position);
    const fillStyle = { [dimension]: `${coords.fill}px` };
    const handleStyle = { [direction]: `${coords.handle}px` };
    const showTooltip = tooltip && active;
    const sliderClass = classnames(
      s.rangeslider,
      s['rangeslider-horizontal'],
      className,
    );

    return (
      <div
        ref={this.setSliderRef}
        className={sliderClass}
        onMouseDown={this.handleDrag}
        onMouseUp={this.handleEnd}
        onTouchStart={this.handleDrag}
        onTouchEnd={this.handleEnd}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-orientation={orientation}
      >
        <div className={s.rangeslider__fill} style={fillStyle} />
        <div
          ref={this.setHandleRef}
          className={s.rangeslider__handle}
          onMouseDown={this.handleStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleEnd}
          onKeyDown={this.handleKeyDown}
          style={handleStyle}
        >
          {showTooltip ? (
            <div
              ref={st => {
                this.tooltip = st;
              }}
              className={s['rangeslider__handle-tooltip']}
            >
              <span>{this.handleFormat(value)}</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Slider;

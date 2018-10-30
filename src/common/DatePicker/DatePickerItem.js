/* eslint-disable camelcase */
import React, { Component } from 'react';
import { instanceOf, string, func } from 'prop-types';
import { isUndefined, isEqual, times } from 'lodash';
import * as TimeUtil from 'utils/time';
import classNames from 'classnames';
import s from './DatePickerItem.css';
import { DATE_HEIGHT, DATE_LENGTH, MIDDLE_INDEX, MIDDLE_Y } from './constant';

class DatePickerItem extends Component {
  constructor(props) {
    super(props);

    this.animating = false;
    this.touchY = 0;
    this.translateY = 0;
    this.currentIndex = MIDDLE_INDEX;
    this.moveDateCount = 0;
    this.typeFunc = `next${TimeUtil.getTimeType(props.format)}`;

    this.state = {
      translateY: MIDDLE_Y,
      marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT,
      dates: this.getDates(props.value),
    };
  }

  static propTypes = {
    value: instanceOf(Date).isRequired,
    minDate: instanceOf(Date).isRequired,
    maxDate: instanceOf(Date).isRequired,
    format: string.isRequired,
    onSelect: func.isRequired,
    className: string,
  };

  static defaultProps = {
    className: ''
  };

  componentDidMount() {
    const { viewport } = this;
    viewport.addEventListener('touchstart', this.handleContentTouch, false);
    viewport.addEventListener('touchmove', this.handleContentTouch, false);
    viewport.addEventListener('touchend', this.handleContentTouch, false);
    viewport.addEventListener('mousedown', this.handleContentMouseDown, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value.getTime() === this.props.value.getTime()) {
      return;
    }

    this.currentIndex = MIDDLE_INDEX;
    this.setState({
      translateY: MIDDLE_Y,
      marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT,
      dates: this.getDates(nextProps.value),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.value.getTime() !== this.props.value.getTime() ||
      !isEqual(nextState, this.state)
    );
  }

  componentWillUnmount() {
    const { viewport } = this;
    viewport.removeEventListener('touchstart', this.handleContentTouch, false);
    viewport.removeEventListener('touchmove', this.handleContentTouch, false);
    viewport.removeEventListener('touchend', this.handleContentTouch, false);
    viewport.removeEventListener(
      'mousedown',
      this.handleContentMouseDown,
      false,
    );
  }

  getDates = date =>
    times(DATE_LENGTH).map((value, index) =>
      TimeUtil[this.typeFunc](date, index - MIDDLE_INDEX),
    );

  getPageYValue = event =>
    !isUndefined(event.targetTouches) && !isUndefined(event.targetTouches[0])
      ? event.targetTouches[0].pageY
      : event.pageY;

  updateDates = direction => {
    const { dates } = this.state;

    if (direction === 1) {
      this.currentIndex += 1;
      this.setState({
        dates: [
          ...dates.slice(1),
          TimeUtil[this.typeFunc](dates[dates.length - 1], 1),
        ],
        marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT,
      });
    } else {
      this.currentIndex -= 1;
      this.setState({
        dates: [
          TimeUtil[this.typeFunc](dates[0], -1),
          ...dates.slice(0, dates.length - 1),
        ],
        marginTop: (this.currentIndex - MIDDLE_INDEX) * DATE_HEIGHT,
      });
    }
  };

  checkIsUpdateDates = (direction, translateY) =>
    direction === 1
      ? this.currentIndex * DATE_HEIGHT + DATE_HEIGHT / 2 < -translateY
      : this.currentIndex * DATE_HEIGHT - DATE_HEIGHT / 2 > -translateY;

  moveToNext = direction => {
    const date = this.state.dates[MIDDLE_INDEX];
    const { maxDate, minDate } = this.props;
    if (
      direction === -1 &&
      date.getTime() < minDate.getTime() &&
      this.moveDateCount
    ) {
      this.updateDates(1);
    } else if (
      direction === 1 &&
      date.getTime() > maxDate.getTime() &&
      this.moveDateCount
    ) {
      this.updateDates(-1);
    }

    this.moveTo(this.scroll, this.currentIndex);
  };

  moveTo = (obj, currentIndex) => {
    this.animating = true;
    // eslint-disable-next-line
    obj.style.transition = 'transform .2s ease-out';

    this.setState({
      translateY: -currentIndex * DATE_HEIGHT,
    });

    setTimeout(() => {
      this.animating = false;
      this.props.onSelect(this.state.dates[MIDDLE_INDEX]);
      this.scroll.style.transition = '';
    }, 200);
  };

  handleStart = event => {
    this.touchY = this.getPageYValue(event);
    this.translateY = this.state.translateY;
    this.moveDateCount = 0;
  };

  isInvalidDate = date => {
    const { maxDate, minDate } = this.props;
    return (
      date.getTime() < minDate.getTime() || date.getTime() > maxDate.getTime()
    );
  };

  handleMove = event => {
    const touchY = this.getPageYValue(event);
    const dir = touchY - this.touchY;
    const translateY = this.translateY + dir;
    const direction = dir > 0 ? -1 : 1;

    const date = this.state.dates[MIDDLE_INDEX];
    if (this.isInvalidDate(date)) {
      return;
    }

    if (this.checkIsUpdateDates(direction, translateY)) {
      this.moveDateCount =
        direction > 0 ? this.moveDateCount + 1 : this.moveDateCount - 1;
      this.updateDates(direction);
    }

    this.setState({ translateY });
  };

  handleEnd = event => {
    const touchY = event.pageY || event.changedTouches[0].pageY;
    const dir = touchY - this.touchY;
    const direction = dir > 0 ? -1 : 1;
    this.moveToNext(direction);
  };

  handleContentTouch = event => {
    event.preventDefault();
    if (this.animating) return;
    const mappingTouchFunc = {
      touchstart: this.handleStart,
      touchmove: this.handleMove,
      touchend: this.handleEnd,
    };

    mappingTouchFunc[event.type](event);
  };

  handleContentMouseDown = event => {
    if (this.animating) return;
    this.handleStart(event);
    document.addEventListener('mousemove', this.handleContentMouseMove);
    document.addEventListener('mouseup', this.handleContentMouseUp);
  };

  handleContentMouseUp = event => {
    if (this.animating) return;
    this.handleEnd(event);
    document.removeEventListener('mousemove', this.handleContentMouseMove);
    document.removeEventListener('mouseup', this.handleContentMouseUp);
  };

  handleContentMouseMove = event => {
    if (this.animating) return;
    this.handleMove(event);
  };

  datepickerScrollRef = node => {
    this.scroll = node;
  };

  datepickerViewportRef = node => {
    this.viewport = node;
  };

  renderDatepickerItem = (date, index) => {
    const className = this.isInvalidDate(date) ? 'disabled' : '';
    const formatDate = TimeUtil.convertDate(date, this.props.format);

    return (
      <li key={index} className={className}>
        {formatDate}
      </li>
    );
  };

  render() {
    const { className } = this.props;
    const scrollStyle = {
      transform: `translateY(${this.state.translateY}px)`,
      marginTop: this.state.marginTop,
    };

    return (
      <div className={classNames(s.datepickerCol, className)}>
        <div ref={this.datepickerViewportRef} className={s.datepickerViewport}>
          <div className={s.datepickerWheel}>
            <ul
              ref={this.datepickerScrollRef}
              className={s.datepickerScroll}
              style={scrollStyle}
            >
              {this.state.dates.map(this.renderDatepickerItem)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DatePickerItem;

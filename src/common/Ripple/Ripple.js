import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import classNames from 'classnames';

import s from './Ripple.css';

const durationEffect = 25;
const durationCircle = 300;

class Ripple extends PureComponent {
  static propTypes = {
    onRequestRemove: func.isRequired,
    id: string.isRequired,
    left: string,
    top: string,
  };

  static defaultProps = {
    left: '0px',
    top: '0px',
  };

  constructor(props) {
    super(props);
    this.state = {
      in: false,
      out: false,
    };
  }

  /**
   * @description Animation add and remove when click button.
   */
  componentDidMount() {
    const { id, onRequestRemove } = this.props;

    this.timeOut = setTimeout(() => {
      this.setState({ in: true, out: false });
      setTimeout(() => {
        this.setState({ in: false, out: true });
        setTimeout(() => {
          onRequestRemove(id);
        }, durationCircle);
      });
    }, durationEffect);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  /**
   * @function get rippleStyle
   * @return {object} Render style for ripple follow current button.
   */
  get rippleStyle() {
    const { in: stateIn, out: stateOut } = this.state;
    const { left, top } = this.props;
    let className = '';
    const style = {};

    if (stateIn) className = s.rippleIn;
    if (stateOut) className = s.rippleOut;
    if (left) style.left = left;
    if (top) style.top = top;

    return {
      style,
      className,
    };
  };

  render() {
    const { style, className } = this.rippleStyle;

    return (
      <div
        style={style}
        className={classNames(s.rippleWrapper, className)}
      />
    );
  }
}

export default Ripple;

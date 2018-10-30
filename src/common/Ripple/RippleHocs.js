/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import { array, string } from 'prop-types';
import classNames from 'classnames';
import filter from 'lodash/filter';

import Ripple from './Ripple';
import s from './RippleHocs.css';

class RippleHocs extends PureComponent {
  static propTypes = {
    children: array,
    className: string,
  };

  static defaultProps = {
    children: [],
    className: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ripples: [],
    };

    this.handleRemoveRipple = this.handleRemoveRipple.bind(this);
  }

  handleClick = (e) => {
    const { target, clientX, clientY } = e;
    const { offsetLeft, offsetTop } = target;

    const left = clientX - offsetLeft;
    const top = clientY - offsetTop;
    const id = Math.random().toString();

    this.setState(({ ripples }) => ({
      ripples: [...ripples, { left, top, id }]
    }));
  };

  handleRemoveRipple(id) {
    this.setState(({ ripples }) => ({
      ripples: filter(ripples, effect => effect.id !== id),
    }));
  };

  renderRipple = (ripples) => {
    return ripples.map(({ left, top, id }) =>
      <Ripple
        key={id}
        id={id}
        left={`${left}px`}
        top={`${top}px`}
        onRequestRemove={this.handleRemoveRipple}
      />
    );
  };

  render() {
    const { ripples } = this.state;
    const { children, className, ...others } = this.props;

    return (
      <button
        {...others}
        className={classNames(s.btnWrapper, className)}
        onClick={this.handleClick}
      >
        {children}
        {this.renderRipple(ripples)}
      </button>
    );
  }
}

export default RippleHocs;

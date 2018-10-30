import React, { Component } from 'react';
import { string } from 'prop-types';
import classnames from 'classnames';

import s from './Cycle.css';

class Cycle extends Component {
  static propTypes = {
    className: string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;
    return (
      <svg className={classnames(s.circular, className)} viewBox="25 25 50 50">
        <circle
          className={classnames(s.path)}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      </svg>
    );
  }
}

export default Cycle;

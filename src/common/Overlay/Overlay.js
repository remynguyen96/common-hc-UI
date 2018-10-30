import React, { Component } from 'react';
import { bool, node, string, func } from 'prop-types';
import classNames from 'classnames';
import s from './Overlay.css';

class Overlay extends Component {
  static propTypes = {
    active: bool,
    children: node.isRequired,
    className: string,
    onClick: func,
    onEscKeyDown: func,
  };

  static defaultProps = {
    active: true,
    className: '',
    onClick: () => {
    },
    onEscKeyDown: () => {
    },
  };

  componentDidMount() {
    if (this.props.active) {
      this.escKeyListener = document.body.addEventListener(
        'keydown',
        this.handleEscKey.bind(this),
      );
    }
  }

  componentDidUpdate() {
    if (this.props.active && !this.escKeyListener) {
      this.escKeyListener = document.body.addEventListener(
        'keydown',
        this.handleEscKey.bind(this),
      );
    }
  }

  componentWillUnmount() {
    if (this.escKeyListener) {
      document.body.removeEventListener('keydown', this.handleEscKey);
      this.escKeyListener = null;
    }
  }

  handleEscKey(e) {
    if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
      this.props.onEscKeyDown(e);
    }
  }

  render() {
    const { className, onClick } = this.props;
    const classes = classNames(s.overlay, className);

    return (
      <div
        className={classes}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex="0"
      >
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;

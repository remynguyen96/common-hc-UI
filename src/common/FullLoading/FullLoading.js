import React, { Component } from 'react';
import { node, bool } from 'prop-types';
import classnames from 'classnames';

import s from './FullLoading.css';

/**
 * Input is Snipper component like (Bubble, Cycle)
 * Return FullLoading Component
 * (Maybe Full page or Full Component, while full component require childrent)
 * @param {Component} InnerComponent
 * @return {Component} Loading Component
 */
function FactoryFullLoading(InnerComponent) {
  class FullLoading extends Component {
    static propTypes = {
      children: node,
      fullPage: bool,
    };

    static defaultProps = {
      fullPage: false,
      children: null,
    };

    render() {
      const { fullPage, children } = this.props;

      const wrapperStyle = classnames(s.wrapper, fullPage && s.wrapperFullPage);

      return (
        <div className={wrapperStyle}>
          {children}
          <InnerComponent />
        </div>
      );
    }
  }

  return FullLoading;
}

export default FactoryFullLoading;

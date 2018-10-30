import React, { PureComponent } from 'react';
import { string, object } from 'prop-types';
import classNames from 'classnames';

import s from './TabContent.css';

export default class TabContent extends PureComponent {
  static propTypes = {
    className: string,
    activeTab: string,
    dataTabs: object.isRequired,
  };
  static defaultProps = {
    activeTab: null,
    className: null,
  };

  render() {
    const { className, others, activeTab, dataTabs } = this.props;

    return (
      <div
        {...others}
        className={classNames(s.tabContent, className)}
      >
        {dataTabs[activeTab]}
      </div>
    );
  }
}

import React, { PureComponent, Children, createRef } from 'react';
import { element, string, func, arrayOf } from 'prop-types';
import { noop, isEmpty } from 'lodash';
import classNames from 'classnames';

import s from './Tabs.css';

const transition = 'left .4s, right .4s';

class Tabs extends PureComponent {
  static propTypes = {
    className: string,
    onClick: func,
    default: string,
    children: arrayOf(element),
  };

  static defaultProps = {
    onClick: noop,
    className: null,
    children: null,
    default: null,
  };

  constructor(props) {
    super(props);
    this.state = { sizes: {} };
    this.tabItem = {};
    this.tabs = createRef();
    this.allSize = {};
    this.styleUnderline = {};
  }

  componentDidMount() {
    this.getSizes();
    this.styleUnderline = this.getUnderlineStyle(this.props.default);
  }

  /**
   * @function getSizes
   * @return {object} Catch each position of Tab component and set style suit for it.
   */
  getSizes() {
    const sizes = {};
    const { tabs, tabItem } = this;
    const { left, right } = tabs.current.getBoundingClientRect();
    let positionLeft = 0;
    let positionRight = 0;

    Object.keys(tabItem).forEach(tab => {
      const elementTab = tabItem[tab];
      const { left: tabLeft, right: tabRight } = elementTab.getBoundingClientRect();

      positionLeft = tabLeft - left;
      positionRight = right - tabRight;

      sizes[tab] = { positionLeft, positionRight };
    });

    this.setState({ sizes });
    this.allSize = sizes;

    return sizes;
  }

  /**
   * @function getUnderlineStyle
   * @return {object} Create style underline for each Tab
   * @param tabKey
   */
  getUnderlineStyle = (tabKey) => {
    const { sizes } = this.state;
    const sizesTabs = isEmpty(this.allSize) ? sizes : this.allSize;

    if (isEmpty(tabKey) || isEmpty(sizesTabs)) {
      return { left: 0, right: '100%' };
    }

    const { positionLeft, positionRight } = sizesTabs[tabKey];

    return {
      left: `${positionLeft}px`,
      right: `${positionRight}px`,
      transition,
    };
  };

  /**
   * @function handleActive
   * @param  {tabKey} current tab when click
   * @return {noop} Render underline style and active tab
   */
  handleActive = (tabKey) => {
    this.allSize = null;
    const { onClick } = this.props;

    this.styleUnderline = this.getUnderlineStyle(tabKey);
    onClick(tabKey);
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={classNames(className, s.tabList)} ref={this.tabs}>
        {
          Children.map(children, (tab) => (
            <li
              className={s.tabItem}
              onClick={() => this.handleActive(tab.props.label)}
              ref={el => (this.tabItem[tab.props.label] = el)}
            >
              {tab}
            </li>
          ))
        }
        <span className={s.tabUnderline} style={this.styleUnderline} />
      </div>
    );
  }
}

export default Tabs;

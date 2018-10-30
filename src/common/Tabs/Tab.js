import React, { PureComponent, Fragment } from 'react';
import { string, bool } from 'prop-types';
import classNames from 'classnames';

import FontIcon from '../FontIcon';
import RippleHocs from '../Ripple/RippleHocs';
import s from './Tab.css';

export default class Tab extends PureComponent {
  static propTypes = {
    className: string,
    active: string,
    label: string,
    icon: string,
    error: bool,
  };
  static defaultProps = {
    className: null,
    active: null,
    label: null,
    icon: null,
    error: false,
  };

  render() {
    const { children, className, others, active, label, icon, error } = this.props;
    const classWrapper = classNames(className, s.tabButton, {
      [active]: label === active,
    });
    const classChildren = classNames(s.tabBtn, {
      [s.error]: error,
    });

    return (
      <RippleHocs
        {...others}
        className={classWrapper}
      >
        {icon && <FontIcon className={s.tabIcon} value={icon} />}
        <span className={classChildren}>
          {error &&
            <Fragment>
              {children}
              <FontIcon className={s.iconError} value="error_outline" />
            </Fragment>
          }
          {!error && children}
        </span>
      </RippleHocs>
    );
  }
}

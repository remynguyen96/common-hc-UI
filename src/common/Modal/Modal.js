/**
 * Home Credit (https://www.homecredit.vn/)
 *
 * Copyright © 2018-present HomeCredit, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* eslint-disable jsx-a11y/label-has-for, react/require-default-props, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

import React from 'react';
import { bool, func, element, string, oneOfType, array } from 'prop-types';
import { isNil, isEqual } from 'lodash';
import classNames from 'classnames';
import s from './Modal.css';

/* --------------------------------------
  Example Usage:
    - For Simple Modal
    <Modal toggleButton={<span>Open Modal</span>}>
      <h1> Hello Modal </h1>
    </Modal>

    - For Advanced Modal: with Header & Footer
    <Modal
      toggleButton={<span>Open Modal</span>}
      header={<h2>Modal Header</h2>}
      footer={<h2>Modal Footer</h2>} >
        <h1> Modal with header & footer </h1>
    </Modal>
-------------------------------------- */

class Modal extends React.PureComponent {
  /**
   * Input propTypes
   */
  static propTypes = {
    isOpen: bool,
    onOpen: func,
    onClose: func,
    children: oneOfType([element, string, array]),
    header: element,
    footer: element,
    toggleButton: element,
    className: string,
  };

  static defaultProps = {
    isOpen: false,
    header: null,
    footer: null,
    toggleButton: null,
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return { isOpen: nextProps.isOpen };
    }

    return null;
  }

  openModal = () => {
    this.setState({ isOpen: true });
    this.props.onOpen && this.props.onOpen();
  };

  closeModal = () => {
    this.setState({ isOpen: false });
    this.props.onClose && this.props.onClose();
  };

  /**
   * Close modal when user click outside
   *
   * @return {void} =
   */
  clickOverlay = e => {
    isEqual(e.target.className, s.modal) && this.closeModal();
  };

  render() {
    const { isOpen } = this.state;
    const {
      className,
      children,
      toggleButton: Button,
      header: Header,
      footer: Footer,
    } = this.props;
    const modalClass = classNames(s.modal, { [s.hidden]: !isOpen });

    return (
      <div className={className}>
        <div className={s.modalToggle} onClick={this.openModal}>
          {!isNil(Button) && Button}
        </div>

        <div className={modalClass} onClick={this.clickOverlay}>
          <div className={s.modalContent}>
            {!isNil(Header) && <div className={s.modalHeader}>{Header}</div>}
            <div className={s.modalBody}>{children}</div>
            {!isNil(Footer) && <div className={s.modalFooter}>{Footer}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

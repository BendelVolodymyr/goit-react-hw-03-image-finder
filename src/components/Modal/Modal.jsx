import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal__root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };

  handleDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="modal__backdrop" onClick={this.handleDropClick}>
        <div className="modal__box">
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

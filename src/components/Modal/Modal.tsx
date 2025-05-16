import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal__root')!;

interface ModalProps {
  onClose: (e?: any) => void;
  src: string;
  alt: string;
}

export default class Modal extends Component<ModalProps, {}> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };

  handleDropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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

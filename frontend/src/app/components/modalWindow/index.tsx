import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(style);

export interface ModalWindowProps {
  showModal: () => void;
}

export interface ModalWindowState {
  open: boolean;
  children?: Element
}

export class ModalWindow extends React.Component<{}, ModalWindowState> {
  public state: ModalWindowState = {
    open: true,
  }

  public render() {
    const modalContainerClassnames = cx({
      modalContainer: true,
      open: this.state.open
    });

    return (
      <div className={modalContainerClassnames}>
        {this.props.children}
      </div>
    );
  }
}

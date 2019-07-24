import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';

const cx = classnames.bind(style);

export interface ModalWindowState {
  open: boolean;
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
        <div className={style.contentContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

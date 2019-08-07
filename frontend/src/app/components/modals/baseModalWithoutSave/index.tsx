import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import CloseIcon from 'assets/images/cross.svg';

const cx = classnames.bind(style);

export interface BaseModalWithoutSaveProps {
  className: string;
  isOpen: boolean;
  title?: string;

  onClose: () => void;
}

export class BaseModalWithoutSave extends React.Component<BaseModalWithoutSaveProps> {
  public render() {
    const modalContainerClassnames = cx({
      modalContainer: true,
      open: this.props.isOpen
    });

    const modalContentClassnames = cx({
      modalContent: true,
      [this.props.className]: true
    })

    return (
      <div className={modalContainerClassnames}>
        <div className={modalContentClassnames}>
          <button className={style.closeButton} onClick={()=> this.props.onClose()} >
            <CloseIcon className={style.icon} viewBox="0 0 612 612" />
          </button>
          {this.props.title ? <h3>this.props.title</h3> : null}
          {this.props.children}
        </div>
      </div>
    );
  }
}
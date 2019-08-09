import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as style from './style.css';
import { NicknameSubmodal } from './nickname';
import { PasswordSubmodal } from './password';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { BaseModalWithoutSave } from '../baseModalWithoutSave';

const cx = classnames.bind(style);


export enum AccountInformationModalType {
  Email,
  Nickname,
  Password,
}

export interface AccountInformationModalState {
  modalType: AccountInformationModalType
}


@inject(STORE_PROFILE)
@observer
export class AccountInformationModal extends React.Component<{}, AccountInformationModalState> {
  public state = {
    modalType: AccountInformationModalType.Email,
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    const emailButtonClassnames = cx({ active: this.state.modalType === AccountInformationModalType.Email });
    const nicknameButtonClassnames = cx({ active: this.state.modalType === AccountInformationModalType.Nickname });
    const passwordButtonClassnames = cx({ active: this.state.modalType === AccountInformationModalType.Password });

    return (
      <BaseModalWithoutSave className={style.accountInformationModal}
        isOpen={profileStore.accountInformationModalOpen}
        onClose={() => profileStore.accountInformationModalOpen = false}>
        <div className={style.header}>
          <button className={emailButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Email })}>Email</button>
          <button className={nicknameButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Nickname })}>Nickname</button>
          <button className={passwordButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Password })}>Password</button>
        </div>
        {this.state.modalType === AccountInformationModalType.Nickname ? <NicknameSubmodal /> 
          : this.state.modalType === AccountInformationModalType.Password ? <PasswordSubmodal /> : null}
      </BaseModalWithoutSave>
    );
  }
}
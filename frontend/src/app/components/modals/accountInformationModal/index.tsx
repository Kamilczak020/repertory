import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { UsernameSubmodal } from './username';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';

const cx = classnames.bind(style);


export enum AccountInformationModalType {
  Email,
  Username,
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
    const usernameButtonClassnames = cx({ active: this.state.modalType === AccountInformationModalType.Username });
    const passwordButtonClassnames = cx({ active: this.state.modalType === AccountInformationModalType.Password });

    return (
      <BaseModal className={style.accountInformationModal}
        isOpen={profileStore.accountInformationModalOpen}
        onClose={() => profileStore.accountInformationModalOpen = false}
        onSave={() => null}>
        <div className={style.header}>
          <button className={emailButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Email })}>Email</button>
          <button className={usernameButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Username })}>Username</button>
          <button className={passwordButtonClassnames} onClick={() => this.setState({ modalType: AccountInformationModalType.Password })}>Password</button>
        </div>
        {this.state.modalType === AccountInformationModalType.Username ? <UsernameSubmodal /> : null}
      </BaseModal>
    );
  }
}
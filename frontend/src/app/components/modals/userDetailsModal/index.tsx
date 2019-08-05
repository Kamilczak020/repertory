import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { BirthdaySubmodal } from './birthday';
import { LocationSubmodal } from './location';

const cx = classnames.bind(style);


export enum UserDetailsModalType {
  Birthday,
  Gender,
  Location,
  Name,
}

export interface UserDetailsModalState {
  modalType: UserDetailsModalType
}


@inject(STORE_PROFILE)
@observer
export class UserDetailsModal extends React.Component {
  public state = {
    modalType: UserDetailsModalType.Birthday,
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    const birthdayButtonClassnames = cx({ active: this.state.modalType === UserDetailsModalType.Birthday });
    const genderButtonClassnames = cx({ active: this.state.modalType === UserDetailsModalType.Gender });
    const locationButtonClassnames = cx({ active: this.state.modalType === UserDetailsModalType.Location });
    const nameButtonClassnames = cx({ active: this.state.modalType === UserDetailsModalType.Name });

    return (
      <BaseModal className={style.userDetailsModal}
        isOpen={profileStore.userDetailsModalOpen}
        onClose={() => profileStore.userDetailsModalOpen = false}
        onSave={() => null}>
        <div className={style.header}>
          <button className={birthdayButtonClassnames} onClick={() => this.setState({ modalType: UserDetailsModalType.Birthday })}>Birthday</button>
          <button className={genderButtonClassnames} onClick={() => this.setState({ modalType: UserDetailsModalType.Gender })}>Gender</button>
          <button className={locationButtonClassnames} onClick={() => this.setState({ modalType: UserDetailsModalType.Location })}>Location</button>
          <button className={nameButtonClassnames} onClick={() => this.setState({ modalType: UserDetailsModalType.Name })}>Name</button>
        </div>
        {this.state.modalType === UserDetailsModalType.Birthday ? <BirthdaySubmodal /> 
        : this.state.modalType === UserDetailsModalType.Location ? <LocationSubmodal /> : null}
      </BaseModal>
    );
  }
}
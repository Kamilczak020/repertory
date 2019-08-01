import * as React from 'react';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';

@inject(STORE_PROFILE)
@observer
export class BioModal extends React.Component {
  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    return (
      <BaseModal className={style.bioModal} isOpen={profileStore.bioModalOpen} title="Change Bio"
        onClose={() => profileStore.bioModalOpen = false}
        onSave={() => null}>
      </BaseModal>
    );
  }
}
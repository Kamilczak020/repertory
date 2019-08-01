import * as React from 'react';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import GeoSuggest from 'react-geosuggest';

@inject(STORE_PROFILE)
@observer
export class LocationModal extends React.Component {
  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    return (
      <BaseModal className={style.locationModal} isOpen={profileStore.locationModalOpen} title="Change Location"
        onClose={() => profileStore.locationModalOpen = false}
        onSave={() => null}>
        <GeoSuggest types={['(cities)']} className={style.geosuggest} 
          inputClassName={style.input} 
          suggestsClassName={style.suggests}
          suggestsHiddenClassName={style.suggestsHidden}
          suggestItemClassName={style.item}
          suggestItemActiveClassName={style.itemActive}
        />
      </BaseModal>
    );
  }
}
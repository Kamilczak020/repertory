import * as React from 'react';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import GeoSuggest, { Suggest } from 'react-geosuggest';
import { toast } from 'react-toastify';

export interface LocationModalState {
  selectedLocation: Suggest;
}

@inject(STORE_PROFILE)
@observer
export class LocationModal extends React.Component<{}, LocationModalState> {
  public state = {
    selectedLocation: undefined,
  }

  private async handleSave() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;
    
    try {
      await profileStore.saveLocation(this.state.selectedLocation);
      toast.success('Location updated');
    } catch (error) {
      toast.error('Could not update location');
    }
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    return (
      <BaseModal className={style.locationModal} isOpen={profileStore.locationModalOpen} title="Change Location"
        onClose={() => profileStore.locationModalOpen = false}
        onSave={() => this.handleSave()}>
        <GeoSuggest types={['(cities)']} className={style.geosuggest} 
          inputClassName={style.input} 
          suggestsClassName={style.suggests}
          suggestsHiddenClassName={style.suggestsHidden}
          suggestItemClassName={style.item}
          suggestItemActiveClassName={style.itemActive}
          onSuggestSelect={(selectedLocation) => this.setState({ selectedLocation }) }
        />
      </BaseModal>
    );
  }
}
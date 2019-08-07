import * as React from 'react';
import * as style from './style.css';
import GeoSuggest, { Suggest } from 'react-geosuggest';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';

export interface LocationSubmodalState {
  selectedLocation: Suggest;
}

@inject(STORE_PROFILE)
@observer
export class LocationSubmodal extends React.Component<{}, LocationSubmodalState> {
  public state = {
    selectedLocation: undefined,
  }

  private async handleSave() {
    try {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      await profileStore.saveLocation(this.state.selectedLocation);
      toast.success('Location updated successfully.');
    } catch (error) {
      toast.error('Failed to update location.');
    }
  }

  public render() {
    return (
      <div className={style.container}>
        <GeoSuggest types={['(cities)']} className={style.geosuggest} 
          inputClassName={style.input} 
          suggestsClassName={style.suggests}
          suggestsHiddenClassName={style.suggestsHidden}
          suggestItemClassName={style.item}
          suggestItemActiveClassName={style.itemActive}
          onSuggestSelect={(selectedLocation) => this.setState({ selectedLocation }) }
        />
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
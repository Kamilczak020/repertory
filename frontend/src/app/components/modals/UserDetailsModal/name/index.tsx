import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';

export interface NameSubmodalState {
  name: string;
}

@inject(STORE_PROFILE)
@observer
export class NameSubmodal extends React.Component<{}, NameSubmodalState> {
  public state = {
    name: undefined
  }

  private async handleSave() {
    try {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      await profileStore.saveName(this.state.name);
      toast.success('Name updated successfully.');
    } catch (error) {
      toast.error('Failed to update name.');
    }
  }

  public render() {
    return (
      <div className={style.container}>
        <input type="text" placeholder="Full Name" onChange={(event) => this.setState({ name: event.target.value })} />
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
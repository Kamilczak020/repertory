import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';

export interface NicknameSubmodalState {
  nickname: string;
}

@inject(STORE_PROFILE)
@observer
export class NicknameSubmodal extends React.Component<{}, NicknameSubmodalState> {
  public state = {
    nickname: ''
  }

  private async handleSave() {
    try {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      await profileStore.saveNickname(this.state.nickname);
      toast.success('Nickname updated successfully.');
    } catch (error) {
      toast.error('Failed to update nickname.');
    }
  }

  public render() {
    return (
      <div className={style.container}>
        <input type="text" placeholder="New nickname" onChange={(event) => this.setState({ nickname: event.target.value })} />
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
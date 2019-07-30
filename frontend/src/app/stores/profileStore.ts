import { observable, runInAction, computed, action } from 'mobx';
import { ProfileModel } from 'app/model/profileModel';
import { API } from 'app/api';

export class ProfileStore {
  public constructor() {
    this.model = new ProfileModel();
  }

  @observable
  private model: ProfileModel;

  @computed
  public get username(): string { return this.model.username; }
  public set username(value: string) { runInAction('set username', () => this.model.username = value); }

  @computed
  public get avatar(): string { return this.model.avatar; }
  public set avatar(value: string) { runInAction('set avatar', () => this.model.avatar = value); }

  @computed
  public get blobAvatar(): Blob {
    const bytestring = atob(this.model.avatar);
    const arrayBuffer = new ArrayBuffer(bytestring.length);

    return new Blob([arrayBuffer], { type: 'image/png' });
  }

  public set blobAvatar(value: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(value);

    reader.onload = () => runInAction('set avatar', () => this.model.avatar = reader.result as string);
  }

  @computed
  public get imageModalOpen(): boolean { return this.model.imageModalOpen; }
  public set imageModalOpen(value: boolean) { runInAction('set imageModalOpen', () => this.model.imageModalOpen = value); }

  @action
  public async fetchUserInfo() {
    const response = await API.get('/user/profile');
    console.log(response);
    console.log(response.data.user.avatar);
    this.username = response.data.user.username;
    this.blobAvatar = new Blob([new Uint8Array(response.data.user.avatar.data)], { type: 'image/png' });
  }
}

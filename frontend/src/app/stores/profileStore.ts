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
  public get avatar(): string { return this.model.avatar; }
  public set avatar(value: string) { runInAction('set avatar', () => this.model.avatar = value); }

  @computed
  public get bio(): string { return this.model.bio; }
  public set bio(value: string) { runInAction('set avatar', () => this.model.bio = value); }

  @computed
  public get birthday(): Date { return this.model.birthday; }
  public set birthday(value: Date) { runInAction('set avatar', () => this.model.birthday = value); }

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
  public get email(): string { return this.model.email; }
  public set email(value: string) { runInAction('set avatar', () => this.model.email = value); }

  @computed
  public get location(): string { return this.model.location; }
  public set location(value: string) { runInAction('set avatar', () => this.model.location = value); }

  @computed
  public get username(): string { return this.model.username; }
  public set username(value: string) { runInAction('set username', () => this.model.username = value); }

  @computed
  public get imageModalOpen(): boolean { return this.model.imageModalOpen; }
  public set imageModalOpen(value: boolean) { runInAction('set imageModalOpen', () => this.model.imageModalOpen = value); }

  @action
  public async fetchUserInfo() {
    const response = await API.get('/user/profile');
    this.username = response.data.user.username;
    this.email = response.data.user.email;
    this.location = response.data.user.location;
    this.birthday = response.data.user.birthday;
    this.bio = response.data.user.bio;
    this.blobAvatar = new Blob([new Uint8Array(response.data.user.avatar.data)], { type: 'image/png' });
  }
}

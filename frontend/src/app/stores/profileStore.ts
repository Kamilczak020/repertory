import { observable, runInAction, computed, action } from 'mobx';
import { ProfileModel } from 'app/model/profileModel';
import { API } from 'app/api';
import { Suggest } from 'react-geosuggest';

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
  public set email(value: string) { runInAction('set email', () => this.model.email = value); }

  @computed
  public get gender(): string { return this.model.gender; }
  public set gender(value: string) { runInAction('set gender', () => this.model.gender = value); }

  @computed
  public get joinDate(): Date { return this.model.joindate; }
  public set joinDate(value: Date) { runInAction('set joinDate', () => this.model.joindate = value); }

  @computed
  public get location(): string { return this.model.location; }
  public set location(value: string) { runInAction('set avatar', () => this.model.location = value); }

  @computed
  public get name(): string { return this.model.name; }
  public set name(value: string) { runInAction('set name', () => this.model.name = value); }

  @computed
  public get username(): string { return this.model.username; }
  public set username(value: string) { runInAction('set username', () => this.model.username = value); }

  @computed
  public get accountInformationModalOpen(): boolean { return this.model.accountInformationModalOpen; }
  public set accountInformationModalOpen(value: boolean) { runInAction('set accountInformationModalOpen', () => this.model.accountInformationModalOpen = value); }

  @computed
  public get userDetailsModalOpen(): boolean { return this.model.userDetailsModalOpen; }
  public set userDetailsModalOpen(value: boolean) { runInAction('set userDetailsModalOpen', () => this.model.userDetailsModalOpen = value); }

  @computed
  public get imageModalOpen(): boolean { return this.model.imageModalOpen; }
  public set imageModalOpen(value: boolean) { runInAction('set imageModalOpen', () => this.model.imageModalOpen = value); }

  @action
  public async saveBirthday(birthday: Date) {
    try {
      await API.post('/user/birthday', { birthday });
      this.birthday = birthday;
    } catch (error) {
      throw new Error('Cannot save birthday.')
    }
  }

  @action
  public async saveGender(gender: string) {
    try {
      await API.post('/user/gender', { gender });
      this.gender = gender;
    } catch (error) {
      throw new Error('Cannot save gender.');
    }
  }

  @action
  public async saveLocation(location: Suggest) {
    try {
      await API.post('/user/location', { location: location.label });
      this.location = location.label;
    } catch (error) {
      throw new Error('Cannot save location.');
    }
  }

  @action
  public async saveName(name: string) {
    try {
      await API.post('/user/name', { name });
      this.name = name;
    } catch (error) {
      throw new Error('Cannot save name.');
    }
  }

  @action
  public async fetchUserInfo() {
    const response = await API.get('/user/profile');
    this.birthday = response.data.user.birthday;
    this.email = response.data.user.email;
    this.location = response.data.user.location;
    this.joinDate = response.data.user.joinDate;
    this.gender = response.data.user.gender;
    this.name = response.data.user.name;
    this.username = response.data.user.username;

    if (response.data.user.avatar) {
      this.blobAvatar = new Blob([new Uint8Array(response.data.user.avatar.data)], { type: 'image/png' });
    }
  }
}

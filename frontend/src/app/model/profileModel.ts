import { observable } from 'mobx';

export class ProfileModel {
  @observable
  public username: string;

  @observable
  public avatar: string;

  @observable
  public imageModalOpen: boolean;
}
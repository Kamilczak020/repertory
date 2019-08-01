import { observable } from 'mobx';

export class ProfileModel {
  
  @observable
  public avatar: string;

  @observable
  public bio: string;

  @observable
  public birthday: Date;

  @observable
  public email: string;

  @observable
  public location: string;

  @observable
  public username: string;

  @observable
  public imageModalOpen: boolean;
}
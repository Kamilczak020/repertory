import { observable } from 'mobx';

export class UserModel {
  @observable
  public username: string;

  @observable
  public isAuthenticated: boolean;
}
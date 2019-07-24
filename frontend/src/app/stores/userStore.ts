import { observable, action } from 'mobx';

export class UserStore {
  @observable
  public username: string;

  @observable
  public isAuthenticated = false;

  @action
  public authenticate() {
    this.isAuthenticated = true;
  }

  @action
  public signout() {
    this.isAuthenticated = false;
  }
}

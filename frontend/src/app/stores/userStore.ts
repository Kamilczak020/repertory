import { observable, action } from 'mobx';
import { API } from 'app/api';

export class UserStore {
  @observable
  public username: string;

  @observable
  public isAuthenticated = false;

  public constructor() {
    API.post('/auth/verify').then(() => this.isAuthenticated = true).catch(() => this.isAuthenticated = false);
  }

  @action
  public authenticate() {
    this.isAuthenticated = true;
  }

  @action
  public async signout() {
    this.isAuthenticated = false;
    await API.post('/auth/logout').catch((error) => console.log(error));
  }
}

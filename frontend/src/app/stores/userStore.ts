import { observable, computed, runInAction, action } from 'mobx';
import { API } from 'app/api';
import { UserModel } from 'app/model/userModel';

export class UserStore {
  @observable
  public model: UserModel;

  public constructor() {
    this.model = new UserModel();
    this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    API.post('/auth/verify')
      .then(() => this.model.isAuthenticated = true)
      .catch(() => this.model.isAuthenticated = false);
  }

  @computed
  public get username(): string { return this.model.username; }
  public set username(value: string) { runInAction('set isAuthenticated', () => this.model.username = value); }

  @computed
  public get isAuthenticated(): boolean { return this.model.isAuthenticated; }
  public set isAuthenticated(value: boolean) { runInAction('set isAuthenticated', () => {
    this.model.isAuthenticated = value;
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  }); }

  @action
  public signout() {
    API.post('/auth/logout');
    this.isAuthenticated = false;
  }
}

import { action, computed, observable } from 'mobx';
import { API } from 'app/api';

export class LoginStore {
  @observable
  public username: string;

  @observable
  public password: string;

  @observable
  public loginFailed: boolean = false;

  @computed
  public get usernameValid(): boolean {
    const regex = /^[A-Za-z0-9_]{3,20}$/;
    return regex.test(this.username);
  }

  @computed
  public get passwordValid(): boolean {
    const regex = /^.{10,}$/;
    return regex.test(this.password);
  }

  @action
  public async login(action: () => void): Promise<void> {
    this.clear();
    try {
      await API.post('/auth/login', { username: this.username, password: this.password });
      action();
    } catch (error) {
      this.loginFailed = true;
    }
  }

  @action
  public emptyFields() {
    this.username = undefined;
    this.password = undefined;
  }

  @action
  public clear() {
    this.loginFailed = false;
  }
}

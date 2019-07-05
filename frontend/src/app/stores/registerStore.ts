import { computed, observable, action } from 'mobx';
import { API } from 'app/api';

export class RegisterStore {
  @observable
  public username: string;

  @observable
  public email: string;

  @observable
  public password: string;

  @observable
  public failMessage: string;

  @observable
  public registerFailed: boolean;

  @computed
  public get usernameValid(): boolean {
    const regex = /^[A-Za-z0-9_]{3,20}$/;
    return regex.test(this.username);
  }

  @computed
  public get emailValid(): boolean {
    const regex = /[^@]+@[^\.]+\..+/;
    return regex.test(this.email);
  }

  @computed
  public get passwordValid(): boolean {
    const regex = /^.{10,}$/;
    return regex.test(this.password);
  }

  @action
  public async register(): Promise<void> {
    this.clear();
    try {
      await API.post('/auth/register', { username: this.username, email: this.email, password: this.password });
    } catch (error) {
      this.failMessage = error.response.data.reason;
      this.registerFailed = true;
    }
  }

  @action
  public emptyFields() {
    this.username = undefined;
    this.email = undefined;
    this.password = undefined;
  }

  @action
  public clear() {
    this.failMessage = undefined;
    this.registerFailed = false;
  }
}

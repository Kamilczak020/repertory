import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_REGISTER, STORE_ROUTER } from 'app/constants';
import { RegisterStore, RouterStore } from 'app/stores';
import { inject, observer } from 'mobx-react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classnames.bind(style);

@inject(STORE_REGISTER, STORE_ROUTER)
@observer
export class RegisterForm extends React.Component {
  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const element = event.target;
    const store = this.props[STORE_REGISTER] as RegisterStore;

    store[element.name] = element.value;
  }

  private getLabelIconName(elementName: string): IconProp {
    const store = this.props[STORE_REGISTER] as RegisterStore;

    switch (elementName) {
      case 'username':
        return store.username && store.usernameValid ? ['far', 'check-circle'] : ['far', 'times-circle'];
      case 'email':
        return store.username && store.emailValid ? ['far', 'check-circle'] : ['far', 'times-circle'];
      case 'password':
        return store.password && store.passwordValid ? ['far', 'check-circle'] : ['far', 'times-circle'];
      default:
        return 'times-circle';
    }
  }

  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    const registerStore = this.props[STORE_REGISTER] as RegisterStore;

    const submitButtonClassnames = cx({
      submitButton: true,
      registerFailed: registerStore.registerFailed,
    });

    return (
      <form className={style.registerForm}>
        <div className={style.formHeader}>
          <button className={style.signInButton}
            onClick={(e) => {
              registerStore.clear();
              routerStore.push('/signin');
              e.preventDefault();
            }}
          >Sign In</button>
          <button className={style.registerButton}
            onClick={(e) => {
              registerStore.clear();
              routerStore.push('register');
              e.preventDefault();
            }}
          >Register</button>
        </div>
        <div className={style.formBody}>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={style.labelIcon} icon={this.getLabelIconName('username')} />
              <label>Only alphanumerics and underscore, 3-20 characters.</label>
            </div>
            <input type="text" name="username" placeholder="Username"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={style.labelIcon} icon={this.getLabelIconName('email')} />
              <label>Must be a valid email address.</label>
            </div>
            <input type="text" name="email" placeholder="E-mail address"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={style.labelIcon} icon={this.getLabelIconName('password')} />
              <label>Password has to be a minimum of 10 characters.</label>
            </div>
            <input type="password" name="password" placeholder="Password"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
        </div>
        <div className={style.formFooter}>
          <input className={submitButtonClassnames} type="submit" value="Register"
            onClick={async (e) => {
              e.preventDefault();
              await registerStore.register();
            }}
          />
        </div>
      </form>
    );
  }
}

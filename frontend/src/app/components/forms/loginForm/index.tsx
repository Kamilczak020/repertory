import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_LOGIN, STORE_ROUTER, STORE_REGISTER, STORE_USER } from 'app/constants';
import { RouterStore, LoginStore, RegisterStore, UserStore } from 'app/stores';
import { inject, observer } from 'mobx-react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classnames.bind(style);

@inject(STORE_LOGIN, STORE_ROUTER, STORE_REGISTER, STORE_USER)
@observer
export class LoginForm extends React.Component {
  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const element = event.target;
    const store = this.props[STORE_LOGIN] as LoginStore;

    store[element.name] = element.value;
  }

  private getLabelIconName(elementName: string): IconProp {
    const store = this.props[STORE_LOGIN] as LoginStore;

    switch (elementName) {
      case 'username':
        return store.username && store.usernameValid ? ['far', 'check-circle'] : ['far', 'times-circle'];
      case 'password':
        return store.password && store.passwordValid ? ['far', 'check-circle'] : ['far', 'times-circle'];
      default:
        return 'times-circle';
    }
  }

  public componentDidMount() {
    const loginStore = this.props[STORE_LOGIN] as LoginStore;
    loginStore.clear();
  }

  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    const registerStore = this.props[STORE_REGISTER] as RegisterStore;
    const loginStore = this.props[STORE_LOGIN] as LoginStore;
    const userStore = this.props[STORE_USER] as UserStore;

    const submitButtonClassnames = cx({
      submitButton: true,
      loginFailed: loginStore.loginFailed,
    });

    return (
      <form className={style.loginForm} onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          loginStore.login(() => {
            userStore.isAuthenticated = true;
            routerStore.push('/profile');
          });
        }
      }}>
        <div className={style.formHeader}>
          <button className={style.signInButton}
            onClick={(e) => {
              e.preventDefault();
              loginStore.clear();
              routerStore.push('/signin');
            }}
          >Sign In</button>
          <button className={style.registerButton}
            onClick={(e) => {
              e.preventDefault();
              registerStore.emptyFields();
              registerStore.clear();
              routerStore.push('/register');
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
              <FontAwesomeIcon className={style.labelIcon} icon={this.getLabelIconName('password')} />
              <label>Password has to be a minimum of 10 characters.</label>
            </div>
            <input type="password" name="password" placeholder="Password"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
        </div>
        <div className={style.formFooter}>
          <input className={submitButtonClassnames} type="submit" value="Sign In"
            onClick={(e) => {
              e.preventDefault();
              loginStore.login(() => {
                userStore.isAuthenticated = true;
                routerStore.push('/profile');
              });
            }}
          />
        </div>
      </form>
    );
  }
}

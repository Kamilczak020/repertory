import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_REGISTER, STORE_ROUTER, STORE_LOGIN } from 'app/constants';
import { RegisterStore, RouterStore, LoginStore } from 'app/stores';
import { inject, observer } from 'mobx-react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classnames.bind(style);

@inject(STORE_LOGIN, STORE_REGISTER, STORE_ROUTER)
@observer
export class RegisterForm extends React.Component {
  private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const element = event.target;
    const store = this.props[STORE_REGISTER] as RegisterStore;

    store[element.name] = element.value;
  }

  public componentDidMount() {
    const registerStore = this.props[STORE_REGISTER] as RegisterStore;
    registerStore.clear();
  }

  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    const registerStore = this.props[STORE_REGISTER] as RegisterStore;
    const loginStore = this.props[STORE_LOGIN] as LoginStore;

    const submitButtonClassnames = cx({
      submitButton: true,
      registerFailed: registerStore.registerFailed,
    });

    const usernameLabelText = registerStore.failMessage === 'username-exists' ? 'Username is in use.' : 'Only alphanumerics and underscore, 3-20 characters.';
    const usernameLabelClassnames = cx ({
      fieldFailed: registerStore.failMessage === 'username-exists',
    });

    const emailLabelText = registerStore.failMessage === 'email-exists' ? 'Email is in use.' : 'Must be a valid e-mail address.';
    const emailLabelClassnames = cx ({
      fieldFailed: registerStore.failMessage === 'email-exists',
    });

    const usernameLabelIconClassnames = cx({
      labelIcon: true,
      fieldFailed: registerStore.failMessage === 'username-exists',
    });

    const emailLabelIconClassnames = cx({
      labelIcon: true,
      fieldFailed: registerStore.failMessage === 'email-exists',
    });

    const usernameLabelIcon: IconProp = registerStore.username && registerStore.usernameValid && registerStore.failMessage !== 'username-exists'
      ? ['far', 'check-circle']
      : ['far', 'times-circle'];

    const emailLabelIcon: IconProp = registerStore.username && registerStore.emailValid && registerStore.failMessage !== 'email-exists'
      ? ['far', 'check-circle']
      : ['far', 'times-circle'];

    const passwordLabelIcon: IconProp = registerStore.password && registerStore.passwordValid
      ? ['far', 'check-circle']
      : ['far', 'times-circle'];

    return (
      <form className={style.registerForm}>
        <div className={style.formHeader}>
          <button className={style.signInButton}
            onClick={(e) => {
              e.preventDefault();
              loginStore.emptyFields();
              loginStore.clear();
              routerStore.push('/signin');
            }}
          >Sign In</button>
          <button className={style.registerButton}
            onClick={(e) => {
              e.preventDefault();
              registerStore.clear();
              routerStore.push('/register');
            }}
          >Register</button>
        </div>
        <div className={style.formBody}>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={usernameLabelIconClassnames} icon={usernameLabelIcon} />
              <label className={usernameLabelClassnames}>{usernameLabelText}</label>
            </div>
            <input type="text" name="username" placeholder="Username"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={emailLabelIconClassnames} icon={emailLabelIcon} />
              <label className={emailLabelClassnames}>{emailLabelText}</label>
            </div>
            <input type="text" name="email" placeholder="E-mail address"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <div className={style.inputGroup}>
            <div className={style.labelGroup}>
              <FontAwesomeIcon className={style.labelIcon} icon={passwordLabelIcon} />
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

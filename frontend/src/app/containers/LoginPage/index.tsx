import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { LoginForm } from 'app/components/loginForm';

export class LoginPage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <LoginForm />
        </div>
      </div>
    );
  }
}

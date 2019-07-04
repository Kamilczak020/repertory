import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { RegisterForm } from 'app/components/registerForm';

export class RegisterPage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <RegisterForm />
        </div>
      </div>
    );
  }
}

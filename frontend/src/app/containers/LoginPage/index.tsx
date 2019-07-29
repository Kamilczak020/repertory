import * as React from 'react';
import { LoginForm } from 'app/components/loginForm';
import { BaseContainer } from 'app/containers/BaseContainer';

export class LoginPage extends React.Component {
  public render() {
    return (
      <BaseContainer>
        <LoginForm />
      </BaseContainer>
    );
  }
}

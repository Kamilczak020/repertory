import * as React from 'react';
import { RegisterForm } from 'app/components/forms';
import { BaseContainer } from 'app/containers/BaseContainer';

export class RegisterPage extends React.Component {
  public render() {
    return (
      <BaseContainer>
        <RegisterForm />
      </BaseContainer>
    );
  }
}

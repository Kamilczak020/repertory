import * as React from 'react';
import { ThankYouBox } from 'app/components/thankYouBox';
import { BaseContainer } from 'app/containers/BaseContainer';

export class ThankYouPage extends React.Component {
  public render() {
    return (
      <BaseContainer>
        <ThankYouBox />
      </BaseContainer>
    );
  }
}

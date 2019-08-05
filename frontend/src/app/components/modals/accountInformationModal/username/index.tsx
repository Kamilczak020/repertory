import * as React from 'react';
import * as style from './style.css';

export interface UsernameSubmodalState {
  username: string;
}

export class UsernameSubmodal extends React.Component<{}, UsernameSubmodalState> {
  public state = {
    username: ''
  }

  public render() {
    return (
      <div className={style.container}>
        <input type="text" placeholder="New Username" onChange={(event) => this.setState({ username: event.target.value })} />
      </div>
    );
  }
}
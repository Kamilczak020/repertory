import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { ImageUploader } from 'app/components/imageUploader';

export class ProfilePage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <div className={style.profileContainer}>
            <div className={style.userInfo}>
              <ImageUploader className={style.imageUploader} />
              <div className={style.userDetails}>
                <h2>Kamilczak020</h2>
                <p>Standard User</p>
                <h3>Account information</h3>
                <p>E-mail:</p>
                <p>Password:</p>
                <h3>Basic information</h3>
                <p>Birthday:</p>
                <p>Gender:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

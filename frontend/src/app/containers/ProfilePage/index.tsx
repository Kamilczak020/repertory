import * as React from 'react';
import * as style from './style.css';
import { ImageUploader } from 'app/components/imageUploader';
import EditIcon from '../../../assets/images/edit.svg';
import AddIcon from '../../../assets/images/plus.svg';
import { BaseContainer } from '../BaseContainer';

export class ProfilePage extends React.Component {
  public render() {
    return (
      <BaseContainer>
        <div className={style.appArea}>
          <div className={style.profileContainer}>
            <div className={style.userInfo}>
              <ImageUploader className={style.imageUploader} />
              <div className={style.userDetails}>
                <h2>Kamilczak020</h2>
                <p>Standard User</p>
                <div className={style.userData}>
                    <h3>Account information</h3>
                    <div className={style.fields}>
                      <p><span>E-mail:</span></p>
                      <p>kamilczak020@gmail.com</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                      <p><span>Password:</span></p>
                      <p>****************</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                    </div>
                    <h3>Basic information</h3>
                    <div className={style.fields}>
                      <p><span>Birthday:</span></p>
                      <p>20 may 1995</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                      <p><span>Gender:</span></p>
                      <p>Male</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                    </div>
                </div>
              </div>
            </div>
            <div className={style.roomList}>
              <div className={style.addRoomContainer}>
                <AddIcon className={style.addIcon} viewBox="0 0 44 44" />
                <p>Create room</p>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  }
}

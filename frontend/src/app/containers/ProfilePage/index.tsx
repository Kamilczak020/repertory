import * as React from 'react';
import * as style from './style.css';
import { BaseContainer } from '../BaseContainer';
import { STORE_PROFILE, STORE_USER, STORE_ROUTER } from 'app/constants';
import { RouterStore, UserStore, ProfileStore } from 'app/stores';
import { ImageUploaderModal } from 'app/components/modals';
import { format } from 'date-fns';
import { inject, observer } from 'mobx-react';
import EditIcon from 'assets/images/edit.svg';
import AddIcon from 'assets/images/plus.svg';
import PlaceholderImage from 'assets/images/placeholder-user.jpg';

@inject(STORE_PROFILE, STORE_USER, STORE_ROUTER)
@observer
export class ProfilePage extends React.Component {
  public componentDidMount() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    const userStore = this.props[STORE_USER] as UserStore;

    profileStore.fetchUserInfo().catch((error) => {
      if (error.response.status !== 200) {
        userStore.isAuthenticated = false;
        routerStore.replace('/signin');
      }
    });
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    return (
      <BaseContainer>
        <div className={style.appArea}>
          <div className={style.profileContainer}>
            <div className={style.userInfo}>
              <div className={style.imageUploaderContainer}>
                <img className={style.profilePicture} src={profileStore.avatar || PlaceholderImage} />
                <button onClick={() => profileStore.imageModalOpen = true}>Change Image</button>
              </div>
              <ImageUploaderModal />
              <div className={style.userDetails}>
                <h2>{profileStore.username || 'Repertory User'}</h2>
                <p>Standard User</p>
                <div className={style.userData}>
                    <h3>Account information</h3>
                    <div className={style.fields}>
                      <p><span>E-mail:</span></p>
                      <p>{profileStore.email || 'example@gmail.com'}</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                      <p><span>Password:</span></p>
                      <p>****************</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                    </div>
                    <h3>Basic information</h3>
                    <div className={style.fields}>
                      <p><span>Birthday:</span></p>
                      <p>{profileStore.birthday ? format(profileStore.birthday, 'DD-MM-YYYY') : 'Not provided'}</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                      <p><span>Location:</span></p>
                      <p>{profileStore.location || 'Not provided'}</p>
                      <EditIcon viewBox="0 0 300 300" className={style.icon} />
                    </div>
                </div>
              </div>
              <div className={style.userBio}>
                <h3>Bio</h3>
                <div className={style.bioFields}>
                  <p>{profileStore.bio || 'This user prefers to keep an aura of mystery around them.'}</p>
                  <EditIcon viewBox="0 0 300 300" className={style.icon} />
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

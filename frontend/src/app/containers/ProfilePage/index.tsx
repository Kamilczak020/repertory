import * as React from 'react';
import * as style from './style.css';
import { BaseContainer } from '../BaseContainer';
import { STORE_PROFILE, STORE_USER, STORE_ROUTER } from 'app/constants';
import { RouterStore, UserStore, ProfileStore } from 'app/stores';
import { ImageUploaderModal, AccountInformationModal, UserDetailsModal } from 'app/components/modals';
import { format } from 'date-fns';
import { inject, observer } from 'mobx-react';
import EditIcon from 'assets/images/edit.svg';
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
              <div className={style.userDetails}>
                <h2>{profileStore.username || 'Repertory User'}</h2>
                <p className={style.userType}>Standard User</p>
                <div className={style.userData}>
                  <div className={style.userColumns}>
                    <div className={style.userDataColumn}>
                      <div className={style.title}>
                        <h3>Account Infomation</h3>
                        <EditIcon className={style.icon} onClick={() => profileStore.accountInformationModalOpen = true} />
                      </div>
                      <div className={style.fields}>
                        <p><span>Username:</span></p>
                        <p>{profileStore.username || 'Repertory User'}</p>
                        <p><span>Password:</span></p>
                        <p>* * * * * * * * * *</p>
                        <p><span>E-mail:</span></p>
                        <p>{profileStore.email || 'example@gmail.com'}</p>
                        <p><span>Join date:</span></p>
                        <p>{format(profileStore.joinDate, 'DD MMMM YYYY') || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className={style.userDataColumn}>
                      <div className={style.title}>
                        <h3>User Details</h3>
                        <EditIcon className={style.icon} onClick={() => profileStore.userDetailsModalOpen = true} />
                      </div>
                      <div className={style.fields}>
                        <p><span>Name:</span></p>
                        <p>{profileStore.name || 'Not provided'}</p>
                        <p><span>Birthday:</span></p>
                        <p>{profileStore.birthday ? format(profileStore.birthday, 'DD MMMM YYYY') : 'Not provided'}</p>
                        <p><span>Gender:</span></p>
                        <p>{profileStore.gender || 'Not provided'}</p>
                        <p><span>Location:</span></p>
                        <p>{profileStore.location || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>              
                </div>
              </div>
            </div>
            <div className={style.trophyContainer}>
              <h3>Trophies</h3>
              <p>Acquire them all to gain premium access forever!</p>
              <div className={style.trophyList}>
            </div>
            </div>
            <AccountInformationModal />
            <UserDetailsModal />
            <ImageUploaderModal />
          </div>
        </div>
      </BaseContainer>
    );
  }
}

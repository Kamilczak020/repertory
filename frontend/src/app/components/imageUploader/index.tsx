import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER, STORE_PROFILE } from 'app/constants';
import { inject, observer } from 'mobx-react';
// import PlaceholderImage from '../../../assets/images/placeholder-user.jpg';
import { ImageUploaderModal } from '../imageUploaderModal';
import { ProfileStore } from 'app/stores/profileStore';

const cx = classnames.bind(style);

export interface ImageUploaderProps {
  className?: string;
}

@inject(STORE_ROUTER, STORE_PROFILE)
@observer
export class ImageUploader extends React.Component<ImageUploaderProps> {
  public componentWillMount() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;
    profileStore.fetchUserInfo();
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    const imageUploaderContainerClassnames = cx({
      imageUploaderContainer: true,
      [this.props.className]: true,
    });

    return (
      <div className={imageUploaderContainerClassnames}>
        <img className={style.profilePicture} src={profileStore.avatar} />
        <button onClick={() => profileStore.imageModalOpen = true}>Change Image</button>
        <ImageUploaderModal />
      </div>
    );
  }
}

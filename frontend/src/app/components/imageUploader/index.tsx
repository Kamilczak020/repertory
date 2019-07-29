import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER, STORE_UI } from 'app/constants';
import { inject, observer } from 'mobx-react';
import PlaceholderImage from '../../../assets/images/placeholder-user.jpg';
import { ImageUploaderModal } from '../imageUploaderModal';
import { UIStore } from 'app/stores/uiStore';

const cx = classnames.bind(style);

export interface ImageUploaderProps {
  className?: string;
}

@inject(STORE_ROUTER, STORE_UI)
@observer
export class ImageUploader extends React.Component<ImageUploaderProps> {
  public render() {
    const uiStore = this.props[STORE_UI] as UIStore;

    const imageUploaderContainerClassnames = cx({
      imageUploaderContainer: true,
      [this.props.className]: true,
    });

    return (
      <div className={imageUploaderContainerClassnames}>
        <img className={style.profilePicture} src={PlaceholderImage} />
        <button onClick={() => uiStore.imageModalOpen = true}>Change Image</button>
        <ImageUploaderModal />
      </div>
    );
  }
}

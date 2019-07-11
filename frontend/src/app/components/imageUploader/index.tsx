import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER } from 'app/constants';
import { inject, observer } from 'mobx-react';
import PlaceholderImage from '../../../assets/images/placeholder-user.jpg';

const cx = classnames.bind(style);

export interface ImageUploaderProps {
  className?: string;
}

@inject(STORE_ROUTER)
@observer
export class ImageUploader extends React.Component<ImageUploaderProps> {
  public render() {
    const imageUploaderContainerClassnames = cx({
      imageUploaderContainer: true,
      [this.props.className]: true,
    });

    return (
      <div className={imageUploaderContainerClassnames}>
        <img className={style.profilePicture} src={PlaceholderImage} />
        <button>Change Image</button>
      </div>
    );
  }
}

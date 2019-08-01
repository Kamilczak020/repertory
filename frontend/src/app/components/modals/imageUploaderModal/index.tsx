import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER, STORE_PROFILE } from 'app/constants';
import { inject, observer } from 'mobx-react';
import { ProfileStore } from 'app/stores/profileStore';
import { ProgressBar } from 'app/components/progressBar';
import { toast } from 'react-toastify';
import { API } from 'app/api';
import Dropzone from 'react-dropzone';
import Cropper from 'react-easy-crop';
import UploadIcon from 'assets/images/upload.svg';
import { BaseModal } from '../baseModal';

const cx = classnames.bind(style);

export interface ImageUploaderModalState {
  isDragOver: boolean;
  image: Blob;
  imagePreview: string | ArrayBuffer;
  crop: { x: number, y: number };
  cropArea: { x: number, y: number, width: number, height: number };
  zoom: number;
  aspect: number;
  uploadProgress: number;
}

@inject(STORE_ROUTER, STORE_PROFILE)
@observer
export class ImageUploaderModal extends React.Component<{}, ImageUploaderModalState> {
  public state = {
    isDragOver: false,
    image: undefined,
    imagePreview: undefined,
    crop: { x: 0, y: 0 },
    cropArea: { x: 0, y: 0, width: 0, height: 0 },
    zoom: 1,
    aspect: 1 / 1,
    uploadProgress: 0,
  }

  private handleFileLoad(acceptedFiles: Array<File>) {
    this.setState({ isDragOver: false });

    // We only ever accept a single file, and that is not going to change
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => this.setState({ imagePreview: reader.result });
    reader.onerror = () => toast.error('Image upload failed. Please try again.', { className: style.toastError });

    reader.readAsDataURL(file);
  }

  private async handleFileUpload() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    this.cropImage();
    const form = new FormData();
    const image = await this.cropImage();
    form.append('userImage', image, 'file.png');
    try {
      await API.post('/user/image', form, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          this.setState({ uploadProgress: progressEvent.loaded / progressEvent.total * 100 });
        },
      });
      profileStore.blobAvatar = image;
      toast.success('Image uploaded successfully.', { className: style.toast });
    } catch(error) {
      console.log(error);
      toast.error('Failed to upload image.', { className: style.toastError });
    }
  }

  private async cropImage(): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      console.log(this.state.cropArea);
      const context = canvas.getContext('2d');
      const image = new Image();
      image.src = this.state.imagePreview;
      console.log(image.height, image.width);
      context.drawImage(image, 
        this.state.cropArea.x, this.state.cropArea.y,
        this.state.cropArea.width, this.state.cropArea.height,
        0, 0,
        300, 300
      );
       canvas.toBlob(resolve, 'image/png', 1);
    });
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    const dropzoneClassNames = cx({
      dropzone: true,
      dragOver: this.state.isDragOver
    });

    return (
      <BaseModal className={style.imageModal} isOpen={profileStore.imageModalOpen} title="Upload Image"
        onClose={() => profileStore.imageModalOpen = false}
        onSave={() => this.handleFileUpload()}>
        <div className={style.cropArea}>
          <Cropper image={this.state.imagePreview} crop={this.state.crop} zoom={this.state.zoom} aspect={this.state.aspect}
            zoomSpeed={0.4}
            maxZoom={5}
            onCropChange={(crop) => this.setState({ crop })} 
            onZoomChange={(zoom) => this.setState({ zoom })}
            onCropComplete={(crop, cropArea) => this.setState({ cropArea })} />
        </div>
        <Dropzone accept={['image/png', 'image/jpeg']} multiple={false}
          onDragEnter={() => this.setState({ isDragOver: true })} 
          onDragLeave={() => this.setState({ isDragOver: false })}
          onDrop={(acceptedFiles) => this.handleFileLoad(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className={dropzoneClassNames} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop image file here, or click to select a file</p>
                <UploadIcon className={style.icon} viewBox="0 0 508.551 508.551" />
              </div>
            </section>
          )}
        </Dropzone>
        <ProgressBar className={style.progressBar} value={this.state.uploadProgress} />
      </BaseModal>
    );
  }
}

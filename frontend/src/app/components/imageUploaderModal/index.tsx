import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER, STORE_UI } from 'app/constants';
import { inject, observer } from 'mobx-react';
import { UIStore } from 'app/stores/uiStore';
import { ProgressBar } from '../progressBar';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import Cropper from 'react-easy-crop';
import CloseIcon from '../../../assets/images/cross.svg';
import UploadIcon from '../../../assets/images/upload.svg';
import { API } from 'app/api';

const cx = classnames.bind(style);

export interface ImageUploaderModalState {
  isDragOver: boolean;
  image: string | ArrayBuffer;
  crop: { x: number, y: number };
  zoom: number;
  aspect: number;
  uploadProgress: number;
}

@inject(STORE_ROUTER, STORE_UI)
@observer
export class ImageUploaderModal extends React.Component<{}, ImageUploaderModalState> {
  public state = {
    isDragOver: false,
    image: undefined,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1 / 1,
    uploadProgress: 0
  }

  private handleClose() {
    const uiStore = this.props[STORE_UI] as UIStore;
    uiStore.imageModalOpen = false;
  }

  private handleFileLoad(acceptedFiles: Array<File>) {
    this.setState({ isDragOver: false });

    // We only ever accept a single file, and that is not going to change
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => this.setState({ image: reader.result });
    reader.onerror = () => toast.error('Image upload failed. Please try again.', { className: style.toastError });

    reader.readAsDataURL(file);
  }

  private async handleFileUpload() {
    const formData = new FormData();
    formData.append('userImage', this.state.image);

    try {
      await API.post('/user/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          this.setState({ uploadProgress: progressEvent.loaded / progressEvent.total * 100 });
        },
      });

      toast.success('Image uploaded successfully.', { className: style.toast });
    } catch(error) {
      console.log(error);
      toast.error('Failed to upload image.', { className: style.toastError });
    }
  }

  public render() {
    const uiStore = this.props[STORE_UI] as UIStore;

    const dropzoneClassNames = cx({
      dropzone: true,
      dragOver: this.state.isDragOver
    });

    const modalContainerClassnames = cx({
      modalContainer: true,
      open: uiStore.imageModalOpen
    });

    return (
      <div className={modalContainerClassnames}>
        <div className={style.imageUploaderModal}>
          <button className={style.closeButton}>
            <CloseIcon className={style.icon} viewBox="0 0 612 612" onClick={()=> this.handleClose()} />
          </button>
          <h3>Upload Profile Picture</h3>
          <div className={style.cropArea}>
            <Cropper image={this.state.image} crop={this.state.crop} zoom={this.state.zoom} aspect={this.state.aspect}
              zoomSpeed={0.4}
              maxZoom={5}
              onCropChange={(crop) => this.setState({ crop })} 
              onZoomChange={(zoom) => this.setState({ zoom })} />
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
          <button onClick={async () => this.handleFileUpload()}>Upload</button>
        </div>
      </div>
    );
  }
}

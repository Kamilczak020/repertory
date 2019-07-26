import * as React from 'react';
import * as style from './style.css';
import * as classnames from 'classnames/bind';
import { STORE_ROUTER, STORE_UI } from 'app/constants';
import { inject, observer } from 'mobx-react';
import Dropzone from 'react-dropzone';

const cx = classnames.bind(style);

export interface ImageUploaderModalState {
  isDragOver: boolean;
}

@inject(STORE_ROUTER, STORE_UI)
@observer
export class ImageUploaderModal extends React.Component<{}, ImageUploaderModalState> {
  public state = {
    isDragOver: false,
  }

  public render() {
    const dropzoneClassNames = cx({
      dropzone: true,
      dragOver: this.state.isDragOver
    });

    return (
      <div className={style.imageUploaderModal}>
          <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)} 
            onDragEnter={() => this.setState({ isDragOver: true })} 
            onDragLeave={() => this.setState({ isDragOver: false })}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={dropzoneClassNames} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop image file here, or click to select a file</p>
                </div>
              </section>
            )}
          </Dropzone>
      </div>
    );
  }
}

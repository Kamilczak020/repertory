import { observable, action } from 'mobx';

export class UIStore {
  @observable
  public uploadImageModalOpen = false;

  @action
  public openUploadImageModal() {
    this.uploadImageModalOpen = true;
  }
}

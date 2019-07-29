import { observable, runInAction, computed } from 'mobx';
import { UIModel } from 'app/model/uiModel';

export class UIStore {
  public constructor() {
    this.model = new UIModel();
  }

  @observable
  private model: UIModel;

  @computed
  public get imageModalOpen(): boolean { return this.model.imageModalOpen; }
  public set imageModalOpen(value: boolean) { runInAction('set imageModalOpen', () => this.model.imageModalOpen = value); }
}

import { observable } from 'mobx';

export class ProfileModel {
  
  @observable
  public avatar: string;

  @observable
  public bio: string;

  @observable
  public birthday: Date;

  @observable
  public email: string;

  @observable
  public gender: string;

  @observable
  public joindate: Date;

  @observable
  public location: string;

  @observable
  public name: string;

  @observable
  public username: string;

  /* Modals */

  @observable
  public bioModalOpen: boolean;

  @observable
  public birthdayModalOpen: boolean;

  @observable
  public emailModalOpen: boolean;

  @observable
  public imageModalOpen: boolean;

  @observable
  public locationModalOpen: boolean;

  @observable
  public passwordModalOpen: boolean;
}

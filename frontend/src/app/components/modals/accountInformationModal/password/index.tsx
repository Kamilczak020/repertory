import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';
import { deepAccess } from 'app/util/deepAccess';

const cx = classnames.bind(style);

export interface PasswordSubmodalState {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  incorrectPassword: boolean;
}

@inject(STORE_PROFILE)
@observer
export class PasswordSubmodal extends React.Component<{}, PasswordSubmodalState> {
  public componentDidMount() {
    this.validatePassword();
    this.validateRepeatPassword();
  }

  public state = {
    oldPassword: undefined,
    newPassword: undefined,
    repeatNewPassword: undefined,
    incorrectPassword: false,
  }

  private validatePassword() {
    return /^.{10,}$/.test(this.state.newPassword);
  }

  private validateRepeatPassword() {
    return this.state.repeatNewPassword && this.state.repeatNewPassword === this.state.newPassword;
  }

  private async handleSave() {
    if (this.validatePassword() && this.validateRepeatPassword()) {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      try {
        await profileStore.savePassword(this.state.oldPassword, this.state.newPassword);
        toast.success('Password saved successfully.');
      } catch (error) {
        const reason = deepAccess(() => error.response.data.reason, null);
        if (reason === 'password-no-match') {
          this.setState({ incorrectPassword: true });
        }
      }
    } else {
      toast.error('Failed to save password.');
    }
  }

  public render() {
    const oldPasswordLabelClassnames = cx({
      labelGroup: true,
      fieldFailed: this.state.incorrectPassword,
    });

    return (
      <div className={style.container}>
        <form>
          <div className={oldPasswordLabelClassnames}>
            <label>{!this.state.incorrectPassword ? 'Password needs to match the old one.' : 'Password does not match the old password.'}</label>
          </div>
          <input type="text" placeholder="Old password" onChange={(event) => this.setState({ oldPassword: event.target.value, incorrectPassword: false })} />
          <div className={style.labelGroup}>
            <FontAwesomeIcon className={style.labelIcon} icon={this.validatePassword() ? ['far', 'check-circle'] : ['far', 'times-circle']} />
            <label>Password has to be a minimum of 10 characters.</label>
          </div>
          <input type="text" placeholder="New password" onChange={(event) => this.setState({ newPassword: event.target.value })} />
          <div className={style.labelGroup}>
            <FontAwesomeIcon className={style.labelIcon} icon={this.validateRepeatPassword() ? ['far', 'check-circle'] : ['far', 'times-circle']} />
            <label>Repeated password needs to match.</label>
          </div>
          <input type="text" placeholder="Repeat new password" onChange={(event) => this.setState({ repeatNewPassword: event.target.value })} />
        </form> 
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
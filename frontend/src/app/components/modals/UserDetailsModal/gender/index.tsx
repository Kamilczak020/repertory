import * as React from 'react';
import * as style from './style.css';
import { Checkbox } from 'app/components/checkbox';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';

export interface GenderSubmodalState {
  gender: string;
  isCustomChecked: boolean;
}

@inject(STORE_PROFILE)
@observer
export class GenderSubmodal extends React.Component<{}, GenderSubmodalState> {
  public state = {
    gender: undefined,
    isCustomChecked: false,
  }

  private async handleSave() {
    try {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      await profileStore.saveGender(this.state.gender);
      toast.success('Gender updated successfully.');
    } catch (error) {
      toast.error('Failed to update gender.');
    }
  }

  public render() {
    return (
      <div className={style.genderSubmodal}>
        <div className={style.fieldsContainer}>
          <div className={style.fields}>
            <Checkbox id="male" name="gender" onChange={(event) => event.target.checked ? this.setState({ gender: 'Male', isCustomChecked: false }): null}/>
            <span>Male</span>
          </div>
          <div className={style.fields}>
            <Checkbox id="female" name="gender" onChange={(event) => event.target.checked ? this.setState({ gender: 'Female', isCustomChecked: false }): null}/>
            <span>Female</span>
          </div>
          <div className={style.fields}>
            <Checkbox id="other" name="gender" checked={this.state.isCustomChecked} onChange={() => this.setState({ isCustomChecked: true })} />
            <span>Other:</span>
            <input type="text" placeholder="ex. Non-Binary" 
              onChange={(event) => this.setState({ gender: event.target.value })} 
              onFocus={() => this.setState({ isCustomChecked: true })}
            />
          </div>
        </div>
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
import * as React from 'react';
import * as style from './style.css';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { toast } from 'react-toastify';

import '!style-loader!css-loader!./style-calendar-override.css';

export interface BirthdaySubmodalState {
  selectedDate: Date;
}

@inject(STORE_PROFILE)
@observer
export class BirthdaySubmodal extends React.Component<{}, BirthdaySubmodalState> {
  public state = {
    selectedDate: new Date(),
  }

  private async handleSave() {
    try {
      const profileStore = this.props[STORE_PROFILE] as ProfileStore;
      await profileStore.saveBirthday(this.state.selectedDate);
      toast.success('Birthday updated successfully.');
    } catch (error) {
      toast.error('Failed to update birthday.');
    }
  }

  public render() {
    return (
      <div className={style.container}>
        <Calendar className={style.calendar}
          calendarType="US"
          locale="en-US"
          minDate={new Date('01-01-1900')}
          maxDate={new Date(Date.now())} 
          formatShortWeekday={(locale, date) => format(date, 'dd', { locale }).charAt(0)}
          formatMonth={(locale, date) => format(date, 'MMM', { locale })}
          onChange={(selectedDate: Date) => this.setState({ selectedDate })}
          value={this.state.selectedDate}
        />
        <button className={style.saveButton} onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}
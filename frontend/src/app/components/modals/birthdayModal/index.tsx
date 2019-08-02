import * as React from 'react';
import * as style from './style.css';
import { BaseModal } from '../baseModal';
import { inject, observer } from 'mobx-react';
import { STORE_PROFILE } from 'app/constants';
import { ProfileStore } from 'app/stores';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';
import '!style-loader!css-loader!./style-calendar-override.css';

export interface BirthdayModalState {
  selectedDate: Date;
}

@inject(STORE_PROFILE)
@observer
export class BirthdayModal extends React.Component<{}, BirthdayModalState> {
  public state = {
    selectedDate: new Date(Date.now())
  }

  private async handleSave() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;
    
    try {
      await profileStore.saveBirthday(this.state.selectedDate);
      toast.success('Location updated');
    } catch (error) {
      toast.error('Could not update location');
    }
  }

  public render() {
    const profileStore = this.props[STORE_PROFILE] as ProfileStore;

    return (
      <BaseModal className={style.birthdayModal} isOpen={profileStore.birthdayModalOpen} title="Change Birthday"
        onClose={() => profileStore.birthdayModalOpen = false}
        onSave={() => this.handleSave()}>
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
      </BaseModal>
    );
  }
}
import * as React from 'react';
import * as style from './style.css';
import { format } from 'date-fns';
import Calendar from 'react-calendar';

import '!style-loader!css-loader!./style-calendar-override.css';

export interface BirthdaySubmodalState {
  selectedDate: Date;
}

export class BirthdaySubmodal extends React.Component<{}, BirthdaySubmodalState> {
  public state = {
    selectedDate: new Date(),
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
      </div>
    );
  }
}
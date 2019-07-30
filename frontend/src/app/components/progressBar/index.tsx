import * as React from 'react';
import * as classnames from 'classnames/bind';
import * as style from './style.css';

const cx = classnames.bind(style);

export interface ProgressBarProps {
  className?: string;
  value: number;
}

export class ProgressBar extends React.Component<ProgressBarProps> {
  public render() {
    const progressBarClassnames = cx({
      progressBar: true,
      [this.props.className]: true
    });

    return (
      <div className={progressBarClassnames}>
        <div className={style.progress} style={{ width: `${this.props.value}%` }} />
      </div>
    );
  }
}
import * as React from 'react';
import * as style from './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface CheckboxProps {
  id: string;
  name: string;
  checked?: boolean;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Checkbox extends React.Component<CheckboxProps> {
  public render() {
    return (
      <div className={style.checkboxContainer}>
        <input id={this.props.id} name={this.props.name} className={style.check} type="radio" checked={this.props.checked}
          onChange={(event) => this.props.onChange(event)}/>
        <label htmlFor={this.props.id}>
          <div className={style.box}>
            <i><FontAwesomeIcon icon="check" /></i>
          </div>
        </label>
      </div>
    );
  }
}
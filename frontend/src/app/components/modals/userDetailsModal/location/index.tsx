import * as React from 'react';
import * as style from './style.css';
import GeoSuggest, { Suggest } from 'react-geosuggest';

export interface LocationSubmodalState {
  selectedLocation: Suggest;
}

export class LocationSubmodal extends React.Component<{}, LocationSubmodalState> {
  public state = {
    selectedLocation: undefined,
  }

  public render() {
    return (
      <div className={style.container}>
        <GeoSuggest types={['(cities)']} className={style.geosuggest} 
          inputClassName={style.input} 
          suggestsClassName={style.suggests}
          suggestsHiddenClassName={style.suggestsHidden}
          suggestItemClassName={style.item}
          suggestItemActiveClassName={style.itemActive}
          onSuggestSelect={(selectedLocation) => this.setState({ selectedLocation }) }
        />
      </div>
    );
  }
}
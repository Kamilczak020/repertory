import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { ToastContainer, Slide } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

export class BaseContainer extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          {this.props.children}
        </div>
        <ToastContainer autoClose={3500} transition={Slide} hideProgressBar={true} closeButton={false} position="bottom-center" />
      </div>
    );
  }
}

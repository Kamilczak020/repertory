import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { Footer } from 'app/components/footer';
import { ToastContainer, Slide } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';

export interface BaseContainerProps {
  children?: React.ReactElement;
}

export class BaseContainer extends React.Component<BaseContainerProps> {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          {this.props.children}
        </div>
        <Footer />
        <ToastContainer autoClose={3500} transition={Slide} hideProgressBar={true} closeButton={false} position="bottom-center" />
      </div>
    );
  }
}

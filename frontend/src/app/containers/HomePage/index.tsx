import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import Television from '../../../assets/images/television.svg';
import Discussion from '../../../assets/images/discussion.svg';
import Personalize from '../../../assets/images/personalize.svg';

export class HomePage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <div className={style.homeArea}>
            <h1>Enjoy videos online</h1>
            <h2>Together with Your friends</h2>
            <p>Why choose Repertory?</p>
            <div className={style.showcase}>
              <div className={style.showcaseGroup}>
                <Television className={style.icon} viewBox="0 0 503.607 503.607" />
                <h3>Watch</h3>
                <p>Stream videos for all users in the room, with priviledged users controlling the stream</p>
              </div>
              <div className={style.showcaseGroup}>
                <Discussion className={style.icon} viewBox="0 0 480 480" />
                <h3>Discuss</h3>
                <p>Use the built-in chat to discuss whatever you are watching with other users</p>
              </div>
              <div className={style.showcaseGroup}>
                <Personalize className={style.icon} viewBox="0 0 512.002 512" />
                <h3>Personalize</h3>
                <p>Make the experience yours, by tailoring the application to your needs</p>
              </div>
            </div>
            <div className={style.description}>
              <div className={style.descriptionGroup}>
                <h3>What inspired Repertory?</h3>
                <p>
                  Repertory has been created as a personal project. As a user of other, similar services,
                  I often found myself in need of specific features - failing to find one site that provided them all.
                </p>
                <p>
                  This is when I decided to build Repertory - originally to be used by me and my friends, I soon realized
                  that others may find it useful.
                </p>
                <p>
                  I tried to incorporate as many features as possible, while preserving user experience. I might have missed some,
                  so if you believe that something should be added / changed, do not hesitate to file an issue
                  <a href="https://github.com/Kamilczak020/repertory"> at the projects' GitHub page.</a>
                </p>
                <p>Every input is appreciated!</p>
              </div>
              <div className={style.descriptionGroup}>
                <h3>Is the application safe?</h3>
                <p>
                  Repertory has been created as a personal project. As a user of other, similar services,
                  I often found myself in need of specific features - failing to find one site that provided them all.
                </p>
                <p>
                  This is when I decided to build Repertory - originally to be used by me and my friends, I soon realized
                  that others may find it useful.
                </p>
                <p>
                  I tried to incorporate as many features as possible, while preserving user experience. I might have missed some,
                  so if you believe that something should be added / changed, do not hesitate to file an issue
                  <a href="https://github.com/Kamilczak020/repertory"> at the projects' GitHub page.</a>
                </p>
                <p>Every input is appreciated!</p>
              </div>
              <div className={style.descriptionGroup}>
                <h3>Is the application safe?</h3>
                <p>
                  Repertory has been created as a personal project. As a user of other, similar services,
                  I often found myself in need of specific features - failing to find one site that provided them all.
                </p>
                <p>
                  This is when I decided to build Repertory - originally to be used by me and my friends, I soon realized
                  that others may find it useful.
                </p>
                <p>
                  I tried to incorporate as many features as possible, while preserving user experience. I might have missed some,
                  so if you believe that something should be added / changed, do not hesitate to file an issue
                  <a href="https://github.com/Kamilczak020/repertory"> at the projects' GitHub page.</a>
                </p>
                <p>Every input is appreciated!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

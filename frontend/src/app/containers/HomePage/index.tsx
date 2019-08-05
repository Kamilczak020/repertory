import * as React from 'react';
import * as style from './style.css';
import { BaseContainerWithFooter } from 'app/containers/BaseContainerWithFooter';
import Television from 'assets/images/television.svg';
import Discussion from 'assets/images/discussion.svg';
import Personalize from 'assets/images/personalize.svg';

export class HomePage extends React.Component {
  public render() {
    return (
      <BaseContainerWithFooter>
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
                It aims to be as useful and intuitive as it is visually appealing - providing the ultimate end experience
                to users both new to the concept and those moving in from other services, for any reasons.
              </p>
              <p>
                I tried to incorporate as many features as possible, while preserving user experience. I might have missed some,
                so if you believe that something should be added / changed, do not hesitate to file an issue
                <a href="https://github.com/Kamilczak020/repertory"> at the projects' GitHub page.</a>
              </p>
              <p>Every input is appreciated!</p>
            </div>
            <div className={style.descriptionGroup}>
              <h3>What are the features?</h3>
              <p>
                Repertory was created with the premise of UX-friendliness, which makes finding features easy and intuitive.
                Here is a quick run-down of the more useful ones:
              </p>
              <ul>
              <li>Dark / light mode theme selection, triggered by pressing on the raven icon at the top of the page.</li>
              <li>Detachable chat, for those who want to watch in fullscreen and still be able to type on another monitor.</li>
              <li>Easy link sharing utilities, integrated into the chat and the player queue.</li>
              <li>Custom media player, featuring subtitles, quality selection and playback speed.</li>
              </ul>
              <p>And many more, which you will definitely find while using the application!</p>
            </div>
            <div className={style.descriptionGroup}>
              <h3>Is the application safe?</h3>
              <p>
                Repertory has been built with user security in mind. As a principle, users shouldn't even have to think
                about their data' safety.
              </p>
              <p>
                You get to choose how much information You want to share publicly. We promise to keep the rest a secret.
              </p>
              <p>
                This website is served over HTTPS only, and Your passwords are stored in the database hashed irreversibly.
                Authorization happens over JWT tokens stored in HTTPS cookies - which you can revoke at any time, by simply signing out of the application.
              </p>
              <p>
                Moreover, requests are Origin-restricted, meaning that XSS and CSRF attacks are in vain.
              </p>
              <p>
                We take user security very seriously - should you have any remarks or questions regarding it, please submit an issue
                <a href="https://github.com/Kamilczak020/repertory"> at the projects' GitHub page.</a>
              </p>
            </div>
          </div>
        </div>
      </BaseContainerWithFooter>
    );
  }
}

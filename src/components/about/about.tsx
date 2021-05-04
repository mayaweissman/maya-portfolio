import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { AboutPopUp } from "../about-pop-up/about-pop-up";
import "./about.css";


interface AboutState {
  language: string
}

export class About extends Component<any, AboutState>{

  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      language: store.getState().language
    };

    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const language = store.getState().language;
      this.setState({ language });
    });
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }


  public openAboutPopUp = (content: string) => (event: any) => {
    store.dispatch({ type: ActionType.changeDisplayForAboutPopUp });
    store.dispatch({ type: ActionType.getContentForAboutPopUp, payLoad: content });
  }

  public render() {
    return (
      <div className="about" id="about">
        <div className="about-box">
          <h1>{this.state.language === 'english' ? 'About' : 'אודות'}</h1>

          <div className="buttons-area">
            <button className="work-btn" onClick={this.openAboutPopUp('work')} style={{ fontFamily: this.state.language === 'english' ? "Futura" : "AlmoniNormal" }}>
              <img className="about-icon" src="./assets/images/career-icon.svg" />
              <span>{this.state.language === 'english' ? 'Career' : 'קריירה'}</span>
            </button>
            <button className="study-btn" onClick={this.openAboutPopUp('study')} style={{ fontFamily: this.state.language === 'english' ? "Futura" : "AlmoniNormal" }}>
              <img className="about-icon" src="./assets/images/education-icon.svg" />
              <span>{this.state.language === 'english' ? 'Education' : 'הכשרה'}</span>
            </button>
            <button className="about-btn" onClick={this.openAboutPopUp('profile')} style={{ fontFamily: this.state.language === 'english' ? "Futura" : "AlmoniNormal" }}>
              <img className="about-icon" src="./assets/images/profile-icon.svg" />
              <span>{this.state.language === 'english' ? 'About me' : 'עליי'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

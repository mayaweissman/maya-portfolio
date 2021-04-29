import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { AboutPopUp } from "../about-pop-up/about-pop-up";
import "./about.css";


export class About extends Component {

  public openAboutPopUp = (content: string) => (event: any) => {
    store.dispatch({ type: ActionType.changeDisplayForAboutPopUp });
    store.dispatch({ type: ActionType.getContentForAboutPopUp, payLoad: content });
  }

  public render() {
    return (
      <div className="about" id="about">
        <div className="about-box">
          <h1>About</h1>

          <div className="buttons-area">
            <button className="work-btn" onClick={this.openAboutPopUp('career')}>
              <img className="about-icon" src="./assets/images/career-icon.svg" />
              <span>Career summary</span>
            </button>
            <button className="study-btn" onClick={this.openAboutPopUp('study')}>
              <img className="about-icon" src="./assets/images/education-icon.svg" />
              <span>Education</span>
            </button>
            <button className="about-btn" onClick={this.openAboutPopUp('profile')}>
              <img className="about-icon" src="./assets/images/profile-icon.svg" />
              <span>About me</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./social.css";

export class Social extends Component {
  public dragSocial = (e: any) => {
    const clientX = e.clientX;
    console.log(clientX);
  };

  public render() {
    return (
      <div className="social" id="socical">
        <h1>Find me on social media</h1>

        <div className="circle">
          <div className="social-border facebook">
            <div className="social-circle"></div>
            <span className="social-title">Maya Weissman</span>
          </div>
          <div className="social-border instagram">
            <div className="social-circle"></div>
            <span className="social-title">@mayaweissman1</span>
          </div>
          <div className="social-border github">
            <div className="social-circle"></div>
            <span className="social-title">mayaweissman</span>
          </div>
          <div className="social-border whatsapp">
            <div className="social-circle"></div>
            <span className="social-title">050-475-1786</span>
          </div>
          <div className="social-border linekdin">
            <div onClick={this.dragSocial} className="social-circle"></div>
            <span className="social-title"> /mayaweissman</span>
          </div>
        </div>
        <div className="handle-social">
          <div className="handle-social-inside"></div>
          <div className="handle-social-deep"></div>
          <img className="drag-icon" src="./assets/images/drag.png" />
        </div>
      </div>
    );
  }
}

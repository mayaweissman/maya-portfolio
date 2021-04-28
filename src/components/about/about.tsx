import React, { Component } from "react";
import "./about.css";

export class About extends Component {
  public render() {
    return (
      <div className="about">
        <h1>About</h1>

        <div className="buttons-area">
          <button className="work-btn">Career summary</button>
          <button className="study-btn">Education</button>
          <button className="about-btn">About me</button>
        </div>
      </div>
    );
  }
}

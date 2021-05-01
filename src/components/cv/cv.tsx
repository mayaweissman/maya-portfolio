import React, { Component } from "react";
import "./cv.css";
import GetAppIcon from '@material-ui/icons/GetApp';


export class Cv extends Component {
  public render() {
    return (
      <div className="cv" id="cv">
        <div className="cv-inside">
          <h1>Download my cv</h1>
          <div className="download">
          <a href="./assets/pdf/maya-cv.pdf" download>
              <GetAppIcon style={{fontSize: '4vw', color: "white"}}/>
          </a>
          <span>If you need it all on PDF :)</span>
          </div>
   
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./welcome.css";

export class Welcome extends Component {

  public slideDown = ()=>{
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    window.scrollTo(0, vw);
  }

  public render() {
    return (
      <div className="welcome">
        <span className="hello">Hello!</span>
        <div className="name">
          <span className="letter">M</span>
          <span className="letter">y</span>
          <span className="letter"> </span>
          <span className="letter">n</span>
          <span className="letter">a</span>
          <span className="letter">m</span>
          <span className="letter">e</span>
          <span className="letter"> </span>
          <span className="letter">i</span>
          <span className="letter">s</span>
          <span className="letter"> </span>
          <span className="letter">M</span>
          <span className="letter">a</span>
          <span className="letter">y</span>
          <span className="letter">a</span>
          <span className="letter"> </span>
          <span className="letter">W</span>
          <span className="letter">e</span>
          <span className="letter">i</span>
          <span className="letter">s</span>
          <span className="letter">s</span>
          <span className="letter">m</span>
          <span className="letter">a</span>
          <span className="letter">n</span>
          <span className="letter">.</span>
          <br />
          <span className="letter">a</span>
          <span className="letter"> </span>
          <span className="letter">f</span>
          <span className="letter">u</span>
          <span className="letter">l</span>
          <span className="letter">l</span>
          <span className="letter"> </span>
          <span className="letter">s</span>
          <span className="letter">t</span>
          <span className="letter">a</span>
          <span className="letter">c</span>
          <span className="letter">k</span>
          <span className="letter"> </span>
          <span className="letter">d</span>
          <span className="letter">e</span>
          <span className="letter">v</span>
          <span className="letter">e</span>
          <span className="letter">l</span>
          <span className="letter">o</span>
          <span className="letter">p</span>
          <span className="letter">e</span>
          <span className="letter">r</span>
          <span className="letter">.</span>
          <br />
          <br />
          <span className="letter">/</span>
          <span className="letter">*</span>
          <span className="letter"> </span>
          <span className="letter">D</span>
          <span className="letter">o</span>
          <span className="letter">n</span>
          <span className="letter">'</span>
          <span className="letter">t</span>
          <span className="letter"> </span>
          <span className="letter">w</span>
          <span className="letter">o</span>
          <span className="letter">r</span>
          <span className="letter">r</span>
          <span className="letter">y</span>
          <span className="letter">,</span>
          <br />
          <span className="letter">I</span>
          <span className="letter">n</span>
          <span className="letter"> </span>
          <span className="letter">r</span>
          <span className="letter">e</span>
          <span className="letter">a</span>
          <span className="letter">l</span>
          <span className="letter">i</span>
          <span className="letter">t</span>
          <span className="letter">y</span>
          <span className="letter"> </span>
          <span className="letter">i</span>
          <span className="letter">t</span>
          <span className="letter">'</span>
          <span className="letter">s</span>
          <span className="letter"> </span>
          <span className="letter">h</span>
          <span className="letter">a</span>
          <span className="letter">p</span>
          <span className="letter">p</span>
          <span className="letter">e</span>
          <span className="letter">n</span>
          <span className="letter">i</span>
          <span className="letter">n</span>
          <span className="letter">g</span>
          <span className="letter"> </span>
          <span className="letter">m</span>
          <span className="letter">u</span>
          <span className="letter">c</span>
          <span className="letter">h</span>
          <span className="letter"> </span>
          <span className="letter">f</span>
          <span className="letter">a</span>
          <span className="letter">s</span>
          <span className="letter">t</span>
          <span className="letter">e</span>
          <span className="letter">r</span>
          <span className="letter"> </span>
          <span className="letter">*</span>
          <span className="letter">/</span>
          <span className="letter end-of-senctence"> </span>
        </div>

        <button onClick={this.slideDown} className="explore-more-btn">Explore more</button>
      </div>
    );
  }
}

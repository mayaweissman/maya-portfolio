import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import "./welcome.css";

interface WelcomeState {
  language: string
}


export class Welcome extends Component<any, WelcomeState>{


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


  public slideDown = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    window.scrollTo(0, this.getVerticalScrollPercentage(document.body, 18));
  }


  public getVerticalScrollPercentage(elm: any, percentage: number) {
    var p = elm.parentNode
    return p.scrollHeight / 100 * percentage;
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

        <button onClick={this.slideDown} className="explore-more-btn" style={{fontFamily : this.state.language === 'english' ? "Futura" : 'AlmoniNormal'}}>

          {this.state.language === 'english' ? 'Explore more' : 'מידע נוסף'}
        </button>
      </div>
    );
  }
}

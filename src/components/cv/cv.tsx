import React, { Component } from "react";
import "./cv.css";
import GetAppIcon from '@material-ui/icons/GetApp';
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";

interface CvState{
  language: string
}

export class Cv extends Component <any, CvState>{

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


  public render() {
    return (
      <div className="cv" id="cv">
        <div className="cv-inside">
          <h1>{this.state.language === 'english' ? 'Download My CV' : 'להורדת קורות החיים שלי'}</h1>
          <div className="download">
          <a href="./assets/pdf/maya-cv.pdf" download>
              <GetAppIcon style={{fontSize: window.screen.width < 600 ? '11vw' : '4vw', color: "white"}}/>
          </a>
          <span style={{direction: this.state.language === 'english' ? 'ltr' :'rtl'}}>
          {this.state.language === 'english' ? 'If you need it all on PDF :)' : 'אם יש לך צורך בכל זה בפורמט pdf :)'}
            
            </span>
          </div>
   
        </div>
      </div>
    );
  }
}

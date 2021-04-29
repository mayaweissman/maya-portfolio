import react, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import "./about-pop-up.css";

interface AboutPopUpState {
  content: string
}

export class AboutPopUp extends Component<any, AboutPopUpState> {

  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      content: store.getState().contentForAboutPopUp
    }

    this.unsubscribeStore = store.subscribe(() => {
      const content = store.getState().contentForAboutPopUp;
      this.setState({ content });
    })
  }

  public stopPropagation = (e: any) => {
    e.stopPropagation();
}

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="about-pop-up" onClick={()=>store.dispatch({type: ActionType.changeDisplayForAboutPopUp})}>
        <div className="inside-about-pop-up" onClick={this.stopPropagation}>
          <img className="close-pop-up" src="./assets/images/X.svg" onClick={()=>store.dispatch({type: ActionType.changeDisplayForAboutPopUp})}/>
          <h1>{this.state.content}</h1>
        </div>
      </div>
    );
  }
}

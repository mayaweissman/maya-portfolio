import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { AboutPopUp } from "../about-pop-up/about-pop-up";
import { About } from "../about/about";
import { Menu } from "../menu/menu";
import { Projects } from "../projects/projects";
import { Social } from "../social/social";
import { Technologies } from "../technologies/technologies";
import { Welcome } from "../welcome/welcome";
import "./layout.css";

interface LayoutState {
  display: boolean
}

export class Layout extends Component<any, LayoutState>{

  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      display: store.getState().isAboutPopUpShow
    }

    this.unsubscribeStore = store.subscribe(() => {
      const display = store.getState().isAboutPopUpShow;
      this.setState({ display });
    })
  }


  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="layout">
        <header>
          <Menu/>
        </header>
        <div className="welcome-area">
          <Welcome />
        </div>
        <main>
          <About />
          <Projects />
          <Technologies/>
          <Social/>
        </main>
        {this.state.display && <AboutPopUp />}

      </div>
    );
  }
}

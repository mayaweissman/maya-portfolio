import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { AboutPopUp } from "../about-pop-up/about-pop-up";
import { About } from "../about/about";
import { Cv } from "../cv/cv";
import { Footer } from "../footer/footer";
import { Form } from "../form/form";
import { Menu } from "../menu/menu";
import { MobileMenu } from "../mobile-menu/mobile-menu";
import { ProjectPopUp } from "../project-pop-up/project-pop-up";
import { Projects } from "../projects/projects";
import { Recursion } from "../recursion/recursion";
import { Social } from "../social/social";
import { Technologies } from "../technologies/technologies";
import { Welcome } from "../welcome/welcome";
import "./layout.css";

interface LayoutState {
  display: boolean;
  diplayForProjectPopUp: boolean;
  displayRecursion: boolean;
  scroll: number;
  isOnMobile: boolean;
  language: string;
}

export class Layout extends Component<any, LayoutState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      display: store.getState().isAboutPopUpShow,
      diplayForProjectPopUp: store.getState().isProjectPopUpShow,
      scroll: 0,
      isOnMobile: false,
      language: store.getState().language,
      displayRecursion: store.getState().displayRecursion,
    };

    this.unsubscribeStore = store.subscribe(() => {
      const display = store.getState().isAboutPopUpShow;
      this.setState({ display });
      const diplayForProjectPopUp = store.getState().isProjectPopUpShow;
      this.setState({ diplayForProjectPopUp });
      const language = store.getState().language;
      this.setState({ language });
      const displayRecursion = store.getState().displayRecursion;
      this.setState({ displayRecursion });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const display = store.getState().isAboutPopUpShow;
      this.setState({ display });
      const diplayForProjectPopUp = store.getState().isProjectPopUpShow;
      this.setState({ diplayForProjectPopUp });
      const language = store.getState().language;
      this.setState({ language });
      const displayRecursion = store.getState().displayRecursion;
      this.setState({ displayRecursion });
    });

    if (window.screen.width < 600) {
      this.setState({ isOnMobile: true });
    }

    console.log(
      "%c Hi there!",
      "font-weight: bold; font-size: 50px;color: rgb(214, 79, 153); text-shadow: 3px 3px 0 rgb(151, 214, 232) , 6px 6px 0 rgb(199, 122, 164) , 9px 9px 0 rgb(215, 186, 110) , 12px 12px 0 rgb(147, 206, 168)"
    );
    console.log(
      "%c If you are here, I can only guess you looking for some errors...\n My first senior, Who was really smart once told me that the more you know \n the more you realize you actullay know nothing. \n So, if u do found errors, I wish you will tell me about them :) \n mayaw10@gmail.com",
      "color: rgb(51, 51, 51); font-family:sans-serif; font-size: 14px; "
    );

    window.addEventListener("scroll", () => {
      const scroll = +this.getVerticalScrollPercentage(document.body);
      this.setState({ scroll });
    });

    if (sessionStorage.getItem("recursion") === "true") {
      store.dispatch({ type: ActionType.showRecursion, payLoad: true });
    }
  }

  public getVerticalScrollPercentage(elm: any) {
    var p = elm.parentNode;
    return (
      ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) * 100
    );
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div
        className="layout"
        style={{
          fontFamily:
            this.state.language === "english" ? "Futura" : "AlmoniNormal",
        }}
      >
        <header>
          {!this.state.isOnMobile && <Menu />}
          {this.state.isOnMobile && this.state.scroll >= 5 && <MobileMenu />}
        </header>
        <div className="welcome-area">
          <Welcome />
        </div>
        {!this.state.isOnMobile && (
          <main>
            {this.state.scroll >= 5 && <About />}
            {this.state.scroll >= 25 && <Technologies />}
            {this.state.scroll >= 35 && <Projects />}
            {this.state.scroll >= 55 && <Cv />}
            {this.state.scroll >= 65 && <Social />}
            {this.state.scroll >= 80 && <Form />}
          </main>
        )}

        {this.state.isOnMobile && (
          <main>
            {this.state.scroll >= 1 && <About />}
            {this.state.scroll >= 16 && <Technologies />}
            {this.state.scroll >= 35 && <Projects />}
            {this.state.scroll >= 50 && <Cv />}
            {this.state.scroll >= 60 && <Social />}
            {this.state.scroll >= 78 && <Form />}
          </main>
        )}
        {this.state.display && <AboutPopUp />}
        {this.state.diplayForProjectPopUp && <ProjectPopUp />}
        {this.state.displayRecursion && <Recursion />}

        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

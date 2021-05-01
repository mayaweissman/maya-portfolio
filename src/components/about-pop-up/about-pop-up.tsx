import react, { Component } from "react";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { AboutModel } from "../../models/aboutModel";
import "./about-pop-up.css";

interface AboutPopUpState {
  contentKey: string;
  content: AboutModel[];
}


export class AboutPopUp extends Component<any, AboutPopUpState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      contentKey: store.getState().contentForAboutPopUp,
      content: this.contents,
    };

    this.unsubscribeStore = store.subscribe(() => {
      const contentKey = store.getState().contentForAboutPopUp;
      this.setState({ contentKey });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const contentKey = store.getState().contentForAboutPopUp;
      this.setState({ contentKey });
    });
  }

  public contents = [
    {
      key: "profile",
      title: "About me",
      imgSrc: "profile-icon.svg",
      content: `Hi! <br/> My name is Maya Weissman. <br/>
     I discovered my love for web development through a completely different profession. <br/>
     In my youth, I was a makeup business owner. <br/>
     Like any business owner - I needed a website, landing pages and more others. <br/>
     With very little knowledge, I turned to the platforms through them I could build such assets. <br/>
     I spent so many hours working on platforms like WordPress, Wix and others, and I realized I was not in the right field. <br/>
     I fell in love with what I did, and realized I had to turn this hobby into a profession. <br/>
     <br/>
     Today, I am happy to say that I am completely in the right field.<br/>
     I am waking up every morning with a passion for what I do. <br/>
     Im in love with writing codes, Working on a team,
     Solving problems and thinking outside the box when I encounter a really annoying problem.<br/>
     I guess only those who work in the field will understand what I mean :)
     `,
    },
    {
      key: "study",
      title: "Education",
      imgSrc: "education-icon.svg",
      content: `Since entering the industry, I've heard quite a bit of the question - <br/>
       "Why didn't you just do a 3-month course on Udemy? <br/>
       The truth is, the one-year course I took at John Bryce College is one of the best experiences I have had. <br/>
       As part of my studies, I got all the initial toolbox I needed for the first step in the industry. <br/>
       If you already read the "about me" paragraph, you know that I came to John Bryce with zero experience in writing code.<br/>
       At the beginning of the course, I was one of the annoying students, asking a thousand questions - and yes, is far behind everyone in the material.<br/>
       Call me competitive - but it did not suit me at all not to excel.<br/>
       I took the course very seriously, and apart from the homework I got from the lecturer, I would spend hours experimenting and mostly doing a lot of self-learning.<br/>
       Thus, it turned out that I graduated with honors - Wuth an average score of 98 in all projects and tests. <br/>
       <br/>
       It's hard to say that's where my studies ended. The truth is, then they just started. Luckily, I keep learning new things every day :)     `,
    },
    {
      key: "work",
      title: "Career",
      imgSrc: "career-icon.svg",
      content: `
      In early 2020, I started working at "McCann Group" as a Full stack developer. <br/>
      As part of my work, I have taken part in many and varied projects, some for the company's clients and some internal projects. <br/>
      Due to the large number of projects that were intended for different clients, <br/>
      I experienced working in a number of different systems such as:<br/>
       JavaScript, TypeScript, ReactJS, ReactTS, React Native, Wordpress, PHP, Node.js, Vanilla Js, Excel Functions, FileZilla, VS Code and more others.
      <br/>
      I have built Web apps, websites, landing pages and other digital assets for large and reputable clients such as: 
      Carasso group, Ikea, Partner, Similac, Shahal, Sekindo, Peres academic center and many more others. <br/>
      I also took a significant part in the work optimization project within the company. <br/>
      As part of this, I implemented innovative systems in the company, improved existing processes.<br/>
      I also assisted in the company's familiarity with frameworks such as React, Angular, Node.js and more.
      <br/><br/>
      As part of my work, I was privileged to receive additional tools that help me in the world of programming such as ui / ux, data management, information security and more.

      `,
    },
  ];
  public stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public getContent = () => {
    return this.state.content.find((c) => c.key === this.state.contentKey);
  };

  public render() {
    return (
      <div
        className="about-pop-up"
        onClick={() =>
          store.dispatch({ type: ActionType.changeDisplayForAboutPopUp })
        }
      >
        <div className="inside-about-pop-up" onClick={this.stopPropagation}>
          <img
            className="close-pop-up"
            src="./assets/images/X.svg"
            onClick={() =>
              store.dispatch({ type: ActionType.changeDisplayForAboutPopUp })
            }
          />
          <h1>{this.getContent()?.title}</h1>
          <img className="about-image" src={"./assets/images/" + this.getContent()?.imgSrc}/>
          <div className="content-area" dangerouslySetInnerHTML={{__html : this.getContent()?.content as string}}></div>
        </div>
      </div>
    );
  }
}

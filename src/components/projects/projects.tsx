import React, { Component } from "react";
import "./projects.css";
import { Carousel } from "../carousel/carousel";
import { ProjectModel } from "../../models/projectModel";
import { getProjects } from "../../data/projects";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import AddIcon from "@material-ui/icons/Add";
import { Unsubscribe } from "redux";

interface ProjectsState {
  allProjects: ProjectModel[];
  language: string;
}

export class Projects extends Component<any, ProjectsState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      allProjects: getProjects(),
      language: store.getState().language,
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

  public openPopUp = (project: ProjectModel) => (e: any) => {
    if (project.id !== 3) {
      store.dispatch({ type: ActionType.getProjectForPopUp, payLoad: project });
      store.dispatch({ type: ActionType.changeDisplayForProjectPopUp });
    } else {
      sessionStorage.setItem("recursion", "true");
      setTimeout(() => {
        window.open("#", "_blank");
      }, 1000);
    }
  };

  public render() {
    return (
      <div className="projects" id="projects">
        <h1>
          {" "}
          {this.state.language === "english" ? "Projects" : "תיק עבודות"}
        </h1>
        <Carousel
          slides={this.state.allProjects.map((p) => (
            <div className="slide">
              <img src={"./assets/images/" + p.imgSrc} />
              <div
                onClick={this.openPopUp(p)}
                className="title-for-profect-section"
              >
                <span>{p.title}</span>
              </div>
            </div>
          ))}
        />
      </div>
    );
  }
}

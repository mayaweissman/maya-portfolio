import React, { Component } from "react";
import "./projects.css";
import { Carousel } from "../carousel/carousel";
import { ProjectModel } from "../../models/projectModel";
import { getProjects } from "../../data/projects";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import AddIcon from '@material-ui/icons/Add';

interface ProjectsState {
  allProjects: ProjectModel[];
}

export class Projects extends Component<any, ProjectsState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      allProjects: getProjects(),
    };
  }

  public openPopUp = (project: ProjectModel) => (e: any) => {
    if(project.id !== 3){
      store.dispatch({ type: ActionType.getProjectForPopUp, payLoad: project });
      store.dispatch({ type: ActionType.changeDisplayForProjectPopUp });
    }
    else{
      window.open("#", '_blank');
    }
  };
  
  public render() {
    return (
      <div className="projects" id="projects">
        <h1>Projects</h1>
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

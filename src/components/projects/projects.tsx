import React, { Component } from "react";
import "./projects.css";
import { Carousel } from "../carousel/carousel";
import { ProjectModel } from "../../models/projectModel";
import { getProjects } from "../../data/projects";

interface ProjectsState{
    allProjects: ProjectModel[]
}

export class Projects extends Component <any,ProjectsState>{

    public constructor(props:any){
        super(props);
        this.state = {
            allProjects: getProjects()
        }
    }

    public render() {
        return (
            <div className="projects" id="projects">
                <h1>Projects</h1>
                <Carousel
      slides={
          this.state.allProjects.map(p => 
            <div className="slide">
                <img src={"./assets/images/" + p.imgSrc}/>
                <div className="title-for-profect-section">
                <span>{p.title}</span>
                </div>
            </div>,
            )
         
      }
    />
            </div>
        )
    }
}
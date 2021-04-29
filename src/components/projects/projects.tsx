import React, { Component } from "react";
import "./projects.css";
import { Carousel } from "../carousel/carousel";



export class Projects extends Component {


    public render() {
        return (
            <div className="projects" id="projects">
                <h1>Projects</h1>
                <Carousel
      slides={[
        <div className="slide">Slide #1</div>,
        <div className="slide">Slide #2</div>,
        <div className="slide">Slide #3</div>
      ]}
    />
            </div>
        )
    }
}
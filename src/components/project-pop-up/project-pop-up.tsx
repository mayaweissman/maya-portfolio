import React, { Component } from "react";
import { Unsubscribe } from "redux";
import { ProjectModel } from "../../models/projectModel";
import { store } from "../../redux/store";
import "./project-pop-up.css";
import LinkIcon from "@material-ui/icons/Link";
import IconButton from "@material-ui/core/IconButton";
import { ActionType } from "../../redux/actionType";

interface ProjectPopUpState {
  project: ProjectModel;
}

export class ProjectPopUp extends Component<any, ProjectPopUpState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      project: store.getState().projectForPopUP,
    };

    this.unsubscribeStore = store.subscribe(() => {
      const project = store.getState().projectForPopUP;
      this.setState({ project });
    });
  }

  public componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      const project = store.getState().projectForPopUP;
      this.setState({ project });
    });
  }

  public componentWillUnmount(): void {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="project-pop-up">
        <div className="inside-project-pop-up">
            <h1>{this.state.project.title}</h1>
          <img
            className="close-pop-up"
            src="./assets/images/X.svg"
            onClick={() =>
              store.dispatch({ type: ActionType.changeDisplayForProjectPopUp })
            }
          />

          <video autoPlay muted>
            <source
              src={"./assets/videos/" + this.state.project.videoSrc}
              type="video/mp4"
            />
          </video>
          <div className="frameworks">
            {this.state.project.frameworks?.map((f) => (
              <div className="framework">{f}</div>
            ))}
          </div>

          <div
            className="url-icon"
            onClick={() => window.open(this.state.project.url, "_blank")}
          >
            <IconButton>
              <LinkIcon style={{ color: "white", fontSize: "2vw" }} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

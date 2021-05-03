import { ProjectModel } from "../models/projectModel";

export class AppState {

  public contentForAboutPopUp: string = 'study';
  public isAboutPopUpShow: boolean = false;
  public isProjectPopUpShow: boolean = false;
  public projectForPopUP: ProjectModel = new ProjectModel()
  // public projectForPopUP: ProjectModel = new ProjectModel()

  public constructor() { }
}

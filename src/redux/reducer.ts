import { AppState } from "./appState";
import { Action } from "./action";
import { ActionType } from "./actionType";
import { act } from "react-dom/test-utils";

export function reducer(oldAppState: AppState, action: Action): AppState {
  const newAppState = { ...oldAppState }; //Duplicate the old state into a new state

  switch (action.type) {
    case ActionType.changeDisplayForAboutPopUp:
      if (!newAppState.isAboutPopUpShow) {
        newAppState.isAboutPopUpShow = true;
      }
      else {
        newAppState.isAboutPopUpShow = false;
      }
      break;

    case ActionType.changeDisplayForProjectPopUp:
      if (!newAppState.isProjectPopUpShow) {
        newAppState.isProjectPopUpShow = true;
      }
      else {
        newAppState.isProjectPopUpShow = false;
      }
      break;

    case ActionType.changeLanguage:
      if (newAppState.language === 'english') {
        newAppState.language = 'hebrew';
      }
      else {
        newAppState.language = 'english';
      }
      break;

    case ActionType.getContentForAboutPopUp:
      newAppState.contentForAboutPopUp = action.payLoad;
      break;

    case ActionType.getProjectForPopUp:
      newAppState.projectForPopUP = action.payLoad;
      break;

    case ActionType.showRecursion:
      newAppState.displayRecursion = action.payLoad;
      break;
      
    default:
      break;
  }

  return newAppState;
}

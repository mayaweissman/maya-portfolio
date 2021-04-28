import { reducer } from "./reducer";
import { AppState } from "./appState";
import { applyMiddleware, createStore  } from "redux";
import { saveToSessionStorage } from "./middleware";


export const store = createStore(reducer, new AppState(), applyMiddleware(saveToSessionStorage));



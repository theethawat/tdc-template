import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import AssetReducer from "./AssetReducer";
import LogbookReducer from "./LogbookReducer";
import NotebookReducer from "./NotebookReducer";
import ProjectReducer from "./ProjectReducer";
import TimelineReducer from "./TimelineReducer";

const rootReducers = combineReducers({
  me: MeReducer,
  project: ProjectReducer,
  asset: AssetReducer,
  logbook: LogbookReducer,
  notebook: NotebookReducer,
  timeline: TimelineReducer,
});

export default rootReducers;

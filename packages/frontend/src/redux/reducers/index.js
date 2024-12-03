import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import AssetReducer from "./AssetReducer";
import LogbookReducer from "./LogbookReducer";
import NotebookReducer from "./NotebookReducer";
import ProjectReducer from "./ProjectReducer";
import TimelineReducer from "./TimelineReducer";
import UserReducer from "./UserReducer";

const rootReducers = combineReducers({
  me: MeReducer,
  project: ProjectReducer,
  asset: AssetReducer,
  logbook: LogbookReducer,
  notebook: NotebookReducer,
  timeline: TimelineReducer,
  user: UserReducer,
});

export default rootReducers;

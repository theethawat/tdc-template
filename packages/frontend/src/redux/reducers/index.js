import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import UserReducer from "./UserReducer";

const rootReducers = combineReducers({
  me: MeReducer,
  user: UserReducer,
});

export default rootReducers;

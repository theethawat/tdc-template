import {
  USER_ALL,
  USER_CREATE,
  USER_DELETE,
  USER_EDIT,
  USER_ERROR,
  USER_GET,
  USER_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: USER_ALL,
  getConst: USER_GET,
  postConst: USER_CREATE,
  putConst: USER_EDIT,
  deleteConst: USER_DELETE,
  errorConst: USER_ERROR,
  loadingConst: USER_LOADING,
});

const UserReducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default UserReducer;

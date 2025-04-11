import {
  DEPARTMENT_ALL,
  DEPARTMENT_CREATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_EDIT,
  DEPARTMENT_ERROR,
  DEPARTMENT_GET,
  DEPARTMENT_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: DEPARTMENT_ALL,
  getConst: DEPARTMENT_GET,
  postConst: DEPARTMENT_CREATE,
  putConst: DEPARTMENT_EDIT,
  deleteConst: DEPARTMENT_DELETE,
  errorConst: DEPARTMENT_ERROR,
  loadingConst: DEPARTMENT_LOADING,
});

const DepartmentReducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default DepartmentReducer;

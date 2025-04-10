import {
  {{modelCapital}}_ALL,
  {{modelCapital}}_CREATE,
  {{modelCapital}}_DELETE,
  {{modelCapital}}_EDIT,
  {{modelCapital}}_ERROR,
  {{modelCapital}}_GET,
  {{modelCapital}}_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: {{modelCapital}}_ALL,
  getConst: {{modelCapital}}_GET,
  postConst: {{modelCapital}}_CREATE,
  putConst: {{modelCapital}}_EDIT,
  deleteConst: {{modelCapital}}_DELETE,
  errorConst: {{modelCapital}}_ERROR,
  loadingConst: {{modelCapital}}_LOADING,
});

const {{modelName}}Reducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default {{modelName}}Reducer;

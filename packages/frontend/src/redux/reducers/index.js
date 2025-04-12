import { combineReducers } from "redux";

import MeReducer from "./MeReducers";
import UserReducer from "./UserReducer";
import DepartmentReducers from "./DepartmentReducers";
/** Script Import New Reducer */

const rootReducers = combineReducers({
  me: MeReducer,
  user: UserReducer,
  department: DepartmentReducers,
  /** Script Add New Reducer */
});

export default rootReducers;

/** ห้ามลบคอมเมนต์ตรงคำว่า Script Add New Reducer และ Script Import Reducer
 * นะเป็น Script ที่วางเอาไว้ ให้มันอยู่ล่างสุดเสมอ
 * Do not remove the comment line below, it is a script that always put it at the bottom of the file
 * It will be used to add new const to the file automatically.
 */

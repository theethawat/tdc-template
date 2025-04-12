import GeneralAction from "../class/GeneralAction";
import { DEPARTMENT_ALL, DEPARTMENT_ERROR, DEPARTMENT_LOADING } from "../type";

const DepartmentAction = new GeneralAction("department", "Department", {
  allConst: DEPARTMENT_ALL,
  oneConst: "DEPARTMENT_X",
  errorConst: DEPARTMENT_ERROR,
  createConst: "DEPARTMENT_X",
  updateConst: "DEPARTMENT_X",
  deleteConst: "DEPARTMENT_X",
  loadingConst: DEPARTMENT_LOADING,
});

export const getAllDepartment = (query) => DepartmentAction.getAllData(query);

import GeneralAction from "../class/GeneralAction";
import {
  DEPARTMENT_ALL,
  DEPARTMENT_CREATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_EDIT,
  DEPARTMENT_ERROR,
  DEPARTMENT_GET,
  DEPARTMENT_LOADING,
} from "../type";

const DepartmentAction = new GeneralAction("department", "Department", {
  allConst: DEPARTMENT_ALL,
  oneConst: DEPARTMENT_GET,
  errorConst: DEPARTMENT_ERROR,
  createConst: DEPARTMENT_CREATE,
  updateConst: DEPARTMENT_EDIT,
  deleteConst: DEPARTMENT_DELETE,
  loadingConst: DEPARTMENT_LOADING,
});

export const getAllDepartment = (query) => DepartmentAction.getAllData(query);
export const getOneDepartment = (id) => DepartmentAction.getOneData(id);
export const createOneDepartment = (data) => DepartmentAction.createOne(data);
export const updateOneDepartment = (id, payload) => DepartmentAction.editOne(id, payload);
export const deleteOneDepartment = (id) => DepartmentAction.deleteOne(id);

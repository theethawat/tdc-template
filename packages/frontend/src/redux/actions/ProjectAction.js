import GeneralAction from "./GeneralAction";
import {
  PROJECT_ALL,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_EDIT,
  PROJECT_ERROR,
  PROJECT_GET,
} from "../type";

const ProjectAction = new GeneralAction("project", "Project", {
  allConst: PROJECT_ALL,
  oneConst: PROJECT_GET,
  errorConst: PROJECT_ERROR,
  createConst: PROJECT_CREATE,
  updateConst: PROJECT_EDIT,
  deleteConst: PROJECT_DELETE,
});

export const getAllProject = (query) => ProjectAction.getAllData(query);
export const getOneProject = (id) => ProjectAction.getOneData(id);
export const createOneProject = (data) => ProjectAction.createOne(data);
export const updateOneProject = (id, payload) =>
  ProjectAction.editOne(id, payload);
export const deleteOneProject = (id) => ProjectAction.deleteOne(id);

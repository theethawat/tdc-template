import GeneralAction from "./GeneralAction";
import {
  NOTEBOOK_ALL,
  NOTEBOOK_CREATE,
  NOTEBOOK_DELETE,
  NOTEBOOK_EDIT,
  NOTEBOOK_ERROR,
  NOTEBOOK_GET,
} from "../type";

const NotebookAction = new GeneralAction("notebook", "Notebook", {
  allConst: NOTEBOOK_ALL,
  oneConst: NOTEBOOK_GET,
  errorConst: NOTEBOOK_ERROR,
  createConst: NOTEBOOK_CREATE,
  updateConst: NOTEBOOK_EDIT,
  deleteConst: NOTEBOOK_DELETE,
});

export const getAllNotebook = (query) => NotebookAction.getAllData(query);
export const getOneNotebook = (id) => NotebookAction.getOneData(id);
export const createOneNotebook = (data) => NotebookAction.createOne(data);
export const updateOneNotebook = (id, payload) =>
  NotebookAction.editOne(id, payload);
export const deleteOneNotebook = (id) => NotebookAction.deleteOne(id);

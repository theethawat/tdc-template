import GeneralAction from "./GeneralAction";
import {
  LOGBOOK_ALL,
  LOGBOOK_CREATE,
  LOGBOOK_DELETE,
  LOGBOOK_EDIT,
  LOGBOOK_ERROR,
  LOGBOOK_GET,
} from "../type";

const LogbookAction = new GeneralAction("logbook", "Logbook", {
  allConst: LOGBOOK_ALL,
  oneConst: LOGBOOK_GET,
  errorConst: LOGBOOK_ERROR,
  createConst: LOGBOOK_CREATE,
  updateConst: LOGBOOK_EDIT,
  deleteConst: LOGBOOK_DELETE,
});

export const getAllLogBook = (query) => LogbookAction.getAllData(query);
export const getOneLogBook = (id) => LogbookAction.getOneData(id);
export const createOneLogBook = (data) => LogbookAction.createOne(data);
export const updateOneLogBook = (id, payload) =>
  LogbookAction.editOne(id, payload);
export const deleteOneLogBook = (id) => LogbookAction.deleteOne(id);

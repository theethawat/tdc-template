import GeneralAction from "./GeneralAction";
import {
  USER_ALL,
  USER_CREATE,
  USER_DELETE,
  USER_EDIT,
  USER_ERROR,
  USER_GET,
} from "../type";

const UserAction = new GeneralAction("user", "User", {
  allConst: USER_ALL,
  oneConst: USER_GET,
  errorConst: USER_ERROR,
  createConst: USER_CREATE,
  updateConst: USER_EDIT,
  deleteConst: USER_DELETE,
});

export const getAllUser = (query) => UserAction.getAllData(query);
export const getOneUser = (id) => UserAction.getOneData(id);
export const createOneUser = (data) => UserAction.createOne(data);
export const updateOneUser = (id, payload) => UserAction.editOne(id, payload);
export const deleteOneUser = (id) => UserAction.deleteOne(id);

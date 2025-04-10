import GeneralAction from "../class/GeneralAction";
import {
  {{modelCapital}}_ALL,
  {{modelCapital}}_CREATE,
  {{modelCapital}}_DELETE,
  {{modelCapital}}_EDIT,
  {{modelCapital}}_ERROR,
  {{modelCapital}}_GET,
  {{modelCapital}}_LOADING,
} from "../type";

const {{modelName}}Action = new GeneralAction("{{modelURLPrefix}}", "{{modelName}}", {
  allConst: {{modelCapital}}_ALL,
  oneConst: {{modelCapital}}_GET,
  errorConst: {{modelCapital}}_ERROR,
  createConst: {{modelCapital}}_CREATE,
  updateConst: {{modelCapital}}_EDIT,
  deleteConst: {{modelCapital}}_DELETE,
  loadingConst: {{modelCapital}}_LOADING,
});

export const getAll{{modelName}} = (query) => {{modelName}}Action.getAllData(query);
export const getOne{{modelName}} = (id) => {{modelName}}Action.getOneData(id);
export const createOne{{modelName}} = (data) => {{modelName}}Action.createOne(data);
export const updateOne{{modelName}} = (id, payload) => {{modelName}}Action.editOne(id, payload);
export const deleteOne{{modelName}} = (id) => {{modelName}}Action.deleteOne(id);

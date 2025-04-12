import GeneralAction from "../class/GeneralAction";
import {
  CUSTOMER_ALL,
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  CUSTOMER_ERROR,
  CUSTOMER_GET,
  CUSTOMER_LOADING,
} from "../type";

const CustomerAction = new GeneralAction("customer", "Customer", {
  allConst: CUSTOMER_ALL,
  oneConst: CUSTOMER_GET,
  errorConst: CUSTOMER_ERROR,
  createConst: CUSTOMER_CREATE,
  updateConst: CUSTOMER_EDIT,
  deleteConst: CUSTOMER_DELETE,
  loadingConst: CUSTOMER_LOADING,
});

export const getAllCustomer = (query) => CustomerAction.getAllData(query);
export const getOneCustomer = (id) => CustomerAction.getOneData(id);
export const createOneCustomer = (data) => CustomerAction.createOne(data);
export const updateOneCustomer = (id, payload) => CustomerAction.editOne(id, payload);
export const deleteOneCustomer = (id) => CustomerAction.deleteOne(id);

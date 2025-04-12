import {
  CUSTOMER_ALL,
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  CUSTOMER_ERROR,
  CUSTOMER_GET,
  CUSTOMER_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: CUSTOMER_ALL,
  getConst: CUSTOMER_GET,
  postConst: CUSTOMER_CREATE,
  putConst: CUSTOMER_EDIT,
  deleteConst: CUSTOMER_DELETE,
  errorConst: CUSTOMER_ERROR,
  loadingConst: CUSTOMER_LOADING,
});

const CustomerReducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default CustomerReducer;

import {
  GOODS_TYPE_ALL,
  GOODS_TYPE_CREATE,
  GOODS_TYPE_DELETE,
  GOODS_TYPE_EDIT,
  GOODS_TYPE_ERROR,
  GOODS_TYPE_GET,
  GOODS_TYPE_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: GOODS_TYPE_ALL,
  getConst: GOODS_TYPE_GET,
  postConst: GOODS_TYPE_CREATE,
  putConst: GOODS_TYPE_EDIT,
  deleteConst: GOODS_TYPE_DELETE,
  errorConst: GOODS_TYPE_ERROR,
  loadingConst: GOODS_TYPE_LOADING,
});

const GoodsTypeReducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default GoodsTypeReducer;

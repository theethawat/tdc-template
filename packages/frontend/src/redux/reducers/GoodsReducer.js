import {
  GOODS_ALL,
  GOODS_CREATE,
  GOODS_DELETE,
  GOODS_EDIT,
  GOODS_ERROR,
  GOODS_GET,
  GOODS_LOADING,
} from "../type";

const initialState = { isReady: false };
import { GeneralReducer } from "../class";

const basedReducerObject = new GeneralReducer({
  allConst: GOODS_ALL,
  getConst: GOODS_GET,
  postConst: GOODS_CREATE,
  putConst: GOODS_EDIT,
  deleteConst: GOODS_DELETE,
  errorConst: GOODS_ERROR,
  loadingConst: GOODS_LOADING,
});

const GoodsReducer = (state = initialState, action) =>
  basedReducerObject.getReducer(state, action);

export default GoodsReducer;

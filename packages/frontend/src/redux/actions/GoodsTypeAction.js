import GeneralAction from "../class/GeneralAction";
import {
  GOODS_TYPE_ALL,
  GOODS_TYPE_CREATE,
  GOODS_TYPE_DELETE,
  GOODS_TYPE_EDIT,
  GOODS_TYPE_ERROR,
  GOODS_TYPE_GET,
  GOODS_TYPE_LOADING,
} from "../type";

const GoodsTypeAction = new GeneralAction("goods-type", "GoodsType", {
  allConst: GOODS_TYPE_ALL,
  oneConst: GOODS_TYPE_GET,
  errorConst: GOODS_TYPE_ERROR,
  createConst: GOODS_TYPE_CREATE,
  updateConst: GOODS_TYPE_EDIT,
  deleteConst: GOODS_TYPE_DELETE,
  loadingConst: GOODS_TYPE_LOADING,
});

export const getAllGoodsType = (query) => GoodsTypeAction.getAllData(query);
export const getOneGoodsType = (id) => GoodsTypeAction.getOneData(id);
export const createOneGoodsType = (data) => GoodsTypeAction.createOne(data);
export const updateOneGoodsType = (id, payload) => GoodsTypeAction.editOne(id, payload);
export const deleteOneGoodsType = (id) => GoodsTypeAction.deleteOne(id);

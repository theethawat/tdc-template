import GeneralAction from "../class/GeneralAction";
import {
  GOODS_ALL,
  GOODS_CREATE,
  GOODS_DELETE,
  GOODS_EDIT,
  GOODS_ERROR,
  GOODS_GET,
  GOODS_LOADING,
} from "../type";

const GoodsAction = new GeneralAction("goods", "Goods", {
  allConst: GOODS_ALL,
  oneConst: GOODS_GET,
  errorConst: GOODS_ERROR,
  createConst: GOODS_CREATE,
  updateConst: GOODS_EDIT,
  deleteConst: GOODS_DELETE,
  loadingConst: GOODS_LOADING,
});

export const getAllGoods = (query) => GoodsAction.getAllData(query);
export const getOneGoods = (id) => GoodsAction.getOneData(id);
export const createOneGoods = (data) => GoodsAction.createOne(data);
export const updateOneGoods = (id, payload) => GoodsAction.editOne(id, payload);
export const deleteOneGoods = (id) => GoodsAction.deleteOne(id);

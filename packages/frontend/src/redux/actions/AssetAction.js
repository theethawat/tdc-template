import GeneralAction from "./GeneralAction";
import {
  ASSET_ALL,
  ASSET_CREATE,
  ASSET_DELETE,
  ASSET_EDIT,
  ASSET_ERROR,
  ASSET_GET,
} from "../type";

const AssetAction = new GeneralAction("asset", "Asset", {
  allConst: ASSET_ALL,
  oneConst: ASSET_GET,
  errorConst: ASSET_ERROR,
  createConst: ASSET_CREATE,
  updateConst: ASSET_EDIT,
  deleteConst: ASSET_DELETE,
});

export const getAllAsset = (query) => AssetAction.getAllData(query);
export const getOneAsset = (id) => AssetAction.getOneData(id);
export const createOneAsset = (data) => AssetAction.createOne(data);
export const updateOneAsset = (id, payload) => AssetAction.editOne(id, payload);
export const deleteOneAsset = (id) => AssetAction.deleteOne(id);

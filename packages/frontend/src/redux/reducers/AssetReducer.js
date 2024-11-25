import {
  ASSET_ALL,
  ASSET_CREATE,
  ASSET_DELETE,
  ASSET_EDIT,
  ASSET_ERROR,
  ASSET_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function AssetReducer(state = initialState, action) {
  switch (action.type) {
    case ASSET_ALL:
      return { ...action.payload, isReady: true };
    case ASSET_GET:
      return { ...action.payload, isReady: true };
    case ASSET_CREATE:
      return { ...action.payload, isReady: false };
    case ASSET_ERROR:
      return { ...action.payload, isReady: false };
    case ASSET_EDIT:
      return { isReady: false };
    case ASSET_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

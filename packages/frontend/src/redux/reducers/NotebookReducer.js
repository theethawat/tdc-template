import {
  NOTEBOOK_ALL,
  NOTEBOOK_CREATE,
  NOTEBOOK_DELETE,
  NOTEBOOK_EDIT,
  NOTEBOOK_ERROR,
  NOTEBOOK_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function NotebookReducer(state = initialState, action) {
  switch (action.type) {
    case NOTEBOOK_ALL:
      return { ...action.payload, isReady: true };
    case NOTEBOOK_GET:
      return { ...action.payload, isReady: true };
    case NOTEBOOK_CREATE:
      return { ...action.payload, isReady: false };
    case NOTEBOOK_ERROR:
      return { ...action.payload, isReady: false };
    case NOTEBOOK_EDIT:
      return { isReady: false };
    case NOTEBOOK_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

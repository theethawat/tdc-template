import {
  PROJECT_ALL,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_EDIT,
  PROJECT_ERROR,
  PROJECT_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function ProjectReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_ALL:
      return { ...action.payload, isReady: true };
    case PROJECT_GET:
      return { ...action.payload, isReady: true };
    case PROJECT_CREATE:
      return { ...action.payload, isReady: false };
    case PROJECT_ERROR:
      return { ...action.payload, isReady: false };
    case PROJECT_EDIT:
      return { isReady: false };
    case PROJECT_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

import {
  USER_ALL,
  USER_CREATE,
  USER_DELETE,
  USER_EDIT,
  USER_ERROR,
  USER_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ALL:
      return { ...action.payload, isReady: true };
    case USER_GET:
      return { ...action.payload, isReady: true };
    case USER_CREATE:
      return { ...action.payload, isReady: false };
    case USER_ERROR:
      return { ...action.payload, isReady: false };
    case USER_EDIT:
      return { isReady: false };
    case USER_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

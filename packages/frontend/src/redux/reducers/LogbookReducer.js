import {
  LOGBOOK_ALL,
  LOGBOOK_CREATE,
  LOGBOOK_DELETE,
  LOGBOOK_EDIT,
  LOGBOOK_ERROR,
  LOGBOOK_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function LogbookReducer(state = initialState, action) {
  switch (action.type) {
    case LOGBOOK_ALL:
      return { ...action.payload, isReady: true };
    case LOGBOOK_GET:
      return { ...action.payload, isReady: true };
    case LOGBOOK_CREATE:
      return { ...action.payload, isReady: false };
    case LOGBOOK_ERROR:
      return { ...action.payload, isReady: false };
    case LOGBOOK_EDIT:
      return { isReady: false };
    case LOGBOOK_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

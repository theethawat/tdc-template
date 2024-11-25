import {
  TIMELINE_ALL,
  TIMELINE_CREATE,
  TIMELINE_DELETE,
  TIMELINE_EDIT,
  TIMELINE_ERROR,
  TIMELINE_GET,
} from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function TimelineReducer(state = initialState, action) {
  switch (action.type) {
    case TIMELINE_ALL:
      return { ...action.payload, isReady: true };
    case TIMELINE_GET:
      return { ...action.payload, isReady: true };
    case TIMELINE_CREATE:
      return { ...action.payload, isReady: false };
    case TIMELINE_ERROR:
      return { ...action.payload, isReady: false };
    case TIMELINE_EDIT:
      return { isReady: false };
    case TIMELINE_DELETE:
      return { isReady: false };

    default:
      return state;
  }
}

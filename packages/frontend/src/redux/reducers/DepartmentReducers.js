import { DEPARTMENT_ALL, DEPARTMENT_ERROR, DEPARTMENT_LOADING } from "../type";

const initialState = { isReady: false };

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line default-param-last
export default function DepartmentReducers(state = initialState, action) {
  switch (action.type) {
    case DEPARTMENT_ALL:
      return { ...action.payload, isReady: true };
    case DEPARTMENT_ERROR:
      return { ...action.payload, isReady: false };
    case DEPARTMENT_LOADING:
      return { isReady: false };
    default:
      return state;
  }
}

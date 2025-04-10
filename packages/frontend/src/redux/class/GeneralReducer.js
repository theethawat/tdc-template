const initialState = {
  isReady: false,
};

export default class GeneralReducer {
  constructor({
    allConst,
    getConst,
    postConst,
    putConst,
    deleteConst,
    errorConst,
    loadingConst,
  }) {
    this.allConst = allConst;
    this.getConst = getConst;
    this.postConst = postConst;
    this.putConst = putConst;
    this.deleteConst = deleteConst;
    this.errorConst = errorConst;
    this.loadingConst = loadingConst;
  }

  getReducer(state = initialState, action) {
    switch (action.type) {
      case this.allConst:
        return {
          ...action.payload,
          isReady: true,
        };
      case this.getConst:
        return {
          ...action.payload,
          isReady: true,
        };
      case this.postConst:
        return { isReady: false };
      case this.putConst:
        return { isReady: false };
      case this.deleteConst:
        return { isReady: false };
      case this.loadingConst:
        return { isReady: false };
      case this.errorConst:
        return { isReady: false, isError: true, message: action.payload };
      default:
        return state;
    }
  }
}

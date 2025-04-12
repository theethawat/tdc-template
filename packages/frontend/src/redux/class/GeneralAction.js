import api from "../../configs/api";

class GeneralAction {
  // prettier-ignore
  constructor(subURL, name, {
    allConst, oneConst, errorConst, createConst, updateConst, deleteConst,loadingConst
  }) {
    this.subURL = subURL
    this.allConst = allConst
    this.oneConst = oneConst
    this.errorConst = errorConst
    this.createConst = createConst
    this.updateConst = updateConst
    this.deleteConst = deleteConst
    this.loadingConst = loadingConst
    this.name = name
  }

  getAllData({ page = 1, size = 10, name = "", ...query }) {
    return async (dispatch) => {
      try {
        const queryParams = new URLSearchParams({ page, size, name, ...query });
        dispatch({
          type: this.loadingConst,
        });
        const { data, status } = await api.get(
          `${import.meta.env.VITE_API_URL}/${
            this.subURL
          }?${queryParams.toString()}`
        );

        if (status === 200 && data) {
          dispatch({
            type: this.allConst,
            payload: { ...data, isReady: true },
          });
        } else {
          dispatch({
            type: this.errorConst,
            payload: { error: `Get ${this.name} Error` },
          });
        }
      } catch (error) {
        dispatch({ type: this.errorConst, payload: { error: error?.message } });
      }
    };
  }

  getOneData(id) {
    return async (dispatch) => {
      try {
        dispatch({
          type: this.loadingConst,
          payload: { isReady: false },
        });
        const { data, status } = await api.get(
          `${import.meta.env.VITE_API_URL}/${this.subURL}/${id}`
        );

        if (status === 200 && data) {
          dispatch({
            type: this.oneConst,
            payload: { ...data, isReady: true },
          });
        } else {
          dispatch({
            type: this.errorConst,
            payload: { error: `Get ${this.name} Error` },
          });
        }
      } catch (error) {
        dispatch({ type: this.errorConst, payload: { error: error?.message } });
      }
    };
  }

  createOne(payload) {
    return async (dispatch) => {
      try {
        const { data, status } = await api.post(
          `${import.meta.env.VITE_API_URL}/${this.subURL}`,
          payload
        );

        if (status === 201 && data) {
          dispatch({
            type: this.createConst,
            payload: { ...data, isReady: false, isCreate: true },
          });
        } else {
          dispatch({
            type: this.errorConst,
            payload: { error: `Create ${this.name} Error` },
          });
        }
      } catch (error) {
        console.log("error", error?.response?.data);
        dispatch({ type: this.errorConst, payload: { error: error?.message } });
        throw Error(error?.response?.data?.error?.message);
      }
    };
  }

  editOne(id, payload) {
    return async (dispatch) => {
      try {
        const { data, status } = await api.put(
          `${import.meta.env.VITE_API_URL}/${this.subURL}/${id}`,
          payload
        );

        if (status === 200 && data) {
          dispatch({
            type: this.updateConst,
            payload: { ...data, isReady: false },
          });
        } else {
          dispatch({
            type: this.errorConst,
            payload: { error: `Edit ${this.name} Error` },
          });
        }
      } catch (error) {
        dispatch({ type: this.errorConst, payload: { error: error?.message } });
        throw Error(error?.response?.data?.error?.message);
      }
    };
  }

  deleteOne(id) {
    return async (dispatch) => {
      try {
        const { data, status } = await api.delete(
          `${import.meta.env.VITE_API_URL}/${this.subURL}/${id}`
        );

        if (status === 204 && data) {
          dispatch({
            type: this.deleteConst,
            payload: { ...data, isReady: false },
          });
        } else {
          dispatch({
            type: this.errorConst,
            payload: { error: `Delete ${this.name} Error` },
          });
        }
      } catch (error) {
        dispatch({ type: this.errorConst, payload: { error: error?.message } });
      }
    };
  }
}

export default GeneralAction;

import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";

export const setAlert = (msg) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      id: uuid(),
    },
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: []
      }),
    10000
  );
};

import { LOGIN_USER, REGISTER_USER, LOAD_USER, AUTH_ERROR, LOGOUT, CLEAR_TASKS } from "./types";
import axios from "axios";
import setAuthToken from "../auth/setAuthToken";
import { setAlert } from "./alert";

export const loginUser = (email, password) => async (dispatch) => {
  const user = {
    email: email,
    password: password,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    dispatch(loadUser());

  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });

    error.response.data.errors.forEach(e => {
        dispatch(setAlert(e.msg));
    });
  }
};

export const registerUser = (username, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });

    error.response.data.errors.forEach(e => {
        dispatch(setAlert(e.msg));
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });

  dispatch({
    type: CLEAR_TASKS
  });
}

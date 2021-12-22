import axios from "axios";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionTypes";

export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const signupSuccess = (user) => {
  console.log("User", user);
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signupFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const signup =
  ({
    userName,
    password,
    confirm_password,
    email,
    phone,
    firstName,
    lastName,
    displayname,
    avatarURL,
    description,
  }) =>
  (dispatch) => {
    dispatch(signupRequest);
    console.log("in SignUp action");
    console.log("http://localhost:8080/users");
    return confirm_password === password
      ? axios
          .post("http://localhost:8080/users", {
            userName,
            password,
            confirm_password,
            email,
            phone,
            firstName,
            lastName,
            displayname,
            avatarURL,
            description,
          })
          .then((response) => {
            let user = response.data;
            delete user["password"];
            delete user["confirm_password"];
            user.subscribed = false;
            dispatch(signupSuccess(user));
          })
          .catch((error) => {
            dispatch(signupFailure(error.message));
          })
      : dispatch(signupFailure("ERROR: Both passwords don't match."));
  };

export const login = (username, password) => (dispatch) => {
  dispatch(loginRequest);
  return axios
    .post("http://localhost:8080/userLogin", { username, password })
    .then((response) => {
      dispatch(loginSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loginFailure(error.message));
    });
};

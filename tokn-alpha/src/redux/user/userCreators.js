import axios from "axios";
// import dotenv from "dotenv";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./userActions";

require("dotenv").config();

let axiosConfig = {
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL + "/",
};

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
  ({ username, password, confirm_password, email, walletAddress }) =>
  (dispatch) => {
    dispatch(signupRequest());
    console.log("in SignUp action");

    return confirm_password === password
      ? axios
          .post(
            process.env.REACT_APP_API_URL + "/newUser",
            {
              username,
              password,
              email,
              walletAddress,
            },
            axiosConfig
          )
          .then((response) => {
            console.log(response);
            dispatch(signupSuccess({ username, email }));
            window.location = "/buy-now";
          })
          .catch((error) => {
            dispatch(signupFailure(error.response.data.message));
            alert(error.response.data.message);
          })
      : dispatch(signupFailure("ERROR: Both passwords don't match."));
  };

export const login =
  ({ detail, password, walletAddress }) =>
  async (dispatch) => {
    dispatch(loginRequest());
    // console.log("email", email);
    try {
      await axios
        .post(
          process.env.REACT_APP_API_URL + "/login",
          { detail, password, walletAddress },
          axiosConfig
        )
        .then((response) => {
          let user = {
            username: response.data.username,
            email: response.data.email,
          };
          console.log("response", response);
          dispatch(loginSuccess(user));
          // document.cookie = response.headers

          window.location = "/buy-now";
        })
        .catch((error) => {
          dispatch(loginFailure(error.response.data.message));
          console.log(error.response.data);
          alert(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const loginWithJWT = (address) => async (dispatch) => {
  axios
    .post(
      process.env.REACT_APP_API_URL + "/cookie-check",
      { address: address },
      axiosConfig
    )
    .then((response) => {
      dispatch(
        loginSuccess({
          userName: response.data.username,
          email: response.data.email,
        })
      );
      window.location = "/buy-now";
      console.log(response);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

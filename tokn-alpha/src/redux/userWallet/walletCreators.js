import axios from "axios";
import contract from "../../contract";

import {
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
} from "./actionTypes";
import {
  UPDATE_BALANCE_FAILURE,
  UPDATE_BALANCE_REQUEST,
  UPDATE_BALANCE_SUCCESS,
} from "./walletActions";

export const connectWalletRequest = () => {
  return {
    type: CONNECT_WALLET_REQUEST,
  };
};

export const connectWalletSuccess = (address) => {
  console.log("in actions", address);
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: address,
  };
};

export const connectWalletFailure = (error) => {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: error,
  };
};

export const updateBalanceRequest = () => {
  return {
    type: UPDATE_BALANCE_REQUEST,
  };
};

export const updateBalanceSuccess = (balance) => {
  return {
    type: UPDATE_BALANCE_SUCCESS,
    payload: balance,
  };
};

export const updateBalanceFailure = (error) => {
  return {
    type: UPDATE_BALANCE_FAILURE,
    payload: error,
  };
};

export const createWallet = (web3, user_ID) => (dispatch) => {
  dispatch(connectWalletRequest);
  console.log("connecting wallet");
  return web3.eth
    .requestAccounts()
    .then((res) => {
      console.log(res[0]);
      axios
        .post("http://localhost:8080/userWallet", {
          user_ID,
          walletAddress: res[0],
        })
        .then((response) => {
          console.log(response.data);
          dispatch(connectWalletSuccess(res[0]));
        })
        .catch((error) => {
          dispatch(connectWalletFailure(error.message));
        });
    })
    .catch((error) => {
      dispatch(connectWalletFailure(error.message));
    });
};

export const connectWallet = (web3, user_ID) => (dispatch) => {
  dispatch(connectWalletRequest);
  console.log("connecting wallet");
  return web3.eth
    .requestAccounts()
    .then((res) => {
      console.log(res[0]);
      axios
        .post("http://localhost:8080/checkUserWallet", {
          user_ID,
          walletAddress: res[0],
        })
        .then((response) => {
          console.log(response.data);
          dispatch(connectWalletSuccess(res[0]));
        })
        .catch((error) => {
          dispatch(connectWalletFailure(error.message));
        });
    })
    .catch((error) => {
      dispatch(connectWalletFailure(error.message));
    });
};

export const updateBalance = (address, id) => async (dispatch) => {
  dispatch(updateBalanceRequest);
  console.log("Updating Balance...");
  try {
    const balance = await contract.methods.balanceOf(address, id).call();
    return dispatch(updateBalanceSuccess(balance));
  } catch (error) {
    return dispatch(updateBalanceFailure(error.message));
  }
};

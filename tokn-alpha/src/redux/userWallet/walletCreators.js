import axios from "axios";
import factory from "../../FactoryContract";
import contract from "../../ToknContract";
import Web3 from "web3";
// import dotenv from "dotenv";

import {
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  UPDATE_BALANCE_FAILURE,
  UPDATE_BALANCE_REQUEST,
  UPDATE_BALANCE_SUCCESS,
  DISCONNECT_WALLET_FAILURE,
  DISCONNECT_WALLET_REQUEST,
  DISCONNECT_WALLET_SUCCESS,
} from "./walletActions";

require("dotenv").config();
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

export const disconnectWalletRequest = () => {
  return {
    type: DISCONNECT_WALLET_REQUEST,
  };
};

export const disconnectWalletSuccess = () => {
  return {
    type: DISCONNECT_WALLET_SUCCESS,
  };
};

export const disconnectWalletFailure = (error) => {
  return {
    type: DISCONNECT_WALLET_FAILURE,
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

export const connectWallet = (web3) => (dispatch) => {
  dispatch(connectWalletRequest());
  console.log("connecting wallet");
  return web3.eth
    .requestAccounts()
    .then(async (res) => {
      await window.ethereum.enable();
      console.log(res[0]);
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Matic Mainnet",
                  rpcUrls: ["https://polygon-rpc.com/"] /* ... */,
                },
              ],
            });
          } catch (addError) {
            alert("Please switch to polygon network.");
          }
        }
        // handle other "switch" errors
      }
      axios
        .post(process.env.REACT_APP_API_URL + "/check-whitelist", {
          address: res[0],
        })
        .then((response) => {
          console.log(response.data);
          dispatch(connectWalletSuccess(res[0]));
        })
        .catch((error) => {
          dispatch(connectWalletFailure(error.message));
          console.log(error);
          alert("wallet not whitelisted");
        });

      // window.location = "/create-account";
    })
    .catch((error) => {
      console.log(error.message);
      alert("Error: Please ensure metamask is installed.");
      dispatch(
        connectWalletFailure("Error: Please ensure metamask is installed.")
      );
    });
};

export const disconnectWallet = (web3) => (dispatch) => {
  dispatch(disconnectWalletRequest());
  console.log("disconnecting wallet");
  try {
    console.log("wallet disconnected");
    return dispatch(disconnectWalletSuccess());
  } catch (err) {
    console.log(err);
    alert("Something went wrong! Try again.");
    return dispatch(disconnectWalletFailure);
  }

  // return web3
  //   .close()
  //   .then((res) => {
  //     dispatch(disconnectWalletSuccess());
  //     console.log("wallet disconnected");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch(disconnectWalletFailure);
  //     alert("Something went wrong! Try again.");
  //   });
};

// export const connectWallet = (web3, user_ID) => (dispatch) => {
//   dispatch(connectWalletRequest);
//   console.log("connecting wallet");
//   return web3.eth
//     .requestAccounts()
//     .then((res) => {
//       console.log(res[0]);
//       axios
//         .post("http://localhost:8080/checkUserWallet", {
//           user_ID,
//           walletAddress: res[0],
//         })
//         .then((response) => {
//           console.log(response.data);
//           dispatch(connectWalletSuccess(res[0]));
//         })
//         .catch((error) => {
//           dispatch(connectWalletFailure(error.message));
//         });
//     })
//     .catch((error) => {
//       dispatch(connectWalletFailure(error.message));
//     });
// };

export const updateBalance = (address, id) => async (dispatch) => {
  dispatch(updateBalanceRequest());
  console.log("Updating Balance...");

  try {
    const balance = await contract.methods
      .getBookedToknsFor(address, id)
      .call();
    return dispatch(updateBalanceSuccess(balance));
  } catch (error) {
    alert(
      "Something went wrong. Please check if you are logged in with correct metamask network and account and try reloading."
    );
    return dispatch(updateBalanceFailure(error.message));
  }
};

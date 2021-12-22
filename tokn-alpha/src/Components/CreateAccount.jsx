import { Link } from "react-router-dom";
import metamask from './metamask.png';
import { useSelector, useDispatch } from "react-redux";
import '../App.css';
import web3 from "../web3"
import {createWallet, signup} from "../redux"
import { useEffect, useState } from "react";

function CreateAccount() {

const dispatch = useDispatch() 
const address = useSelector((state) => state.wallet.address)

let data = {
  userName: "",
    password: "",
    confirm_password:"",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    displayname: "",
    avatarURL: "",
    description: ""
}



const handleClick = (event) => {
  event.preventDefault();
  dispatch(signup(data));
  alert("Signed Up Successfully!")
  window.location = "http://localhost:3000/buy-now"
}




  return (
    <div className="App">
        <div className="white-container">
            <h4 className="create">Create an Account</h4>
            <p className="login-label">Username</p>
            <input type="text"  name="" placeholder="Toknmusic" onChange={(event) => {data.userName = event.target.value}}/>
            <p className="login-label">Email</p>
            <input type="text" name="" onChange={(event) => {data.email = event.target.value}} placeholder="email@email.com" />
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" onChange={(event) => {data.password = event.target.value}}/>
            <p className="login-label">Confirm Password</p>
            <input type="password" name="" placeholder="Confirm Password" onChange={(event) => {data.confirm_password = event.target.value}}/>
            <br />
            
            <button onClick={handleClick}>Register</button>
            {/* <div className="metamask-div">
                <img src={metamask} className="metamask" alt="metamask" />
            </div> */}
            {address ? <p>{address}</p>: <button onClick={() => dispatch(createWallet(web3))}>Connect Metamask Wallet</button>}
            
            
        </div>
    </div>
  );
}

export default CreateAccount;

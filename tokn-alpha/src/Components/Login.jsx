import { Link } from "react-router-dom";
import metamask from './metamask.png';
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithJWT } from "../redux";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const address = useSelector((state) => state.wallet.address)
  const {error, loggedIn} = useSelector((state) => state.user)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  
function readCookie(cname) {
    var name = cname + "=";
    var decoded_cookie = decodeURIComponent(document.cookie);
    var carr = decoded_cookie.split(';');
    for(var i=0; i<carr.length;i++){
    var c = carr[i];
    while(c.charAt(0)===' '){
        c=c.substring(1);
    }
    if(c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
    }
     }
     return "";
}
   useEffect(() => {
     if(loggedIn){
      
      window.location = "/buy-now"
    }
     let token = readCookie("jwt");
    console.log(document.cookie);
    if(token){
      console.log("true");
      dispatch(loginWithJWT(token, address))
    }
    
  }, [])

 
  const userLogin = async (event) => {
    event.preventDefault()
    if(!address){
      alert("Connect wallet first!");
      window.location = "/metamask-login"
    }
    else{
      let user = {
      email,
      password,
      walletAddress: address
    }
    dispatch(login(user))
    }
    
    
    
  }
  
  return (
    <div className="App">
        <div className="white-container wcLogin">
            <h4 className="create">Login</h4>
            <p className="login-label">Username or Email</p>
            <input type="text" name="" placeholder="email@email.com" onChange={(event) => {setEmail(event.target.value)}}/>
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}/>
            <br />
            <br />
            
              <button type="button" name="button" class="btn-primary confirm login-btn" onClick={userLogin}>
                Login
              </button>
            
        </div>
    </div>
  );
}

export default Login;

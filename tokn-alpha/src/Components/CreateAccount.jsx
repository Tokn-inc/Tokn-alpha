import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import metamask from './metamask.png';
import tick from './tick.png';
import { signup, loginWithJWT } from "../redux";
import '../App.css';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function CreateAccount() {

  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true)
  const [match, setMatch] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_password] = useState("")
  const [username, setUsername] = useState("")
  const [terms, setTerms] = useState(false);
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);
  const [term4, setTerm4] = useState(false);

  var upperCaseLetters = /[A-Z]/g;
  var lowerCaseLetters = /[a-z]/g;
  var numbers = /[0-9]/g;
  var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
  var invalidChars = "<>/";
  const dispatch = useDispatch();
  const {address, balance} = useSelector((state) => state.wallet)
  const {error, loggedIn} = useSelector((state) => state.user)
  

 useEffect(() => {
  if(!address){
    // alert("Connect wallet first!")
    window.location = '/metamask-login'
  } 
  if(loggedIn){

      window.location = "/buy-now"

    }
   
      dispatch(loginWithJWT(address))
      console.log(email);
      // if(password){

      // }
    //   if(term1 && term2 && term3 && term4){
    //   console.log("here 2");
    //   setValidPass(true)
    // }else{
    //   setValidPass(false)
    // }
    
  }, [])

  const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  // const validatePassword = (password) => {
  //   return String(password).match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  // }

  const handleEmailChange = (value) => {
    if(validateEmail(value)){
      setEmail(value) 
      setValidEmail(true)
    }else{
      setValidEmail(false)
    }
  }

  const handlePasswordChange = (value) => {
    setTerms(true);
    console.log("Here")
    
    if(value.length >= 6 ) {
      setTerm1(true);
    }else{
      setTerm1(false)
    }

    if(value.match(upperCaseLetters)) {
      setTerm2(true);
    }else{
      setTerm2(false)
    }

    if(value.match(lowerCaseLetters)) {
      setTerm3(true);
    }else{
      setTerm3(false)
    }

    if(value.match(numbers)) {
      setTerm4(true);
    }else{
      setTerm4(false)
    }

    if(value === "") {
      setTerms(false);
    }
    setPassword(value)
  
    if(value.length >= 6 && value.match(upperCaseLetters) && value.match(lowerCaseLetters) && value.match(numbers)){
      console.log("here 2");
      setValidPass(true)
    }else{
      setValidPass(false)
    }
    // if(validatePassword(event.target.value)){
    //    setPassword(event.target.value) 
    //   setValidPass(true)
    // }else{
    //   setPassword(event.target.value) 
    //   setValidPass(false)
    // }
    
  }

  const matchPasswords = (value) => {
   
    if(password === value){
      setConfirm_password(value) 
 
      setMatch(true)
    }else{
    
      
      setMatch(false)
    }
  }

  const register = (event) => {
    event.preventDefault()
    if(!address){
      alert("Connect wallet first.");
      window.location = "/metamask"
    }else{
      for (var i = 0; i < username.length; i++) {
    if (iChars.indexOf(username.charAt(i)) != -1) {
        alert ("Your username has special characters. \nThese are not allowed.\nPlease remove them and try again.");
      
    }
  }
    for (var i = 0; i < email.length; i++) {
    if (invalidChars.indexOf(email.charAt(i)) != -1) {
        alert ("Your email has invalid characters. \n<,/,> are not allowed.\n Please remove them and try again.");
      
    }
}
  for (var i = 0; i < password.length; i++) {
    if (invalidChars.indexOf(password.charAt(i)) != -1) {
        alert ("Your password has invalid characters. \n<,/,> are not allowed.\n Please remove them and try again.");
      
    }
}
      console.log(validEmail, " ", validPass, " ", match);
       if(validEmail && validPass && match){
      
      let user = {
        username,
        email,
        password,
        confirm_password,
        walletAddress: address
      }
      dispatch(signup(user))
      // window.location = "/buy-now"
      
    
    }else{
      alert("Please fill all the fields properly.")
    }
    }
    
    
   
    
  }

  
  return (
    <div className="App">
        <div className="white-container">
            <h4 className="create">Create an Account</h4>
            <p className="login-label">Username</p>
            <input className="pwd-input" type="text" name="" placeholder="Toknmusic" onChange={(event) => {setUsername(event.target.value) }}/>
            <p className="login-label">Email</p>
            <input type="text" name="" placeholder="email@email.com" onChange={(event) => handleEmailChange(event.target.value)}/>
            {validEmail ? null: <p className="valid-email-pass">Please enter a valid email</p>}
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" onChange={(event)=> handlePasswordChange(event.target.value)}/>
            {terms && <div className="pswd-terms">
              {!term1 && <p className="pswd-red">Must contain at least 6 characters</p>}
              {term1 && <p className="pswd-green">Must contain at least 6 characters</p>}
              {!term2 && <p className="pswd-red">Must contain an uppercase alphabet</p>}
              {term2 && <p className="pswd-green">Must contain an uppercase alphabet</p>}
              {!term3 && <p className="pswd-red">Must contain a lowercase alphabet</p>}
              {term3 && <p className="pswd-green">Must contain a lowercase alphabet</p>}
              {!term4 && <p className="pswd-red">Must contain a number</p>}
              {term4 && <p className="pswd-green">Must contain a number</p>}
            </div>}
            <p className="login-label">Confirm Password</p>
            <input type="password" name="" placeholder="Confirm Password" onChange={(event) => matchPasswords(event.target.value)}/>
            {match ? null: <p className="valid-email-pass">Passwords do not match</p>}
            <br />
            <br />
            <button type="button" name="button" class="btn-primary confirm" onClick={register}>
                Confirm
            </button>
           <Link to='/login'><p className="sign-in">Already have an account? Sign in</p></Link>
        </div>
    </div>
    
  );
}

export default CreateAccount;

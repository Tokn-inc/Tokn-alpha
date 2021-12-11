import { Link } from "react-router-dom";
import metamask from './metamask.png';
import '../App.css';

function CreateAccount() {
  return (
    <div className="App">
        <div className="white-container">
            <h4 className="create">Create an Account</h4>
            <p className="login-label">Username</p>
            <input type="text" name="" placeholder="Toknmusic" />
            <p className="login-label">Email</p>
            <input type="text" name="" placeholder="email@email.com" />
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" />
            <p className="login-label">Confirm Password</p>
            <input type="password" name="" placeholder="Confirm Password" />
            <div className="metamask-div">
                <img src={metamask} className="metamask" alt="metamask" />
            </div>
            <Link to="buy-now" className="connect">Connect Metamask Wallet</Link>
        </div>
    </div>
  );
}

export default CreateAccount;

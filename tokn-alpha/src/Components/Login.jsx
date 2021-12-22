import { Link } from "react-router-dom";
import metamask from './metamask.png';
import {connect} from "../redux"
import '../App.css';
import {useDispatch, useSelector} from "react-redux"
import web3 from "../web3";

function Login() {
  const dispatch = useDispatch()
  const address = useSelector((state) => state.wallet.address)
  return (
    <div className="App">
        <div className="white-container">
            <h4 className="create">Create an Account</h4>
            <p className="login-label">Email</p>
            <input type="text" name="" placeholder="email@email.com" />
            <p className="login-label">Password</p>
            <input className="pwd-input" type="password" name="" placeholder="Password" />
            <div className="metamask-div">
                <img src={metamask} className="metamask" alt="metamask" />
            </div>
            {address ? <p>{address}</p>: <button onClick={() => dispatch(connect(web3))}>Connect Metamask Wallet</button>}
        </div>
    </div>
  );
}

export default Login;

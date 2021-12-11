import React from "react";
import {Route, Switch } from "react-router-dom";
import background from './background.jpg';
import ComingSoon from "./Components/ComingSoon.jsx"
import Input from "./Components/Input.jsx"
import Login from "./Components/Login.jsx"
import CreateAccount from "./Components/CreateAccount.jsx"
import BuyNow from "./Components/BuyNow.jsx"
import Congrats from "./Components/Congrats.jsx"

function App() {
  return (
    <div className="App">
        <img src={background} className="background" alt="background" />
        <Switch>
          <Route path="/" exact component={() => <ComingSoon />} />
          <Route path="/input" exact component={() => <Input />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/create-account" exact component={() => <CreateAccount />} />
          <Route path="/buy-now" exact component={() => <BuyNow />} />
          <Route path="/congrats" exact component={() => <Congrats />} />
        </Switch>
    </div>
  );
}

export default App;

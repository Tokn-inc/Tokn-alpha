import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import background from "./background.jpg";
import ComingSoon from "./Components/ComingSoon.jsx";
import Input from "./Components/Input.jsx";
import Login from "./Components/Login.jsx";
import CreateAccount from "./Components/CreateAccount.jsx";
import BuyNow from "./Components/BuyNow.jsx";
import Congrats from "./Components/Congrats.jsx";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  window.onbeforeunload = function (e) {
    window.onunload = function () {
      window.localStorage.isMySessionActive = "false";
    };
    return undefined;
  };

  window.onload = function () {
    window.localStorage.isMySessionActive = "true";
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <img src={background} className="background" alt="background" />
          <Switch>
            <Route path="/" exact component={() => <ComingSoon />} />
            <Route path="/input" exact component={() => <Input />} />
            <Route path="/login" exact component={() => <Login />} />
            <Route
              path="/create-account"
              exact
              component={() => <CreateAccount />}
            />
            <Route path="/buy-now" exact component={() => <BuyNow />} />
            <Route path="/congrats" exact component={() => <Congrats />} />
          </Switch>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;

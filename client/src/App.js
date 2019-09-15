import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import { UserProvider } from "./Contexts/UserContext";
import AppNavBar from "./Components/AppNavBar";
import ProfilePage from "./Pages/Profile";
import HomePage from "./Pages/Home";

function App() {
  return (
    <UserProvider>
      <div>
        <Route component={AppNavBar} />
        <Switch>
          <Route path={"/"} exact component={HomePage} />
          <Route path={"/profile"} component={ProfilePage} />
        </Switch>
      </div>
    </UserProvider>
  );
}

export default App;

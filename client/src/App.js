import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { UserProvider } from "./Contexts/UserContext";
import { Container } from "reactstrap";
import AppNavBar from "./Components/AppNavBar";
import { AdsNavbar } from "./Components/Ads";

function App() {
  return (
    <UserProvider>
      <div>
        <AppNavBar />
        <Route component={AdsNavbar} />
        <Container>
          <h1>App Component</h1>
        </Container>
      </div>
    </UserProvider>
  );
}

export default App;

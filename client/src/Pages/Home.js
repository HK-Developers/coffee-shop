import React from "react";
import { Route } from "react-router-dom";
import { AdsNavbar } from "../Components/Ads";

const HomePage = () => {
  return (
    <div>
      <Route component={AdsNavbar} />
    </div>
  );
};

export default HomePage;

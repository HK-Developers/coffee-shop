import React from "react";
import { Route } from "react-router-dom";
import { AdsNavbar } from "../Components/Ads";
import HomeMenu from "../Components/HomeMenu";

const HomePage = () => {
  return (
    <div>
      <Route component={AdsNavbar} />
      <Route component={HomeMenu} />
    </div>
  );
};

export default HomePage;

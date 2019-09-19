import React, { useState, useEffect } from "react";
import Axios from "../Axios";
import jwt from "jwt-decode";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async token => {
      const decoded = jwt(token);
      await Axios.get(`/api/user/${decoded.username}`)
        .then(res => setUserData(res.data))
        .catch(err => console.log(err));
    };
    const checkLogin = () => {
      const token = localStorage.getItem("auth-token");
      if (token) {
        setIsLogin(true);
        getUserData(token);
      } else {
        setIsLogin(false);
        setUserData({});
      }
    };
    checkLogin();
  }, [isLogin]);
  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

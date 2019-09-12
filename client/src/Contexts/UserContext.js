import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider
      value={{ isLogin, setIsLogin, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

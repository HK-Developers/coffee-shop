import React, { useState, useContext } from "react";
import { NavLink as LinkNav, Route } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginModal from "./LoginModal";
import { UserContext } from "../Contexts/UserContext";
import RegisterModal from "./RegisterModal";

const AppNavBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [modal, setModal] = useState(false);

  const [registerModal, setRegisterModal] = useState(false);

  const { isLogin, setIsLogin } = useContext(UserContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleRegisterModal = () => {
    setRegisterModal(!registerModal);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const onLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem("auth-token");
    history.push("/");
  };
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="header-navbar">
        <LinkNav to={"/"} className="navbar-brand">
          Coffee Shop
        </LinkNav>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isLogin ? (
              <NavItem>
                <LinkNav to="/profile" className={"nav-link"}>
                  Profile
                </LinkNav>
              </NavItem>
            ) : (
              <div className="nav">
                <NavItem>
                  <LinkNav to="#" className={"nav-link"} onClick={toggleModal}>
                    Login
                  </LinkNav>
                </NavItem>
                <NavItem>
                  <LinkNav
                    to="#"
                    className={"nav-link"}
                    onClick={toggleRegisterModal}
                  >
                    Register
                  </LinkNav>
                </NavItem>
              </div>
            )}
            <NavItem>
              <NavLink
                target="_blank"
                href="https://github.com/HK-Developers/coffee-shop"
              >
                GitHub
              </NavLink>
            </NavItem>
            {isLogin ? (
              <NavItem>
                <LinkNav to="/" className={"nav-link"} onClick={onLogOut}>
                  Logout
                </LinkNav>
              </NavItem>
            ) : (
              ""
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Route
        render={props => (
          <LoginModal {...props} modal={modal} toggle={toggleModal} />
        )}
      />
      <Route
        render={props => (
          <RegisterModal
            {...props}
            modal={registerModal}
            toggle={toggleRegisterModal}
          />
        )}
      />
    </div>
  );
};

export default AppNavBar;

import React, { useState, useContext } from "react";
import { NavLink as LinkNav, Route } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginModal from "./LoginModal";
import { UserContext } from "../Contexts/UserContext";

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [modal, setModal] = useState(false);

  const { isLogin } = useContext(UserContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="header-navbar">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
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
              <NavItem>
                <LinkNav
                  to="/login"
                  className={"nav-link"}
                  onClick={toggleModal}
                >
                  Login
                </LinkNav>
              </NavItem>
            )}
            <NavItem>
              <NavLink href="https://github.com/HK-Developers/coffee-shop">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Route
        render={props => (
          <LoginModal {...props} modal={modal} toggle={toggleModal} />
        )}
      />
    </div>
  );
};

export default AppNavBar;

import React, { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import Axios from "../Axios";
import { UserContext } from "../Contexts/UserContext";

const LoginModal = ({ modal, toggle, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin } = useContext(UserContext);

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onLogin = e => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    Axios.post("/api/user/login", user)
      .then(res => {
        // console.log(res.data);
        setIsLogin(true);
        localStorage.setItem("auth-token", res.data.token);
        history.push("/");
        toggle();
      })
      .catch(err => {
        // console.log(err.response.data);
        setIsLogin(false);
        localStorage.removeItem("auth-token");
      });
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username...."
                value={username}
                onChange={onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password....."
                value={password}
                onChange={onChangePassword}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onLogin}>
            Login
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;

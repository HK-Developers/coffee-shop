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
  Alert,
} from "reactstrap";
import Axios from "../Axios";
import { UserContext } from "../Contexts/UserContext";

const LoginModal = ({ modal, toggle, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [mssg, setMssg] = useState("");

  const { setIsLogin } = useContext(UserContext);

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onDismiss = () => {
    setAlert(false);
  };

  const onLogin = e => {
    e.preventDefault();
    setAlert(false);
    const user = {
      username,
      password,
    };
    Axios.post("/api/user/login", user)
      .then(res => {
        const { success } = res.data;
        if (success) {
          setIsLogin(true);
          localStorage.setItem("auth-token", res.data.token);
          history.push("/");
          toggle();
        }
      })
      .catch(err => {
        const { success, message } = err.response.data;
        if (!success) {
          setAlert(true);
          setMssg(message);
          setIsLogin(false);
          localStorage.removeItem("auth-token");
        }
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
            <Alert
              className="my-0"
              color={"danger"}
              isOpen={alert}
              toggle={onDismiss}
            >
              {mssg}
            </Alert>
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

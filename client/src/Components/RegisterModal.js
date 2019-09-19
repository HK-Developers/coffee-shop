import React, { useState } from "react";
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

const RegisterModal = ({ modal, toggle, history }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState("success");
  const [mssg, setMssg] = useState("");

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangeFullname = e => {
    setFullname(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const clrInput = () => {
    setUsername("");
    setEmail("");
    setFullname("");
    setPassword("");
  };

  const onDismiss = () => {
    setAlert(false);
  };

  const onRegister = e => {
    e.preventDefault();
    const newUser = {
      username,
      password,
      email,
      fullname,
    };
    Axios.post("/api/user/register", newUser)
      .then(res => {
        if (res.data.success) {
          setAlert(true);
          clrInput();
          setMssg(res.data.message);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        if (!err.response.data.success) {
          setColor("danger");
          setMssg(err.response.data.message);
          setAlert(true);
        }
      });
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email...."
                value={email}
                onChange={onChangeEmail}
              />
            </FormGroup>
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
              <Label for="fullname">Fullname</Label>
              <Input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your fullname...."
                value={fullname}
                onChange={onChangeFullname}
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
              color={color}
              isOpen={alert}
              toggle={onDismiss}
            >
              {mssg}
            </Alert>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onRegister}>
            Sign Up
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterModal;

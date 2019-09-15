import React, { useContext, useState } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  Alert,
} from "reactstrap";
import { UserContext } from "../Contexts/UserContext";
import AppBreadCrumb from "../Components/BreadCrumb";
import Axios from "../Axios";

const ProfilePage = ({ match }) => {
  return (
    <Container>
      <Route component={AppBreadCrumb} />
      <Row>
        <Col sm={4}>
          <ListData />
        </Col>
        <Col sm={8}>
          <Switch>
            <Redirect exact from={"/profile"} to={"/profile/information"} />
            <Route path={`/profile/information`} component={UserInformation} />
            <Route path={`/profile/sercurity`} component={UserSercurity} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

const ListData = ({ match }) => {
  return (
    <ListGroup style={{ marginBottom: "1rem" }}>
      <NavLink
        className={"list-group-item"}
        activeClassName={"profile-active"}
        to={`/profile/information`}
      >
        User Infomation
      </NavLink>
      <NavLink
        className={"list-group-item"}
        activeClassName={"profile-active"}
        to={"/profile/sercurity"}
      >
        User Sercurity
      </NavLink>
    </ListGroup>
  );
};

const UserInformation = () => {
  const { userData } = useContext(UserContext);
  const onChange = () => {
    console.log(`You can't change this data`);
  };
  return (
    <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={userData.username || ""}
          onChange={onChange}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={userData.email || ""}
          onChange={onChange}
          readOnly
        />
      </FormGroup>

      <FormGroup>
        <Label for="fullname">Fullname</Label>
        <Input
          type="text"
          name="fullname"
          id="userfullnamename"
          value={userData.fullname || ""}
          onChange={onChange}
          readOnly
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          // value={JSON.stringify(userData)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

const UserSercurity = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [alert, setAlert] = useState(
    "New Password and Confirmation Password is not equal!"
  );
  const [color, setColor] = useState("danger");
  const [isOpen, setIsOpen] = useState(false);

  const onChangeOldPass = e => {
    setOldPass(e.target.value);
  };
  const onChangeNewPass = e => {
    setNewPass(e.target.value);
  };
  const onChangeConfPass = e => {
    setConfPass(e.target.value);
  };

  const onChangePassword = e => {
    setIsOpen(false);
    e.preventDefault();
    if (!(newPass === confPass)) {
      setIsOpen(true);
      return;
    }
    Axios.put("/api/user/changepass", {
      oldpass: oldPass,
      newpassword: newPass,
    })
      .then(res => {
        setColor("success");
        setAlert(res.data.message);
        setIsOpen(true);
        setOldPass("");
        setNewPass("");
        setConfPass("");
      })
      .catch(err => {
        // console.log(err.response.data);
        setColor("danger");
        setAlert(err.response.data.message);
        setIsOpen(true);
      });
  };

  const onDismiss = () => {
    setIsOpen(false);
  };

  return (
    <Form onSubmit={onChangePassword}>
      <FormGroup>
        <Label for="oldpass">Old Password</Label>
        <Input
          type="password"
          name="oldpass"
          id="oldpass"
          value={oldPass}
          onChange={onChangeOldPass}
        />
      </FormGroup>
      <FormGroup>
        <Label for="newpass">New Password</Label>
        <Input
          type="password"
          name="newpass"
          id="newpass"
          value={newPass}
          onChange={onChangeNewPass}
        />
      </FormGroup>
      <FormGroup>
        <Label for="confPass">New Password Confirmation</Label>
        <Input
          type="password"
          name="confPass"
          id="confPass"
          value={confPass}
          onChange={onChangeConfPass}
        />
      </FormGroup>
      <Alert color={color} isOpen={isOpen} toggle={onDismiss}>
        {alert}
      </Alert>
      <Button>Change Password</Button>
    </Form>
  );
};

export default ProfilePage;

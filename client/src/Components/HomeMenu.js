import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

import { Link } from "react-router-dom";

const HomeMenu = () => {
  const [items, setItems] = useState([
    {
      name: "item 1",
      price: "20000",
    },
    {
      name: "item 2",
      price: "22000",
    },
    {
      name: "item 3",
      price: "50000",
    },
  ]);
  return (
    <Container>
      <p className="display-4 my-2 menu-header text-warning">Menu</p>
      <Row className="my-3">
        {items.map(item => (
          <Col md={4} key={item.name}>
            <Card className="menu-card">
              <CardImg src="http://lorempixel.com/480/480" />
              <CardBody>
                <CardTitle className="mb-3 h3">{item.name}</CardTitle>
                <CardText>{item.price} VNĐ</CardText>
                <Link to="#" className="btn btn-outline-warning card-link">
                  Order Now
                </Link>
                <Link to="#" className="btn btn-outline-warning card-link">
                  Detail
                </Link>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeMenu;

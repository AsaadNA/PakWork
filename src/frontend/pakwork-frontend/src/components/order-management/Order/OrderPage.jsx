import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavBar from "../../navbar/NavBar";
import OrderDelivery from "./OrderDelivery";
import OrderDetail from "./OrderDetail";
import OrderHelp from "./OrderHelp";
import OrderRequirement from "./OrderRequirement";
import OrderTimer from "./OrderTimer";

const OrderPage = () => {
  const timeStamp = new Date(2023, 2, 15, 10, 30, 0).getTime();
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Row>
          <Col md={8} className="mt-2">
            <OrderTimer timeStamp={timeStamp}></OrderTimer>
          </Col>
          <Col md={4}>
            <OrderDetail></OrderDetail>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <OrderRequirement></OrderRequirement>
            <br></br>
            <OrderDelivery></OrderDelivery>
          </Col>
          <Col md={4}>
            <OrderHelp></OrderHelp>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderPage;

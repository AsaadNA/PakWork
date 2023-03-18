import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../../navbar/NavBar";
import OrderDelivery from "./OrderDelivery";
import OrderDetail from "./OrderDetail";
import OrderHelp from "./OrderHelp";
import OrderRequirement from "./OrderRequirement";
import OrderTimer from "./OrderTimer";
import { useParams } from "react-router-dom";
import axios from "../../../Api/Api";

const OrderPage = () => {
  const { orderID } = useParams();

  const [userType, setUserType] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [deliveryLink, setDeliveryLink] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);

  const fetchDeliveryFiles = async () => {
    let result = await axios.get(`/orders/deliver/${orderID}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (result.status === 200) {
      setDeliveryLink(result.data);
      setIsDelivered(true);
    }
  };

  useEffect(() => {
    if (orderDetails.order_id) {
      if (orderDetails.order_status === "Delivered") {
        fetchDeliveryFiles();
      }
    }
  }, [orderDetails.order_id]);

  const getOrderDetails = async () => {
    let result = await axios.get(`/orders/detail/${orderID}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (result.status === 200) {
      setOrderDetails(result.data);
    }
  };

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user"))["user_type"]);
    getOrderDetails();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Row>
          <Col md={8} className="mt-2">
            {orderDetails.ending_date ? (
              <OrderTimer
                orderID={orderDetails.order_id}
                orderStatus={orderDetails.order_status}
                timeStamp={orderDetails.ending_date}
              ></OrderTimer>
            ) : null}
          </Col>
          <Col md={4}>
            <OrderDetail
              isDelivered={isDelivered}
              deliveryLink={deliveryLink}
              endingDate={orderDetails.ending_date}
              orderID={orderDetails.order_id}
              amount={orderDetails.amount}
              orderStatus={orderDetails.order_status}
            ></OrderDetail>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <OrderRequirement
              key={orderDetails.order_id}
              orderFiles={orderDetails.files}
              orderDescription={orderDetails.description}
            ></OrderRequirement>
            <br></br>
            {userType === "freelancer" && orderDetails.order_id ? (
              <OrderDelivery
                orderID={orderDetails.order_id}
                isDelivered={isDelivered}
              ></OrderDelivery>
            ) : null}
            <br></br>
          </Col>

          {userType !== "freelancer" ? (
            <Col md={4}>
              <OrderHelp
                freelancerUsername={orderDetails.freelancer_username}
              ></OrderHelp>
            </Col>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default OrderPage;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "../../Api/Api";
import moment from "moment/moment";
import { toSentenceCase } from "../../Extras/HelperFunctions";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [userType, setUserType] = useState("");

  const fetchOrders = async () => {
    let result = await axios.put(
      "/orders/",
      {
        tokenData: JSON.parse(localStorage.getItem("user")),
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }
    );

    if (result.status === 200) {
      setOrders(result.data);
    }
  };

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user"))["user_type"]);
    fetchOrders();
  }, []);

  return (
    <Container>
      <NavBar></NavBar>
      <Row>
        <Col md={12} className="p-3">
          <Table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Title</th>
                {userType === "freelancer" ? (
                  <th>Client</th>
                ) : (
                  <th>Fulfilled By</th>
                )}
                <th>Amount</th>
                <th>Order Status</th>
                <th>Category</th>
                <th>Due Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td>{order.title}</td>
                    <td>
                      <div className="seller-mini-banner">
                        <img
                          src={`http://localhost:4000/${order.profile_picture}`}
                          alt="buyer_pic"
                        ></img>
                        <span
                          style={{ paddingLeft: "10px", fontWeight: "bold" }}
                        >
                          {order.username
                            ? order.username
                            : order.freelancer_username}
                        </span>
                      </div>
                    </td>
                    <td>${order.amount}</td>
                    <td>
                      {order.order_status === "Delivered" ? (
                        <p className="order-status-badge-delivered">
                          {toSentenceCase(order.order_status)}
                        </p>
                      ) : order.order_status === "Overdue" ? (
                        <p className="order-status-badge-overdue">
                          {toSentenceCase(order.order_status)}
                        </p>
                      ) : (
                        <p className="order-status-badge-progress">
                          {toSentenceCase(order.order_status)}
                        </p>
                      )}
                    </td>
                    {!order.category ? (
                      <td>
                        <strong>Buyer Request</strong>
                      </td>
                    ) : (
                      <td>{order.category}</td>
                    )}
                    <td>
                      {moment
                        .utc(order.ending_date)
                        .local()
                        .format("Do MMM YYYY")}
                    </td>
                    <td>
                      <NavLink
                        to={`/dashboard/orders/${order.order_id}`}
                        className="navlink"
                        style={{ fontWeight: "bold" }}
                      >
                        View Details
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;

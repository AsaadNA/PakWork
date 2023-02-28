import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Orders = () => {
  const Orders = [
    {
      id: 12,
      description: "I will do your javscript task",
      buyer: {
        username: "henrywu",
        picture:
          "http://localhost:4000//images/profiles/7wOoIEpP8bTpKt3g2hU682p92xJEQkQRFDIstCGqNUZWG",
      },
      dueDate: "10th Feb 2022",
    },
  ];
  return (
    <Container>
      <NavBar></NavBar>
      <Row>
        <Col md={12} className="p-3">
          <Table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Order Description</th>
                <th>Placed By</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order) => {
                return (
                  <tr>
                    <td>{order.description}</td>
                    <td>
                      <div className="seller-mini-banner">
                        <img src={order.buyer.picture} alt="buyer_pic"></img>

                        <span
                          style={{ paddingLeft: "10px", fontWeight: "bold" }}
                        >
                          {order.buyer.username}
                        </span>
                      </div>
                    </td>
                    <td>{order.dueDate}</td>
                    <td>
                      <NavLink
                        to={`/dashboard/orders/${order.id}`}
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

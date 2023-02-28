import React from "react";
import { Card } from "react-bootstrap";
import { toSentenceCase } from "../../../Extras/HelperFunctions";

const OrderDetail = () => {
  const orderStatus = "progress";
  return (
    <Card style={{ textAlign: "left" }} className="m-2">
      <Card.Body>
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Order Details</p>
        <div style={{ lineHeight: "10px" }}>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Order ID</p>
            <p className="order-detail-value">PK03434234234</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Delivery Date</p>
            <p className="order-detail-value">Feb 29, 9:10 PM</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Total Price</p>
            <p className="order-detail-value">$25</p>
          </div>
        </div>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Order Status</p>
          {orderStatus === "delivered" ? (
            <p className="order-status-badge-delivered">
              {toSentenceCase(orderStatus)}
            </p>
          ) : orderStatus === "completed" ? (
            <p className="order-status-badge-completed">
              {toSentenceCase(orderStatus)}
            </p>
          ) : (
            <p className="order-status-badge-progress">
              {toSentenceCase(orderStatus)}
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderDetail;

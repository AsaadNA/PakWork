import React from "react";
import { Card, Button } from "react-bootstrap";
import { toSentenceCase } from "../../../Extras/HelperFunctions";
import moment from "moment/moment";

const OrderDetail = ({
  isDelivered,
  deliveryLink,
  orderStatus,
  orderID,
  endingDate,
  amount,
}) => {
  return (
    <Card style={{ textAlign: "left" }} className="m-2">
      <Card.Body>
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Order Details</p>
        <div style={{ lineHeight: "10px" }}>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Order ID</p>
            <p className="order-detail-value">{orderID}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Delivery Date</p>
            <p className="order-detail-value">
              {" "}
              {moment.utc(endingDate).local().format("Do MMM YYYY HH:MM")}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="order-detail-heading">Total Price</p>
            <p className="order-detail-value">${amount}</p>
          </div>
        </div>
        <hr></hr>
        <div className="d-flex justify-content-between">
          <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Order Status</p>
          {orderStatus === "Delivered" ? (
            <p className="order-status-badge-delivered">
              {toSentenceCase(orderStatus)}
            </p>
          ) : orderStatus === "Overdue" ? (
            <p className="order-status-badge-overdue">
              {toSentenceCase(orderStatus)}
            </p>
          ) : (
            <p className="order-status-badge-progress">
              {toSentenceCase(orderStatus)}
            </p>
          )}
        </div>
      </Card.Body>
      {isDelivered ? (
        <Button
          onClick={() => {
            window.location.replace(
              `http://localhost:4000/${deliveryLink[0]["file"]}`
            );
          }}
          variant="success"
        >
          Download File
        </Button>
      ) : null}
    </Card>
  );
};

export default OrderDetail;

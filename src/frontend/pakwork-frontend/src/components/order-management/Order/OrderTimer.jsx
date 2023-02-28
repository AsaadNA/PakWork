import React from "react";
import Timer from "../../timer/Timer";
import { Card } from "react-bootstrap";

const OrderTimer = ({ timeStamp }) => {
  return (
    <Card>
      <Card.Header
        style={{
          color: "#ffffff",
          background: "#198754",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          Order Duration
        </span>
      </Card.Header>
      <Card.Body>
        <Timer timeStamp={timeStamp}></Timer>
      </Card.Body>
    </Card>
  );
};

export default OrderTimer;

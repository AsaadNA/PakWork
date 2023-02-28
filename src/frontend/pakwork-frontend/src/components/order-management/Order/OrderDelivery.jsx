import React from "react";
import { Card, Button } from "react-bootstrap";

const OrderDelivery = () => {
  return (
    <Card>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <span style={{ fontWeight: "bold" }}>
          Want to send your work? Click on the button to proceed
        </span>
        <Button variant="success" className="w-25">
          Deliver Order
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderDelivery;

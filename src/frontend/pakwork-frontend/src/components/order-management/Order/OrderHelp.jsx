import React from "react";
import { Card, Button } from "react-bootstrap";
import help_poster from "../../../assets/login_poster.svg";

const OrderHelp = () => {
  return (
    <Card className="m-2">
      <Card.Body>
        <img
          src={help_poster}
          alt={help_poster}
          height={"70%"}
          width={"70%"}
        ></img>
        <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
          Need to communicate?
        </p>
        <Button variant="success" className="w-50">
          Start Chat 💬
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderHelp;
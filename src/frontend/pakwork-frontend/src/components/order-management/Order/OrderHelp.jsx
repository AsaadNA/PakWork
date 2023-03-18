import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import help_poster from "../../../assets/login_poster.svg";

const OrderHelp = ({ freelancerUsername }) => {
  const navigate = useNavigate();
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
        <Button
          onClick={() => {
            navigate("/dashboard/inbox", {
              state: {
                to: freelancerUsername,
              },
            });
          }}
          variant="success"
          className="w-50"
        >
          Start Chat 💬
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderHelp;

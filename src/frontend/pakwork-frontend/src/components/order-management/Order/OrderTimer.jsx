import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import Countdown from "react-countdown";
import { SocketContext } from "../../../contexts/socket";

const OrderTimer = ({ orderID, orderStatus, timeStamp }) => {
  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("bid");
      socket.off("invalid_bid");
      socket.off("disconnect");
    };
  }, [isConnected]);

  //Custom Renderer For Our CountDown timer
  const countRenderer = ({ days, hours, minutes, seconds, completed }) => {
    //If the timer goes to 0 and the status still says
    //Its "In Progress" Change the Status
    if (completed && orderStatus === "In Progress" && isConnected) {
      socket.emit("change_order_status_to_overdue", {
        orderID,
      });

      window.location.reload();
    }
    return (
      <div className="timer">
        <div className="timer-label">
          {days} <span>Days</span>
        </div>
        <div className="timer-label">
          {hours} <span>Hours</span>
        </div>
        <div className="timer-label">
          {minutes} <span>Minutes</span>
        </div>
        <div className="timer-label">
          {seconds} <span>Seconds</span>
        </div>
      </div>
    );
  };

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
        <Countdown date={timeStamp} renderer={countRenderer} />
      </Card.Body>
    </Card>
  );
};

export default OrderTimer;

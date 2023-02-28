import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./Timer.css";

const Timer = ({ timeStamp }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const totalSeconds = Math.floor((new Date(timeStamp) - new Date()) / 1000);

    if (totalSeconds <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const days = String(Math.floor(totalSeconds / (60 * 60 * 24))).padStart(
      2,
      "0"
    );
    const hours = String(
      Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((totalSeconds % (60 * 60)) / 60)
    ).padStart(2, "0");
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="timer">
      <div className="timer-label">
        {timeRemaining.days} <span>Days</span>
      </div>
      <div className="timer-label">
        {timeRemaining.hours} <span>Hours</span>
      </div>
      <div className="timer-label">
        {timeRemaining.minutes} <span>Minutes</span>
      </div>
      <div className="timer-label">
        {timeRemaining.seconds} <span>Seconds</span>
      </div>
    </div>
  );
};

export default Timer;

import React from "react";
import { Row, Col, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import heroImage from "../../assets/pakwork_home1.svg";

const Hero = () => {
  return (
    <Row
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ paddingBottom: "150px" }}
    >
      <Col md={6} className="search-box">
        <h1
          style={{ whiteSpace: "break-spaces" }}
        >{`Save time, Hire a\nProfessional`}</h1>
        <h4 className="text-success" style={{ fontWeight: "bold" }}>
          Turn your idea into a reality
        </h4>
        <div className="d-flex mt-2">
          <input
            className="search-bar input"
            type={"search"}
            placeholder={"Try 'JavaScript developer'"}
          ></input>
          <Button className="search-green-btn">Search</Button>
        </div>
        <div className="mt-3 searched-items">
          <span>
            <strong>Popular:</strong>
          </span>
          <span className="searched-item">Web Development</span>
          <span className="searched-item">Logo Designing</span>
          <span className="searched-item">Virtual Assistant</span>
        </div>
      </Col>
      <Col md={6}>
        <img
          src={heroImage}
          alt={heroImage}
          height="100%"
          width="100%"
          className="img-fluid"
        ></img>
      </Col>
    </Row>
  );
};

export default Hero;
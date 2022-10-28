import React from "react";
import { Row, Col } from "react-bootstrap";
import PakworkPlus from "../../assets/pakwork_logo_plus.svg";
import PakworkPlusHome from "../../assets/pakwork_plus_home.svg";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const Promotional = () => {
  return (
    <Row className="vh-md-100 py-3 d-flex justify-content-center align-items-center home-section">
      <Col md={6}>
        <div className="section-heading">
          <img
            src={PakworkPlus}
            alt={PakworkPlus}
            height={"50px"}
            className="mt-3 d-flex mb-5"
          ></img>
        </div>
        <div className="section-text">
          <p
            style={{
              whiteSpace: "pre",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "1.4em",
              lineHeight: "30px",
            }}
          >
            {`Designed for Organizations,\nfullfiling every necessity\n\nUpgrade to a curated experience\npacked with tools and benefits,\ndedicated to organizations`}
          </p>
        </div>
        <ul
          style={{
            textAlign: "left",
            whiteSpace: "pre",
            fontWeight: "bold",
            fontSize: "1.05em",
            lineHeight: "25px",
          }}
        >
          <li>
            {`Personalized Testing System to filter\nout the right person for your work`}
          </li>
          <li className="my-1">{`Advanced Statistics for better\ncomparasions`}</li>
          <li>
            {`Manage teamwork and boost productivity\nwith one powerful workspace`}
          </li>
        </ul>
      </Col>
      <Col md={6}>
        <img
          src={PakworkPlusHome}
          alt={PakworkPlusHome}
          className="img-fluid"
        ></img>
      </Col>
    </Row>
  );
};

export default Promotional;

import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
              fontSize: "18px",
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
            fontSize: "15px",
            lineHeight: "25px",
            paddingLeft: "1rem !important",
          }}
        >
          <li>
            {`Personalized Testing System to filter\nout the right person for your work`}
          </li>
          <li className="my-1">{`Advanced Statistics for better\ncomparasions`}</li>
          <li>
            {`Manage teamwork and boost \nproductivity with one powerful \nworkspace`}
          </li>
        </ul>

        <Link
          to="/signup/organization"
          style={{ textDecoration: "none" }}
          className="promotional-hero-link"
        >
          <Button
            variant={"success"}
            className="w-50 mt-3 mb-2 d-block"
            style={{ borderRadius: "20px" }}
          >
            Get Started 🚀
          </Button>
        </Link>
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

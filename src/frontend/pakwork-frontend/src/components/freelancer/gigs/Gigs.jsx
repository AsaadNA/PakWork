import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";

const Gigs = () => {
  return (
    <>
      {" "}
      <Button type="button" variant="success" className="d-flex mb-2">
        Create New Gig
        <FaPlus className="mt-1" style={{ marginLeft: "5px" }}></FaPlus>
      </Button>
      <Row className="d-flex justify-content-center-md align-items-center flex-column-md">
        <Col md={4}>
          <Card style={{ width: "100%", maxWidth: "320px" }}>
            <Card.Img src="https://fiverr-res.cloudinary.com/images/t_medium7,q_auto,f_auto,q_auto,f_auto/gigs/252110108/original/68202f99bd3150cc08bf0236d69de69548ad119e/html-css-javascript-nodejs-development.png"></Card.Img>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              Custom Web Development Services
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <FaEdit
                style={{ marginBottom: "15px", fontSize: "20px" }}
              ></FaEdit>
              <p className="text-success" style={{ fontSize: "13px" }}>
                STARTING AT <strong style={{ fontSize: "17px" }}>$15</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ width: "100%", maxWidth: "320px" }}>
            <Card.Img src="https://fiverr-res.cloudinary.com/images/t_medium7,q_auto,f_auto,q_auto,f_auto/gigs/252118663/original/cc2c5903a188d44ba114591382444a6ba6894757/convert-excel-calculator-to-web.png"></Card.Img>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              Convert Ms Excel, Google Sheets to HTML Calculator
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <FaEdit
                style={{ marginBottom: "15px", fontSize: "20px" }}
              ></FaEdit>
              <p className="text-success" style={{ fontSize: "13px" }}>
                STARTING AT <strong style={{ fontSize: "17px" }}>$15</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ width: "100%", maxWidth: "320px" }}>
            <Card.Img src="https://fiverr-res.cloudinary.com/images/t_medium7,q_auto,f_auto,q_auto,f_auto/gigs/240893461/original/84827500804d6b10be52803b9e9c6d11347c60e3/do-android-development-using-java.png"></Card.Img>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              Android App Development Services, Custom Apps
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <FaEdit
                style={{ marginBottom: "15px", fontSize: "20px" }}
              ></FaEdit>
              <p className="text-success" style={{ fontSize: "13px" }}>
                STARTING AT <strong style={{ fontSize: "17px" }}>$75</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Gigs;

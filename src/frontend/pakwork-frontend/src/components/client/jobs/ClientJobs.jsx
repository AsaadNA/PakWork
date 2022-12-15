import React, { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaUser,
  FaPlus,
  FaCalendar,
  FaMapPin,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { ClientJobModalContext } from "../../../contexts/ModalContext";

const ClientJobs = () => {
  const { handleShowCreateClientJobModal } = useContext(ClientJobModalContext);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 style={{ textAlign: "left" }} className="p-2">
          Active Jobs
        </h4>
        <Button
          type="button"
          variant="success"
          className="d-flex mb-2 justify-content-right align-items-right"
          onClick={handleShowCreateClientJobModal}
        >
          Post A Job
          <FaPlus className="mt-1" style={{ marginLeft: "5px" }}></FaPlus>
        </Button>
      </div>
      <Row className="d-flex mt-4 justify-content-center-md align-items-center flex-column-md">
        <Col md={12} className="mb-2">
          <Card style={{ width: "100%", height: "330px" }}>
            <Card.Header
              style={{
                textAlign: "left",
                fontWeight: "bold",
                paddingTop: "15px",
              }}
              className="bg-success text-light"
            >
              <p>I will do your custom javascript work</p>
            </Card.Header>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Seller Details:
              </p>
              <p className="text-dark-50">
                <FaUser color="green"></FaUser>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>ahsantahseen</span>
                <br></br>
                <FaMapPin color="indianred"></FaMapPin>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>Pakistan</span>
              </p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Completed By:
              </p>
              <p>
                <FaCalendar color="purple"></FaCalendar>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>
                  {new Date().toDateString()}
                </span>
              </p>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <p
                className="text-success"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Click to View More Details &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
              <p className="text-success" style={{ fontSize: "16px" }}>
                Estimated Charges:&nbsp;
                <strong style={{ fontSize: "17px" }}>$15</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={12}>
          <Card style={{ width: "100%", height: "330px" }}>
            <Card.Header
              style={{
                textAlign: "left",
                fontWeight: "bold",
                paddingTop: "15px",
              }}
              className="bg-success text-light"
            >
              <p>
                I will create your custom website using React.js and Material UI
              </p>
            </Card.Header>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Seller Details:
              </p>
              <p className="text-dark-50">
                <FaUser color="green"></FaUser>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>asaadnoman</span>
                <br></br>
                <FaMapPin color="indianred"></FaMapPin>&nbsp;{" "}
                <span style={{ paddingTop: "16px" }}>Pakistan</span>
              </p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Completed By:
              </p>
              <p>
                <FaCalendar color="purple"></FaCalendar>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>
                  {new Date().toDateString()}
                </span>
              </p>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <p
                className="text-success"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Click to View More Details &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
              <p className="text-success" style={{ fontSize: "15px" }}>
                Estimated Charges:&nbsp;
                <strong style={{ fontSize: "17px" }}>$450</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr></hr>
    </>
  );
};

export default ClientJobs;

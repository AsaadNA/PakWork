import React, { useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";
import { GigModalContext } from "../../../contexts/ModalContext";

const Gigs = () => {
  const { handleShowCreateGigModal, handleShowEditGigModal } =
    useContext(GigModalContext);

  return (
    <>
      <Button
        type="button"
        variant="success"
        className="d-flex mb-2"
        onClick={handleShowCreateGigModal}
      >
        Create New Gig
        <FaPlus className="mt-1" style={{ marginLeft: "5px" }}></FaPlus>
      </Button>
      <Row className="d-flex mt-4 justify-content-center-md align-items-center flex-column-md">
        <Col md={4}>
          <Card style={{ width: "100%", maxWidth: "320px", height: "305px" }}>
            <Card.Img src="https://fiverr-res.cloudinary.com/images/t_medium7,q_auto,f_auto,q_auto,f_auto/gigs/252110108/original/68202f99bd3150cc08bf0236d69de69548ad119e/html-css-javascript-nodejs-development.png"></Card.Img>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              Custom Web Development Services
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
              <FaEdit
                style={{ marginBottom: "15px", fontSize: "20px" }}
                onClick={() => handleShowEditGigModal("12")}
              ></FaEdit>
              <p className="text-success" style={{ fontSize: "13px" }}>
                STARTING AT <strong style={{ fontSize: "17px" }}>$15</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <hr></hr>
    </>
  );
};

export default Gigs;

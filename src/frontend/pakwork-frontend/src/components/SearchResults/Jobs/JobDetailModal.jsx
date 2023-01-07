import React from "react";
import { useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { JobDetailModalContext } from "../../../contexts/ModalContext";

const JobDetailModal = () => {
  const { showJobDetailModal, handleCloseJobDetailModal, selectedJobDetails } =
    useContext(JobDetailModalContext);
  return (
    <>
      <Modal
        show={showJobDetailModal}
        onHide={handleCloseJobDetailModal}
        size={"xl"}
      >
        <Modal.Header closeButton>
          <img
            src={PakworkLogo}
            width={"150px"}
            alt={PakworkLogo}
            className="p-1"
          ></img>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <p>
                <strong>Request:</strong> {selectedJobDetails.request}
              </p>
              <p>
                <strong>Description:</strong>
                {selectedJobDetails.description}
              </p>
              <p>
                <strong>Posted On:</strong> {selectedJobDetails.postedOn}
              </p>
              <p>
                <strong>Budget:</strong> ${selectedJobDetails.budget}
              </p>
              <p>
                <strong>Duration:</strong> {selectedJobDetails.duration}
              </p>
              <p>
                <strong>Job Category:</strong> {selectedJobDetails.category}
              </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetailModal;

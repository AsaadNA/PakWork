import React from "react";
import { useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { JobDetailModalContext } from "../../../contexts/ModalContext";
import moment from "moment/moment";

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
          {showJobDetailModal ? (
            <Row>
              <Col md={12}>
                <p>
                  <strong>Request:</strong> {selectedJobDetails.request}
                </p>
                <p>
                  <strong>Description: </strong>
                  {selectedJobDetails.description}
                </p>
                <p>
                  <strong>Posted On:</strong> {moment.utc(selectedJobDetails.startingTime).local().format("Do MMM YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Starting Amount:</strong> ${selectedJobDetails.budget}
                </p>
                <p>
                  <strong>Ending Time:</strong>  {moment.utc(selectedJobDetails.endingTime).local().format("Do MMM YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Job Category:</strong> {selectedJobDetails.category}
                </p>
              </Col>
            </Row>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default JobDetailModal;

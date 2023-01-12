import React from "react";
import { useContext } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { RequestDetailModalContext } from "../../../contexts/ModalContext";
import moment from "moment/moment";

const RequestDetailModal = () => {
  const {
    showRequestDetailModal,
    handleCloseRequestDetailModal,
    selectedRequestDetails,
  } = useContext(RequestDetailModalContext);
  return (
    <>
      <Modal
        show={showRequestDetailModal}
        onHide={handleCloseRequestDetailModal}
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
          {showRequestDetailModal ? (
            <Row>
              <Col md={12}>
                <p>
                  <strong>Request:</strong> {selectedRequestDetails.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {selectedRequestDetails.description}
                </p>
                <p>
                  <strong>Posted On:</strong>{" "}
                  {moment
                    .utc(selectedRequestDetails.posting_date)
                    .local()
                    .format("Do MMM YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Budget:</strong> ${selectedRequestDetails.budget}
                </p>
              </Col>
            </Row>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestDetailModal;

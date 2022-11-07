import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import PakworkLogo from "../../assets/pakwork_logo.svg";
import VerificationPoster from "../../assets/verification_1.svg";
import { ShowVerificationModalContext } from "../../contexts/ModalContext";
import axios from "../../Api/Api";

const VerificationModal = () => {
  const [files, setFiles] = useState();
  const [allowUpload, setAllowUpload] = useState(false);
  const [loading, setloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState("");

  const { showVerification, handleCloseVerification } = useContext(
    ShowVerificationModalContext
  );
  const handleUpload = async (e) => {
    setloading(true);
    const formData = new FormData();
    e.preventDefault();
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      formData.append(`images`, files[i]);
    }
    try {
      let response = await axios.post(
        "/upload/verification",
        {
          data: formData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": localStorage.getItem("userToken").toString(),
          },
        }
      );
      setshowAlert(true);
      setAlertMessage(response.data);
      setAlertType("success");
      setloading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setshowAlert(true);
      setAlertMessage(error.response.data.error || error.message);
      setAlertType("danger");
      setloading(false);
    }
  };
  useEffect(() => {
    setshowAlert(false);
    setAlertMessage("");
    setAlertType("success");
    setloading(false);
  }, []);

  return (
    <>
      <Modal
        show={showVerification}
        onHide={handleCloseVerification}
        size={"lg"}
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
          <Container>
            <Row className="mb-3">
              <Alert key={"1"} variant={AlertType} show={showAlert}>
                {AlertMessage}
              </Alert>
              <Col md={6} className="login-image-container">
                <img src={VerificationPoster} alt={VerificationPoster}></img>
              </Col>
              <Col md={6}>
                <h3 style={{ color: "#264a99", fontWeight: "bold" }}>
                  Verify Your Identify
                </h3>
                <p>
                  Please Upload Atleast 1 Picture of, one of the following given
                  options:
                </p>
                <ul>
                  <li>National Identity Card</li>
                  <li>Driving License</li>
                  <li>Passport</li>
                </ul>
                <p>
                  Please Note: Submitted Documents must be associated with you
                  only. Other associate's documents found to be used will result
                  in cancellation of account's verification.
                </p>
                <Form onSubmit={handleUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="btn btn-success mb-2 w-100"
                    onChange={(e) => {
                      setFiles(e.target.files);
                      setAllowUpload(true);
                    }}
                    disabled={loading}
                  ></input>
                  <Button
                    type="submit"
                    className="w-100"
                    variant="success"
                    disabled={!allowUpload}
                  >
                    Upload 🚀
                  </Button>
                </Form>
                <p
                  className="text-dark-50 text-center mt-1"
                  style={{ fontSize: "14px" }}
                >
                  *Maximum 5 Images are allowed to upload*
                </p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerificationModal;

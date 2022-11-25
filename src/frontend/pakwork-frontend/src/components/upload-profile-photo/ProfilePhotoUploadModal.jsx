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
import ProfilePoster from "../../assets/login_poster.svg";
import { ShowProfilePictureUploadModalContext } from "../../contexts/ModalContext";
import axios from "../../Api/Api";

const ProfilePhotoUploadModal = () => {
  const [files, setFiles] = useState(null);
  const [allowUpload, setAllowUpload] = useState(false);
  const [loading, setloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState("");

  const { showProfilePictureUpload, handleCloseProfilePictureUpload } =
    useContext(ShowProfilePictureUploadModalContext);

  const handleUpload = async (e) => {
    setloading(true);
    const formData = new FormData();
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      formData.append(`image`, files[i]);
    }
    try {
      let response = await axios.post("/upload/profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("userToken").toString(),
        },
      });
      if(response.status === 200) {window.location.reload()} 
      setshowAlert(true);
      setAlertMessage(response.data.message);
      setAlertType("success");
      setloading(false);
      setAllowUpload(false);
    } catch (error) {
      console.log(error);
      setshowAlert(true);
      setAlertMessage("Invalid File Type or Upload Limit Reached");
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
        show={showProfilePictureUpload}
        onHide={handleCloseProfilePictureUpload}
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
                <img src={ProfilePoster} alt={ProfilePoster}></img>
              </Col>
              <Col md={6}>
                <h3 style={{ fontWeight: "bold" }}>Upload Profile Photo</h3>
                <p>Please Upload 1 Picture for your profile</p>
                <p>
                  <strong>Please Note:</strong> Submitted Photo must be
                  associated with you only. Other associate's Photo found to be
                  used will result in cancellation of account's verification.
                </p>
                <Form method="POST" onSubmit={handleUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
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
                    Upload Profile Picture🚀
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfilePhotoUploadModal;

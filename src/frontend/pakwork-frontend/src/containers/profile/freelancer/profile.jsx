import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import ProfileInfo from "../../../components/freelancer/profile/ProfileInfo";
import Gigs from "../../../components/freelancer/gigs/Gigs";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Reviews from "../../../components/freelancer/reviews/Reviews";
import VerificationModal from "../../../components/verification/VerificationModal";
import { ShowVerificationModalContext } from "../../../contexts/ModalContext";

const Profile = () => {
  const [showVerification, setshowVerification] = useState(false);

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  return (
    <ShowVerificationModalContext.Provider
      value={{
        showVerification,
        handleCloseVerification,
        handleShowVerification,
      }}
    >
      <div>
        <NavBar></NavBar>
        <Container className="mt-3">
          <VerificationModal></VerificationModal>
          <Row>
            <Col
              className="d-flex justify-content-start align-items-start flex-column"
              md={4}
            >
              <ProfileInfo></ProfileInfo>
            </Col>
            <Col md={8}>
              <Gigs></Gigs>
              <Reviews></Reviews>
            </Col>
          </Row>
        </Container>
      </div>
    </ShowVerificationModalContext.Provider>
  );
};

export default Profile;

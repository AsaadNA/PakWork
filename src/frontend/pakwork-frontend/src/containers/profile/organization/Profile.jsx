import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import ProfileInfo from "../../../components/organization/profile/ProfileInfo";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import VerificationModal from "../../../components/verification/VerificationModal";
import {
  ShowEditOrganizationProfileModalContext,
  ShowProfilePictureUploadModalContext,
  ShowVerificationModalContext,
} from "../../../contexts/ModalContext";
import EditModal from "../../../components/organization/profile/EditModal";
import ProfilePhotoUploadModal from "../../../components/upload-profile-photo/ProfilePhotoUploadModal";
import Reviews from "../../../components/reviews/Reviews";
import CurrentOrders from "../../../components/current-orders/CurrentOrders";

const OrganizationProfile = () => {
  const [showVerification, setshowVerification] = useState(false);
  const [showEditProfie, setshowEditProfile] = useState(false);
  const [showProfilePictureUpload, setshowProfilePictureUpload] =
    useState(false);

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  const handleCloseOrganizationEditProfile = () => setshowEditProfile(false);
  const handleShowOrganizationEditProfile = () => setshowEditProfile(true);
  const handleShowProfilePictureUpload = () =>
    setshowProfilePictureUpload(true);
  const handleCloseProfilePictureUpload = () =>
    setshowProfilePictureUpload(false);

  return (
    <ShowProfilePictureUploadModalContext.Provider
      value={{
        showProfilePictureUpload,
        handleShowProfilePictureUpload,
        handleCloseProfilePictureUpload,
      }}
    >
      <ShowVerificationModalContext.Provider
        value={{
          showVerification,
          handleCloseVerification,
          handleShowVerification,
        }}
      >
        <ShowEditOrganizationProfileModalContext.Provider
          value={{
            showEditProfie,
            handleCloseOrganizationEditProfile,
            handleShowOrganizationEditProfile,
          }}
        >
          <div>
            <NavBar></NavBar>
            <Container className="mt-3">
              <EditModal></EditModal>
              <ProfilePhotoUploadModal></ProfilePhotoUploadModal>
              <VerificationModal></VerificationModal>
              <Row>
                <Col
                  className="d-flex justify-content-start align-items-start flex-column"
                  md={4}
                >
                  <ProfileInfo></ProfileInfo>
                </Col>
                <Col md={8}>
                  <CurrentOrders></CurrentOrders>
                  <Reviews></Reviews>
                </Col>
              </Row>
            </Container>
          </div>
        </ShowEditOrganizationProfileModalContext.Provider>
      </ShowVerificationModalContext.Provider>
    </ShowProfilePictureUploadModalContext.Provider>
  );
};

export default OrganizationProfile;

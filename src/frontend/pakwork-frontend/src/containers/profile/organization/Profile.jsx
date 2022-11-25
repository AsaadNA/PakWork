import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import ProfileInfo from "../../../components/freelancer/profile/ProfileInfo";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import VerificationModal from "../../../components/verification/VerificationModal";
import {
  ShowEditClientProfileModalContext,
  ShowProfilePictureUploadModalContext,
  ShowVerificationModalContext,
} from "../../../contexts/ModalContext";
import EditModal from "../../../components/client/profile/EditModal";
import ProfilePhotoUploadModal from "../../../components/upload-profile-photo/ProfilePhotoUploadModal";

const OrganizationProfile = () => {
  const [showVerification, setshowVerification] = useState(false);
  const [showEditProfie, setshowEditProfile] = useState(false);
  const [showProfilePictureUpload, setshowProfilePictureUpload] =
    useState(false);

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  const handleCloseRegularBuyerEditProfile = () => setshowEditProfile(false);
  const handleShowRegularBuyerEditProfile = () => setshowEditProfile(true);
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
        <ShowEditClientProfileModalContext.Provider
          value={{
            showEditProfie,
            handleCloseRegularBuyerEditProfile,
            handleShowRegularBuyerEditProfile,
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
                <Col md={8}></Col>
              </Row>
            </Container>
          </div>
        </ShowEditClientProfileModalContext.Provider>
      </ShowVerificationModalContext.Provider>
    </ShowProfilePictureUploadModalContext.Provider>
  );
};

export default OrganizationProfile;

import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import ProfileInfo from "../../../components/freelancer/profile/ProfileInfo";
import Gigs from "../../../components/freelancer/gigs/Gigs";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Reviews from "../../../components/reviews/Reviews";
import VerificationModal from "../../../components/verification/VerificationModal";
import {
  ShowEditFreelancerProfileModalContext,
  ShowProfilePictureUploadModalContext,
  ShowVerificationModalContext,
  GigModalContext,
} from "../../../contexts/ModalContext";
import EditModal from "../../../components/freelancer/profile/EditModal";
import ProfilePhotoUploadModal from "../../../components/upload-profile-photo/ProfilePhotoUploadModal";
import CreateGigModal from "../../../components/freelancer/gigs/CreateGigModal";
import EditGigModal from "../../../components/freelancer/gigs/EditGigModal";

const FreelancerProfile = () => {
  const [showVerification, setshowVerification] = useState(false);
  const [showEditProfie, setshowEditProfile] = useState(false);
  const [showProfilePictureUpload, setshowProfilePictureUpload] =
    useState(false);
  const [ShowCreateGigModal, setShowCreateGigModal] = useState(false);
  const [ShowEditGigModal, setShowEditGigModal] = useState(false);
  //const [EditGigID, setEditGigID] = useState("");
  const [EditGigInfo, setEditGigInfo] = useState({});

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  const handleCloseFreelancerEditProfile = () => setshowEditProfile(false);
  const handleShowFreelancerEditProfile = () => setshowEditProfile(true);
  const handleShowProfilePictureUpload = () =>
    setshowProfilePictureUpload(true);
  const handleCloseProfilePictureUpload = () =>
    setshowProfilePictureUpload(false);
  const handleShowCreateGigModal = () => setShowCreateGigModal(true);
  const handleCloseCreateGigModal = () => setShowCreateGigModal(false);
  const handleShowEditGigModal = (gigInfo) => {
    setEditGigInfo(gigInfo);
    setShowEditGigModal(true);
    //setEditGigID(id);
  };
  const handleCloseEditGigModal = () => {
    setShowEditGigModal(false);
    //setEditGigID("");
    setEditGigInfo({});
  };

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
        <ShowEditFreelancerProfileModalContext.Provider
          value={{
            showEditProfie,
            handleCloseFreelancerEditProfile,
            handleShowFreelancerEditProfile,
          }}
        >
          <GigModalContext.Provider
            value={{
              ShowCreateGigModal,
              handleCloseCreateGigModal,
              handleShowCreateGigModal,
              ShowEditGigModal,
              handleShowEditGigModal,
              handleCloseEditGigModal,
              EditGigInfo
              //EditGigID,
            }}
          >
            <div>
              <NavBar></NavBar>
              <Container className="mt-3">
                <EditModal></EditModal>
                <ProfilePhotoUploadModal></ProfilePhotoUploadModal>
                <VerificationModal></VerificationModal>
                <CreateGigModal></CreateGigModal>
                <EditGigModal></EditGigModal>
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
          </GigModalContext.Provider>
        </ShowEditFreelancerProfileModalContext.Provider>
      </ShowVerificationModalContext.Provider>
    </ShowProfilePictureUploadModalContext.Provider>
  );
};

export default FreelancerProfile;

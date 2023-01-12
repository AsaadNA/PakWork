import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import ProfileInfo from "../../../components/client/profile/ProfileInfo";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import VerificationModal from "../../../components/verification/VerificationModal";
import {
  ShowEditClientProfileModalContext,
  ShowProfilePictureUploadModalContext,
  ShowVerificationModalContext,
  ClientJobModalContext,
  RequestCreateModalContext,
} from "../../../contexts/ModalContext";
import EditModal from "../../../components/client/profile/EditModal";
import ProfilePhotoUploadModal from "../../../components/upload-profile-photo/ProfilePhotoUploadModal";
import Reviews from "../../../components/reviews/Reviews";
import ClientJobs from "../../../components/client/jobs/ClientJobs";
import CreateClientJobModal from "../../../components/client/jobs/CreateClientJobModal";
import EditClientJobModal from "../../../components/client/jobs/EditClientJobModal";
import CreateRequestModal from "../../../components/requests/CreateRequestModal";

const ClientProfile = () => {
  const [showVerification, setshowVerification] = useState(false);
  const [showEditProfie, setshowEditProfile] = useState(false);
  const [showProfilePictureUpload, setshowProfilePictureUpload] =
    useState(false);
  const [showCreateClientJobModal, setShowCreateClientJobModal] =
    useState(false);
  const [showEditClientJobModal, setShowEditClientJobModal] = useState(false);

  //
  const [EditJobInfo, setEditJobInfo] = useState({});

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  const handleCloseClientEditProfile = () => setshowEditProfile(false);
  const handleShowClientEditProfile = () => setshowEditProfile(true);
  const handleShowProfilePictureUpload = () =>
    setshowProfilePictureUpload(true);
  const handleCloseProfilePictureUpload = () =>
    setshowProfilePictureUpload(false);
  const handleShowCreateClientJobModal = () =>
    setShowCreateClientJobModal(true);
  const handleCloseCreateClientJobModal = () =>
    setShowCreateClientJobModal(false);

  const handleShowEditClientJobModal = (jobInfo) => {
    setEditJobInfo(jobInfo);
    setShowEditClientJobModal(true);
  };

  const handleCloseEditClientJobModal = () => {
    setEditJobInfo({});
    setShowEditClientJobModal(false);
  };

  //////

  const [showCreateRequestModal, setCreateRequestModal] = useState(false);
  const handleShowCreateRequestModal = () => setCreateRequestModal(true);
  const handleCloseCreateRequestModal = () => setCreateRequestModal(false);

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
            handleCloseClientEditProfile,
            handleShowClientEditProfile,
          }}
        >
          <ClientJobModalContext.Provider
            value={{
              showCreateClientJobModal,
              handleShowCreateClientJobModal,
              handleCloseCreateClientJobModal,
              showEditClientJobModal,
              handleShowEditClientJobModal,
              handleCloseEditClientJobModal,
              EditJobInfo,
            }}
          >
            <RequestCreateModalContext.Provider
              value={{
                showCreateRequestModal,
                handleShowCreateRequestModal,
                handleCloseCreateRequestModal,
              }}
            >
              <div>
                <NavBar></NavBar>
                <Container className="mt-3">
                  <EditModal></EditModal>
                  <ProfilePhotoUploadModal></ProfilePhotoUploadModal>
                  <VerificationModal></VerificationModal>
                  <CreateClientJobModal></CreateClientJobModal>
                  <EditClientJobModal></EditClientJobModal>
                  <CreateRequestModal></CreateRequestModal>
                  <Row>
                    <Col
                      className="d-flex justify-content-start align-items-start flex-column"
                      md={4}
                    >
                      <ProfileInfo></ProfileInfo>
                    </Col>
                    <Col md={8}>
                      <ClientJobs></ClientJobs>
                      {/* <Reviews></Reviews>*/}
                    </Col>
                  </Row>
                </Container>
              </div>
            </RequestCreateModalContext.Provider>
          </ClientJobModalContext.Provider>
        </ShowEditClientProfileModalContext.Provider>
      </ShowVerificationModalContext.Provider>
    </ShowProfilePictureUploadModalContext.Provider>
  );
};

export default ClientProfile;

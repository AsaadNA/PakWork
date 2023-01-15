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
  RequestCreateModalContext,
  RequestEditModalContext,
} from "../../../contexts/ModalContext";
import EditModal from "../../../components/organization/profile/EditModal";
import ProfilePhotoUploadModal from "../../../components/upload-profile-photo/ProfilePhotoUploadModal";
import Reviews from "../../../components/reviews/Reviews";
import OrganizationJobs from "../../../components/organization/jobs/OrganizationJobs";
import { OrganizationJobModalContext } from "../../../contexts/ModalContext";
import CreateOrganizationJobModal from "../../../components/organization/jobs/CreateOrganizationJobModal";
import EditOrganizationJobModal from "../../../components/organization/jobs/EditOrganizationJobModal";
import CreateRequestModal from "../../../components/requests/CreateRequestModal";
import EditRequestModal from "../../../components/requests/EditRequestModal";

const OrganizationProfile = () => {
  const [showVerification, setshowVerification] = useState(false);
  const [showEditProfie, setshowEditProfile] = useState(false);
  const [showProfilePictureUpload, setshowProfilePictureUpload] =
    useState(false);
  const [showCreateOrganizationJobModal, setshowCreateOrganizationJobModal] =
    useState(false);
  const [showEditOrganizationJobModal, setshowEditOrganizationJobModal] =
    useState(false);

  const [EditJobInfo, setEditJobInfo] = useState({});

  const handleCloseVerification = () => setshowVerification(false);
  const handleShowVerification = () => setshowVerification(true);
  const handleCloseOrganizationEditProfile = () => setshowEditProfile(false);
  const handleShowOrganizationEditProfile = () => setshowEditProfile(true);
  const handleShowProfilePictureUpload = () =>
    setshowProfilePictureUpload(true);
  const handleCloseProfilePictureUpload = () =>
    setshowProfilePictureUpload(false);
  const handleshowCreateOrganizationJobModal = () =>
    setshowCreateOrganizationJobModal(true);
  const handleCloseOrganizationCreateJobModal = () =>
    setshowCreateOrganizationJobModal(false);

  const handleshowEditOrganizationJobModal = (jobInfo) => {
    setEditJobInfo(jobInfo);
    setshowEditOrganizationJobModal(true);
  };

  const handleCloseOrganizationEditJobModal = () => {
    setEditJobInfo({});
    setshowEditOrganizationJobModal(false);
  };

  ///CREATE REQUEST MODAL
  const [showCreateRequestModal, setCreateRequestModal] = useState(false);
  const handleShowCreateRequestModal = () => setCreateRequestModal(true);
  const handleCloseCreateRequestModal = () => setCreateRequestModal(false);

  //EDIT REQUEST MODAL
  const [EditRequestInfo, setEditRequestInfo] = useState({});
  const [showEditRequestModal, setEditRequestModal] = useState(false);

  const handleShowEditRequestModal = (info) => {
    setEditRequestInfo(info);
    setEditRequestModal(true);
  };

  const handleCloseEditRequestModal = () => {
    setEditRequestInfo({});
    setEditRequestModal(false);
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
        <ShowEditOrganizationProfileModalContext.Provider
          value={{
            showEditProfie,
            handleCloseOrganizationEditProfile,
            handleShowOrganizationEditProfile,
          }}
        >
          <OrganizationJobModalContext.Provider
            value={{
              showCreateOrganizationJobModal,
              handleshowCreateOrganizationJobModal,
              handleCloseOrganizationCreateJobModal,
              showEditOrganizationJobModal,
              handleshowEditOrganizationJobModal,
              handleCloseOrganizationEditJobModal,
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
              <RequestEditModalContext.Provider
                value={{
                  showEditRequestModal,
                  handleShowEditRequestModal,
                  handleCloseEditRequestModal,
                  EditRequestInfo,
                }}
              >
                <div>
                  <NavBar></NavBar>
                  <Container className="mt-3">
                    <EditModal></EditModal>
                    <ProfilePhotoUploadModal></ProfilePhotoUploadModal>
                    <VerificationModal></VerificationModal>
                    <CreateOrganizationJobModal></CreateOrganizationJobModal>
                    <EditOrganizationJobModal></EditOrganizationJobModal>
                    <CreateRequestModal></CreateRequestModal>
                    <EditRequestModal></EditRequestModal>
                    <Row>
                      <Col
                        className="d-flex justify-content-start align-items-start flex-column"
                        md={4}
                      >
                        <ProfileInfo></ProfileInfo>
                      </Col>
                      <Col md={8}>
                        <OrganizationJobs></OrganizationJobs>
                        <Reviews></Reviews>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </RequestEditModalContext.Provider>
            </RequestCreateModalContext.Provider>
          </OrganizationJobModalContext.Provider>
        </ShowEditOrganizationProfileModalContext.Provider>
      </ShowVerificationModalContext.Provider>
    </ShowProfilePictureUploadModalContext.Provider>
  );
};

export default OrganizationProfile;

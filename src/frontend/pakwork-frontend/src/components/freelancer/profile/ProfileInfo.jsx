import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaGithub,
  FaImage,
  FaIndustry,
  FaLinkedin,
  FaLocationArrow,
  FaQuoteLeft,
  FaQuoteRight,
  FaUserCheck,
} from "react-icons/fa";
import axios from "../../../Api/Api";
import "./ProfileInfo.css";
import DefaultProfile from "../../../assets/profile_pic_default.png";
import {
  ShowVerificationModalContext,
  ShowEditFreelancerProfileModalContext,
  ShowProfilePictureUploadModalContext,
} from "../../../contexts/ModalContext";

const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [verified, setVerified] = useState(false);
  const [CompletedProfile, setCompletedProfile] = useState(false);
  const { handleShowVerification } = useContext(ShowVerificationModalContext);
  const { handleShowFreelancerEditProfile } = useContext(
    ShowEditFreelancerProfileModalContext
  );
  const { handleShowProfilePictureUpload } = useContext(
    ShowProfilePictureUploadModalContext
  );

  const getProfileData = async () => {
    try {
      let userToken = localStorage.getItem("userToken");
      let freelancerID = JSON.parse(localStorage.getItem("user")).freelancer_id;
      let response = await axios.get(`/profile`, {
        headers: {
          "x-access-token": userToken,
        },
      });
      console.log(response.data);
      if (
        (response.data[0].bio === null && response.data[0].level === null) ||
        response.data[0].isVerified === false
      ) {
        setCompletedProfile(false);
      } else {
        setCompletedProfile(true);
      }
      setUser(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {!CompletedProfile ? (
        <Card
          style={{ width: "100%", maxWidth: "350px", background: "#f7f7f7" }}
        >
          <Card.Body>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <div className="profile-box">
                <div className="profile-picture-container">
                  <FaImage
                    className="uploadIcon"
                    onClick={handleShowProfilePictureUpload}
                  ></FaImage>
                  <img
                    src={DefaultProfile}
                    className="profile-picture"
                    alt="profile_pic"
                  ></img>
                </div>
              </div>
              <div className="mt-2">
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Muhammad Ahsan
                </span>
                <br />
                <span className="text-dark-50" style={{ fontSize: "16px" }}>
                  @ahsantahseen
                </span>
              </div>
              <hr className="w-100"></hr>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontWeight: "500",
                }}
              >
                Click the Button Below, Fill in additional details to compelete
                your profile.
              </p>
              {user.bio === null && (
                <Button
                  className="mb-3 w-100"
                  variant="danger"
                  onClick={handleShowFreelancerEditProfile}
                >
                  Complete Your Profile!
                </Button>
              )}
              <Button
                className="solid-green-btn w-100"
                onClick={handleShowVerification}
              >
                Get Verified! ✔️
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card
            style={{ width: "100%", maxWidth: "350px", background: "#f7f7f7" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="profile-box">
                  <div className="profile-picture-container">
                      <FaImage
                        className="uploadIcon"
                        onClick={handleShowProfilePictureUpload}
                      ></FaImage>
                    <img
                      src={
                        "https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/d7de608727a04b03fd8ce4d5c664e622-1665365749459/d3bd39f9-9925-4e49-905f-0d6b64392c72.png"
                      }
                      className="profile-picture  "
                      alt="profile_pic"
                    ></img>
                    <div className="level1-badge">Level 1</div>
                    {verified ? (
                      <div className="verified-badge">
                        <FaUserCheck></FaUserCheck> Verified
                      </div>
                    ) : (
                      <div className="unverified-badge">Unverified</div>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Muhammad Ahsan
                  </span>
                  <br />
                  <span className="text-dark-50" style={{ fontSize: "16px" }}>
                    @ahsantahseen
                  </span>
                </div>
                <hr className="w-100"></hr>
              </div>
              <div style={{ textAlign: "left" }}>
                <span>
                  <FaLocationArrow></FaLocationArrow> Country: &nbsp;
                  <strong>Pakistan</strong>
                </span>
                <br></br>
                <span>
                  <FaIndustry></FaIndustry> Industry: &nbsp;
                  <strong>Web Development</strong>
                </span>
                <br></br>
                <FaClock></FaClock> Experience: &nbsp;
                <strong>2 Years</strong>
              </div>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "100%",
              maxWidth: "350px",
              background: "#f7f7f7",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-start align-items-start flex-column">
                <div>
                  <p style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      About Me:
                    </span>
                    <br></br>
                    I'm a professional full stack developer with 2 years of
                    experience in html css javascript nodejs reactjs sql with
                    excellent git version control skills along with professional
                    graphics designing skills.
                  </p>
                  <hr className="w-100"></hr>
                  <p style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Linked Accounts:
                    </span>
                    <br></br>
                    <div style={{ fontSize: "30px" }}>
                      <FaLinkedin></FaLinkedin>
                      &nbsp;
                      <FaGithub></FaGithub>
                    </div>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default ProfileInfo;

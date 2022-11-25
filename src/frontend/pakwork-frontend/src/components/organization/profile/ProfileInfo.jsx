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
  FaUser,
  FaGlobe,
} from "react-icons/fa";
import axios from "../../../Api/Api";
import "./ProfileInfo.css";
import DefaultProfile from "../../../assets/profile_pic_default.png";
import {
  ShowEditOrganizationProfileModalContext,
  ShowProfilePictureUploadModalContext,
} from "../../../contexts/ModalContext";

const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [verified, setVerified] = useState(false);
  const [CompletedProfile, setCompletedProfile] = useState(false);
  const { handleShowOrganizationEditProfile } = useContext(
    ShowEditOrganizationProfileModalContext
  );
  const { handleShowProfilePictureUpload } = useContext(
    ShowProfilePictureUploadModalContext
  );

  const getProfileData = async () => {
    try {
      let userToken = localStorage.getItem("userToken");
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
                  Shafique Pillar
                </span>
                <br />
                <span className="text-dark-50" style={{ fontSize: "16px" }}>
                  @sqpillar
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
                  onClick={handleShowOrganizationEditProfile}
                >
                  Complete Your Profile!
                </Button>
              )}
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
                        "https://funneltechie.com/hosted/images/f3/76fb8aa2f94b968b581e9a36f62cd4/Logo-for_Youtube-Profile.jpg"
                      }
                      className="profile-picture  "
                      alt="profile_pic"
                    ></img>
                  </div>
                </div>
                <div className="mt-2">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Funnel Techie
                  </span>
                  <br />
                  <span className="text-dark-50" style={{ fontSize: "16px" }}>
                    @funneltechie
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
                  <strong>Programming & Tech</strong>
                </span>
                <br></br>
                <span>
                  <FaClock></FaClock> Hiring Experience: &nbsp;
                  <strong>2 Years</strong>
                </span>
                <br></br>
                <span>
                  <FaUser></FaUser> No. of Employees: &nbsp;
                  <strong>18</strong>
                </span>
                <br></br>
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
                      About Us:
                    </span>
                    <br></br>
                    We provide email marketing solutions and are looking for crm
                    plugin developers
                  </p>
                  <hr className="w-100"></hr>
                  <p style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Linked Accounts & Website:
                    </span>
                    <br></br>
                    <div style={{ fontSize: "30px" }}>
                      <FaLinkedin className="social-icon"></FaLinkedin>
                      &nbsp;
                      <FaGlobe className="social-icon"></FaGlobe>
                    </div>
                    <br />
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

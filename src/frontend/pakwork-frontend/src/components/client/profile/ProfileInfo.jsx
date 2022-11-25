import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import {
  FaImage,
  FaIndustry,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa";
import axios from "../../../Api/Api";
import "./ProfileInfo.css";
import DefaultProfile from "../../../assets/profile_pic_default.png";
import {
  ShowEditClientProfileModalContext,
  ShowProfilePictureUploadModalContext,
} from "../../../contexts/ModalContext";

const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [CompletedProfile, setCompletedProfile] = useState(false);
  const { handleShowClientEditProfile } = useContext(
    ShowEditClientProfileModalContext
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

      //Check if profile is incomplete
      const entries = Object.entries(response.data[0]);
      const nonEmptyOrNull = entries.filter(
        ([key, val]) =>
          (val === "" || val === null) &&
          key !== "linkedin_link" &&
          key !== "profile_picture"
      );

      if (nonEmptyOrNull.length > 0) {
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
                    src={
                      user.profile_picture === "" ||
                      user.profile_picture === null
                        ? DefaultProfile
                        : `http://localhost:4000/${user.profile_picture}`
                    }
                    className="profile-picture"
                    alt="profile_pic"
                  ></img>
                </div>
              </div>
              <div className="mt-2">
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {user.first_name} {user.last_name}
                </span>
                <br />
                <span className="text-dark-50" style={{ fontSize: "16px" }}>
                  @{user.username}
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
              {CompletedProfile ? null : (
                <Button
                  className="mb-3 w-100"
                  variant="danger"
                  onClick={handleShowClientEditProfile}
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
                        user.profile_picture === "" ||
                        user.profile_picture === null
                          ? DefaultProfile
                          : `http://localhost:4000/${user.profile_picture}`
                      }
                      className="profile-picture  "
                      alt="profile_pic"
                    ></img>
                    <div
                      style={{top:0}}
                      onClick={handleShowClientEditProfile}
                      className="editprofile-badge"
                    >
                      <span className="editprofiletext">Edit Profile</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {user.first_name} {user.last_name}
                  </span>
                  <br />
                  <span className="text-dark-50" style={{ fontSize: "16px" }}>
                    @{user.username}
                  </span>
                </div>
                <hr className="w-100"></hr>
              </div>
              <div style={{ textAlign: "left" }}>
                <span>
                  <FaLocationArrow></FaLocationArrow> Country: &nbsp;
                  <strong>{user.country}</strong>
                </span>
                <br></br>
                <span>
                  <FaIndustry></FaIndustry> Industry: &nbsp;
                  <strong>{user.industry_name}</strong>
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
                      About Me:
                    </span>
                    <br></br>
                    {user.bio}
                  </p>
                  <hr className="w-100"></hr>
                  <p style={{ textAlign: "left" }}>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Linked Accounts:
                    </span>
                    <br></br>
                    <div style={{ fontSize: "30px" }}>
                      <a href={user.linkedin_link}>
                        <FaLinkedin className="social-icon"></FaLinkedin>
                      </a>
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

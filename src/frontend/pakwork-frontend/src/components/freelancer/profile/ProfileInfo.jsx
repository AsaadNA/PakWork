import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaGithub,
  FaIndustry,
  FaLinkedin,
  FaLocationArrow,
  FaQuoteLeft,
  FaQuoteRight,
  FaUserCheck,
} from "react-icons/fa";
import axios from "../../../Api/Api";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const [verified, setVerified] = useState(false);
  const getProfileData = async () => {
    try {
      let userToken = localStorage.getItem("userToken");
      let freelancerID = JSON.parse(localStorage.getItem("user")).freelancer_id;
      let response = await axios.get(`/profile/${freelancerID}`, {
        headers: {
          "x-access-token": userToken,
        },
      });
      console.log(response);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <Card style={{ width: "100%", maxWidth: "350px", background: "#f7f7f7" }}>
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="profile-box">
              <div className="profile-picture-container">
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
  );
};

export default ProfileInfo;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NavBar from "../../navbar/NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Reviews from "../../reviews/Reviews";
import { FaEnvelope, FaStar } from "react-icons/fa";
import Footer from "../../footer/Footer";
import axios from "../../../Api/Api";
import DefaultProfile from "../../../assets/profile_pic_default.png";
import NotFound404 from "../../notfound-404/NotFound404";
import LoginModal from "../../login/LoginModal";
import { useNavigate } from "react-router-dom";

const Gig = () => {
  const { id } = useParams();
  const [gigData, setGigData] = useState({});
  const [gigNotFound, setgigNotFound] = useState(true);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const getGigData = async () => {
    let response = await axios.get(`/gigs/${id}`);
    if (response.status === 200) {
      setGigData(response.data);
      if (response.data.title == null) {
        setgigNotFound(true);
      } else {
        setgigNotFound(false);
      }
    } else {
      setGigData({});
    }
  };

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user"))["user_type"]);
    getGigData();
  }, []);

  return (
    <>
      <Container>
        <NavBar></NavBar>
        <LoginModal></LoginModal>
        {gigNotFound ? (
          <NotFound404></NotFound404>
        ) : (
          <Row className="p-3" style={{ textAlign: "left" }}>
            <Col md={7}>
              <h3
                style={{ fontWeight: "bold", textAlign: "start" }}
                className="pt-3"
              >
                {gigData.title}
              </h3>
              <hr></hr>
              <div className="seller-mini-banner">
                <img
                  src={
                    gigData.profile_picture === "" ||
                    gigData.profile_picture === null
                      ? DefaultProfile
                      : `http://localhost:4000/${gigData.profile_picture}`
                  }
                  alt="profile_pic"
                ></img>
                <span className="username">{gigData.username}</span>|&nbsp;
                <span className="level">{gigData.level} Seller</span>
                &nbsp;|&nbsp;
                <span>
                  <FaStar
                    style={{
                      marginBottom: "4px",
                      marginLeft: "3px",
                      color: "gold",
                    }}
                  ></FaStar>
                  &nbsp;64 Completed Orders
                </span>
              </div>
              <hr></hr>
              {gigData.gig_images ? (
                <Carousel
                  showArrows={true}
                  centerMode={false}
                  style={{ maxHeight: "500px" }}
                >
                  {gigData.gig_images.map((g, idx) => {
                    return (
                      <div key={idx}>
                        <img alt={g} src={`http://localhost:4000/${g}`} />
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <h2>No Images</h2>
              )}
              <hr></hr>
              <h5>About This Gig</h5>
              <p style={{ overflowWrap: "anywhere" }}>{gigData.details}</p>
              <hr></hr>
              <Reviews username={gigData.username}></Reviews>
            </Col>
            <Col md={5}>
              <div className="gig-price-container p-4">
                <div className="d-flex justify-content-between">
                  <p style={{ fontWeight: "450", fontSize: "18px" }}>
                    Starting Price
                  </p>
                  <h4>
                    <span className="price">{gigData.starting_rate}</span>
                  </h4>
                </div>
                <br></br>
                <p style={{ fontSize: "15px", color: "rgba(0,0,0,0.7)" }}>
                  <span style={{ fontWeight: "bold" }}>Please Note: </span>
                  Seller's mentioned starting price does not reflect that they
                  will work for that specified price, this only indicates that
                  they would start offers above that specific price
                </p>
                <hr></hr>
                <Row>
                  <Col md={6}>
                    <p style={{ fontWeight: "bold", color: "rgba(0,0,0,0.5)" }}>
                      Category
                    </p>
                    <p style={{ lineHeight: "0px", color: "rgba(0,0,0,0.7)" }}>
                      {gigData.category}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p style={{ fontWeight: "bold", color: "rgba(0,0,0,0.5)" }}>
                      Seller Expertise
                    </p>
                    <p style={{ lineHeight: "0px", color: "rgba(0,0,0,0.7)" }}>
                      {gigData.industry_name}
                    </p>
                  </Col>
                </Row>
                <br></br>
                {userType !== "freelancer" ? (
                  <div className="d-flex justify-content-center align-items-end">
                    <Button
                      onClick={() => {
                        navigate("/dashboard/inbox", {
                          state: {
                            to: gigData.username,
                          },
                        });
                      }}
                      variant="success"
                      className="mx-1 w-100"
                    >
                      Contact Seller 💬
                    </Button>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Gig;

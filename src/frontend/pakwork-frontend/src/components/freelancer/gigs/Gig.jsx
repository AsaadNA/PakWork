import React from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NavBar from "../../navbar/NavBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Reviews from "../../reviews/Reviews";
import { FaEnvelope, FaStar } from "react-icons/fa";
import Footer from "../../footer/Footer";

const Gig = () => {
  //Use this to access id
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Container style={{ textAlign: "left" }}>
        <NavBar></NavBar>
        <Row className="p-3">
          <Col md={7}>
            <h3
              style={{ fontWeight: "bold", textAlign: "start" }}
              className="pt-3"
            >
              I will do html, css, javascript, nodejs, development
            </h3>
            <hr></hr>
            <div className="seller-mini-banner">
              <img src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/d7de608727a04b03fd8ce4d5c664e622-1665365749459/d3bd39f9-9925-4e49-905f-0d6b64392c72.png"></img>
              <span className="username">ahsantahseen</span>|&nbsp;
              <span className="level">Level 2 Seller</span>&nbsp;|&nbsp;
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
            <Carousel showArrows={true} centerMode={false}>
              <div>
                <img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/252110108/original/68202f99bd3150cc08bf0236d69de69548ad119e/html-css-javascript-nodejs-development.png" />
              </div>
              <div>
                <img src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/a1af527292d35073115fedc5daea7bcf-1670166318/SS/html-css-javascript-nodejs-development.PNG" />
              </div>
            </Carousel>
            <hr></hr>
            <h5>About This Gig</h5>
            <p>
              Are you looking for any services related to html, css, javascript,
              nodejs? Well don't worry because you came to the right place. I
              will provide you services related to html, css, javascript and
              nodejs. My services include any sort of bugs fixing related to
              html, css, javascript. I also offer complete website or any sort
              of custom components with html, css, javascript. I also offer
              custom REST APIs using nodejs and bug fixing in nodejs
              applications.
            </p>
            <hr></hr>
            <h5>Customer Reviews</h5>
            <Reviews></Reviews>
          </Col>
          <Col md={5}>
            <div className="gig-price-container p-4">
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "450", fontSize: "18px" }}>
                  Starting Price
                </p>
                <h4>
                  <span className="price">5</span>
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
                    Web Development
                  </p>
                </Col>
                <Col md={6}>
                  <p style={{ fontWeight: "bold", color: "rgba(0,0,0,0.5)" }}>
                    Seller Expertise
                  </p>
                  <p style={{ lineHeight: "0px", color: "rgba(0,0,0,0.7)" }}>
                    Programming & Tech
                  </p>
                </Col>
              </Row>
              <br></br>
              <div className="d-flex justify-content-center align-items-end">
                <Button variant="success" className="mx-1 w-100">
                  Contact Seller 💬
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Gig;

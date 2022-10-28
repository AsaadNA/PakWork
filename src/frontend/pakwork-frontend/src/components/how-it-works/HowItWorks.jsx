import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const HowItWorks = () => {
  const Steps = [
    {
      name: "Post A Job",
      type: "Suppose you're looking for someone to build a website, you just have to go to the platform and post a job like 'Hi! I need someone to build me a website. Here are the details' and done!, within minutes you'll have offers from various freelancers",
      image:
        "https://img.icons8.com/external-flat-wichaiwi/200/000000/external-job-gig-economy-flat-wichaiwi.png",
    },
    {
      name: "Choose Freelancers",
      type: "So after you've recieved offers from our freelancers, now it's upto you to choose your dream-builder. PakWork provides statistics of the freelancers such as how many jobs they have completed and experience level, that will you in making the right decision.",
      image:
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/200/000000/external-job-human-resources-flaticons-lineal-color-flat-icons-4.png",
    },
    {
      name: "Accept Order",
      type: "Only accept the work when it has been completed and you're fully satisfied with the quality using our order system that ensures yours and the seller's safety and security. Our Ordering System will not create any hassles for you and the seller.",
      image:
        "https://img.icons8.com/external-flat-wichaiwi/200/000000/external-job-soft-power-flat-wichaiwi.png",
    },
    {
      name: "Still Need Some Support?",
      type: "If you need any assitance regarding any technical on platform, clearing the guidelines or resolving conflicts. Feel free to reach out to the Support and we'll help you out.With our professional trained support agents, you'll have a seamless experience.",
      image: "https://img.icons8.com/color/200/000000/customer-support.png",
    },
  ];
  return (
    <Row className="vh-md-100 home-section">
      <Col style={{ boxSizing: "border-box" }}>
        <h1
          style={{ marginTop: "60px", fontWeight: "bold" }}
          className="section-heading"
        >
          How does it work?
        </h1>
        <Row className="p-1">
          {Steps.map((Step) => {
            return (
              <Col md={6} lg={4} xl={3} class="m-1">
                <Card style={{ width: "100%" }} className="category-card m-1">
                  <Card.Img
                    variant="top"
                    src={Step.image}
                    className="img-fluid p-3"
                    height={"150px"}
                    width={"150px"}
                  />
                  <Card.Body style={{ textAlign: "left" }}>
                    <p
                      style={{
                        lineHeight: "5px",
                        marginTop: "15px",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {Step.name}
                    </p>
                    <p> {Step.type}</p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default HowItWorks;

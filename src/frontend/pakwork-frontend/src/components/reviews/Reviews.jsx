import React from "react";
import { Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const Reviews = [
    {
      name: "mattratliff",
      rating: "5",
      comment:
        "Very professional and timely. The communication was also spot on! I will definitely use this service again!",
    },
    {
      name: "nftinnovation",
      rating: "5",
      comment:
        "It was the second time working together and another great experience - very reliable, punctual and communicative with excellent English. Highly recommend for anything website related and look forward to working together in the future.",
    },
    {
      name: "melaniechappuis",
      rating: "2",
      comment: "Not Satisfied, Miscommunication was very noticed",
    },
    {
      name: "nftinnovation",
      rating: "5",
      comment:
        "I am super impressed, this was a great experience and an incredibly quick service. Looking forward to working together in the future again.",
    },
  ];
  return (
    <Col md={12} className="mt-2 mb-2">
      {Reviews.map((Review, i) => {
        return (
          <Card className="my-3" key={i}>
            <Card.Header
              className={
                Review.rating > 3
                  ? "d-flex justify-content-left bg-success text-light"
                  : "d-flex justify-content-left bg-danger text-light"
              }
            >
              <span style={{ fontSize: "18px", fontWeight: "500" }}>
                {Review.name}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  marginLeft: "10px",
                  marginTop: "1px",
                  fontWeight: "bold",
                }}
              >
                {Review.rating}
                <FaStar
                  style={{
                    marginBottom: "4px",
                    marginLeft: "3px",
                    color: "gold",
                  }}
                ></FaStar>
              </span>
            </Card.Header>
            <Card.Body className="d-flex justify-content-left">
              <q
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  textAlign: "left",
                }}
              >
                {Review.comment}
              </q>
            </Card.Body>
          </Card>
        );
      })}
    </Col>
  );
};

export default Reviews;

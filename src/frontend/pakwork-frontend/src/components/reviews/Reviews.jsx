import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import axios from "../../Api/Api";

const Reviews = ({ username }) => {
  let [Reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    let response = await axios.get(`orders/reviews/${username}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Col md={12} className="mt-2 mb-2" style={{ textAlign: "left" }}>
      {Reviews.length !== 0 ? (
        <h5>Recent Reviews</h5>
      ) : (
        <h5>No Recent Reviews</h5>
      )}
      {Reviews.length === 0
        ? null
        : Reviews.map((Review, i) => {
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
                    {Review.client_name}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                      marginTop: "1px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* <span
                      className="me-2"
                      style={{ fontSize: "18px", fontWeight: "500" }}
                    >
                      ({" "}
                      {Review.category === null
                        ? "Buyer Request"
                        : Review.category}{" "}
                      )
                    </span> */}
                    {Review.rating}
                    <FaStar
                      style={{
                        marginBottom: "4px",
                        marginLeft: "3px",
                        color: "gold",
                      }}
                    ></FaStar>
                  </span>
                  {/* <span
                    className="ms-2"
                    style={{ fontSize: "18px", fontWeight: "500" }}
                  >
                    #{Review.order_id}
                  </span> */}
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

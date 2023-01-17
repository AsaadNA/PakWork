import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const PopularCategory = () => {
  const Categories = [
    {
      name: "Cloud DevOps",
      type: "Programming & Tech",
    },
    {
      name: "Data Sciences",
      type: "Programming & Tech",
    },
    {
      name: "Web Development",
      type: "Programming & Tech",
    },
    {
      name: "Amazon Virtual Assitant",
      type: "Marketing & Support",
    },
    {
      name: "Video Animation",
      type: "Media & Digital Graphics",
    },
    {
      name: "Voice Over",
      type: "Media & Digital Graphics",
    },
    {
      name: "Logo Designing",
      type: "Media & Digital Graphics",
    },
    {
      name: "Wordpress Developer",
      type: "Programming & Tech",
    },
  ];
  return (
    <Row className="vh-md-100 home-section">
      <Col style={{ boxSizing: "border-box" }}>
        <h1
          style={{ marginTop: "60px", fontWeight: "bold" }}
          className="section-heading"
        >
          Popular Categories:
        </h1>
        <Row className="p-1">
          {Categories.map((Category, i) => {
            return (
              <Col md={6} lg={4} xl={3} key={i}>
                <Card
                  style={{ width: "100%", height: "190px" }}
                  className="category-card m-1"
                >
                  <Card.Body style={{ textAlign: "left" }}>
                    <p
                      style={{
                        lineHeight: "5px",
                        marginTop: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {Category.name}
                    </p>
                    <p> {Category.type}</p>
                    <p
                      className="explore-text"
                      style={{
                        marginTop: "60px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        window.location.replace(
                          `http://localhost:3000/gigs/search/%20/filter?GigCategory=${Category.name}&SortByPrice=desc&SortByRating=desc`
                        );
                      }}
                    >
                      Explore
                      <FaChevronRight className="chevron-icon-small"></FaChevronRight>
                    </p>
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

export default PopularCategory;

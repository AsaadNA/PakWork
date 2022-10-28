import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";

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
      name: "Website Development",
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
    <Row className="vh-100">
      <Row
        className="p-1 d-flex justify-content-center align-items-center"
        style={{ boxSizing: "border-box" }}
      >
        <h1
          style={{ textAlign: "left", marginTop: "60px", fontWeight: "bold" }}
        >
          Popular Categories:
        </h1>
        {Categories.map((Category) => {
          return (
            <Col md={6} lg={4} xl={3} class="m-1">
              <Card
                style={{ width: "100%", height: "190px" }}
                className="category-card"
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
    </Row>
  );
};

export default PopularCategory;

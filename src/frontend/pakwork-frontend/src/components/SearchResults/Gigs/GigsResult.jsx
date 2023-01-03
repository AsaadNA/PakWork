import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { FaEye, FaSearch, FaSlash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import NavBar from "../../navbar/NavBar";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import {
  GigJobCategories,
  SortByPrice,
  SortByRating,
} from "../../../Extras/CategoryLists";
import "./GigsResult.css";

const GigsResult = () => {
  const { search } = useParams();
  const gigs = [
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
    {
      title: "I will do html, css, javascript, nodejs, development",
      details:
        "Are you looking for any services related to html, css, javascript, nodejs? Well don't worry because you came to the right place. I will provide you services related to html, css, javascript and nodejs. My services include any sort of bugs fixing related to html, css, javascript. I also offer complete website or any sort of custom components with html, css, javascript. I also offer custom REST APIs using nodejs and bug fixing in nodejs applications.",
      category: "Web Development",
      posting_date: "2022-12-16T17:48:44.000Z",
      gig_rating: 0,
      gig_id: "UJ2sgqh8K0K5",
      freelancer_id: "hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      starting_rate: 25,
      images:
        "/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1a.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1b.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP1c.PNG,/images/gigs/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j-STEP2a.PNG",
    },
  ];

  return (
    <>
      <NavBar isGigResult={true}></NavBar>
      <Container>
        <Row>
          <Col md={12}>
            <hr></hr>
            <div className="w-100 px-1">
              <Form
                onSubmit={() => {
                  console.log("searching..");
                }}
              >
                <Row>
                  <Col md={4}>
                    <InputGroup className="mt-1">
                      <Form.Control
                        type="text"
                        placeholder="Search.."
                        className="Nav-search"
                      ></Form.Control>
                      <Button type="submit" variant="success">
                        <FaSearch style={{ marginBottom: "5px" }}></FaSearch>
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={8}>
                    <InputGroup className="mt-1 d-flex justify-content-end">
                      <div className="select-box">
                        <Select
                          options={GigJobCategories}
                          placeholder={"Category"}
                          isSearchable={true}
                          required
                          name="GigCategory"
                        />
                      </div>
                      <div className="select-box px-1">
                        <Select
                          options={SortByPrice}
                          placeholder={"Sort By Price"}
                          isSearchable={true}
                          required
                          name="GigCategory"
                          className="w-100"
                        />
                      </div>
                      <div className="select-box select-box-with-button">
                        <Select
                          options={SortByRating}
                          placeholder={"Sort By Rating"}
                          isSearchable={true}
                          required
                          name="GigCategory"
                          className="w-100"
                        />
                      </div>
                      <Button type="submit" variant="success">
                        <FaSearch style={{ marginBottom: "5spx" }}></FaSearch>
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </div>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          {gigs.map((g) => {
            let images = g.images.split(",");
            return (
              <Col
                key={g.gig_id}
                className="mt-4 d-flex justify-content-center align-items-center flex-column"
                md={3}
              >
                <Card
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    height: "305px",
                  }}
                >
                  <Card.Img
                    style={{ width: "100%", maxWidth: "100%", height: "50%" }}
                    src={`http://localhost:4000/${images[0]}`}
                  ></Card.Img>
                  <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
                    {g.title}
                  </Card.Body>
                  <Card.Footer className="d-flex flex-row  justify-content-between align-items-center">
                    <FaEye
                      className="signhover"
                      style={{
                        color: "grey",
                        marginBottom: "10px",
                        fontSize: "22px",
                      }}
                    ></FaEye>

                    <p className="text-success" style={{ fontSize: "13px" }}>
                      STARTING AT{" "}
                      <strong style={{ fontSize: "17px" }}>
                        ${g.starting_rate}
                      </strong>
                    </p>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default GigsResult;

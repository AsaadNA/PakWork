import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { FaEye, FaSearch, FaSlash, FaTypo3 } from "react-icons/fa";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import NavBar from "../../navbar/NavBar";
import Select from "react-select";
import {
  GigJobCategories,
  SortByPrice,
  SortByRating,
} from "../../../Extras/CategoryLists";
import LoginModal from "../../login/LoginModal";
import "./GigsResult.css";
import axios from "../../../Api/Api";

const GigsResult = () => {
  const isUser = localStorage.getItem("user");

  const { searchText } = useParams();

  const [inputText, setInputText] = useState("");
  const [gigs, setGigs] = useState([]);

  const [gigCategory, setGigCategory] = useState(GigJobCategories[1]); //Default Value
  const [byPrice, setByPrice] = useState(SortByPrice[0]);
  const [byRating, setByRating] = useState(SortByRating[0]);

  const searchParams = new URLSearchParams(document.location.search);

  //This will get the endpoint without the filters
  const getSearchResultWithoutFilter = async () => {
    let response = await axios.get(`/search/gigs/${searchText}`);
    if (response.status === 200) {
      setGigs(response.data);
    }
  };

  //This will get the endpoint with filters
  const getSearchResultWithFilter = async () => {
    let response = await axios.get(
      `/search/gigs/${searchText}/filter?GigCategory=${searchParams.get(
        "GigCategory"
      )}&SortByPrice=${searchParams.get(
        "SortByPrice"
      )}&SortByRating=${searchParams.get("SortByRating")}`
    );
    if (response.status === 200) {
      setGigs(response.data);
    }
  };

  useEffect(() => {
    if (
      searchParams.get("GigCategory") &&
      searchParams.get("SortByPrice") &&
      searchParams.get("SortByRating")
    ) {
      //Setting GigCateogry from combobox taken from filter query
      let sc = GigJobCategories.find((gigCat, index) => {
        if (searchParams.get("GigCategory") === gigCat.value) {
          setGigCategory(
            GigJobCategories[index] != null ? GigJobCategories[index] : ""
          );
        }
      });

      //Setting SortByPrice from combobox taken from filter query
      let sp = SortByPrice.find((gigCat, index) => {
        if (searchParams.get("SortByPrice") === gigCat.value) {
          setByPrice(SortByPrice[index] != null ? SortByPrice[index] : "");
        }
      });

      //Setting SortByRating from combobox taken from filter query
      let sr = SortByRating.find((gigCat, index) => {
        if (searchParams.get("SortByRating") === gigCat.value) {
          setByRating(SortByRating[index] != null ? SortByRating[index] : "");
        }
      });

      getSearchResultWithFilter();
    } else {
      getSearchResultWithoutFilter();
    }
  }, []);

  return (
    <>
      <NavBar isGigResult={true}></NavBar>
      {/*The Reason to include this Login Modal over here is because we didn't have the component used there
      so it was not here so we are including it here so that it can be rendered and we are only rendering it if we are logged out*/}
      {!isUser ? <LoginModal></LoginModal> : null}
      <Container>
        <Row>
          <Col md={12}>
            <hr></hr>
            <div className="w-100 px-1">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();

                  //We Replace this so that we can use SearchParams in useEffect to handle different endpoints for filtered data
                  //And USe it to fetch our filtered data from our specific endpoint
                  //We added this route to the main APP.js too
                  if (inputText.length > 0) {
                    window.location.replace(
                      `/gigs/search/${inputText}/filter?GigCategory=${gigCategory.value}&SortByPrice=${byPrice.value}&SortByRating=${byRating.value}`
                    );
                  } else {
                    window.location.replace(
                      `/gigs/search/%20/filter?GigCategory=${gigCategory.value}&SortByPrice=${byPrice.value}&SortByRating=${byRating.value}`
                    );
                  }
                }}
              >
                <Row>
                  <Col md={4}>
                    <InputGroup
                      onChange={(e) => setInputText([e.target.value])}
                      className="mt-1"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Search Gigs (title,tags)"
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
                          value={gigCategory}
                          options={GigJobCategories}
                          placeholder={"Category"}
                          isSearchable={true}
                          required
                          name="GigCategory"
                          onChange={(value) => setGigCategory(value)}
                        />
                      </div>
                      <div className="select-box px-1">
                        <Select
                          value={byPrice}
                          options={SortByPrice}
                          placeholder={"Sort By Price"}
                          isSearchable={true}
                          required
                          name="SortPrice"
                          className="w-100"
                          onChange={(value) => setByPrice(value)}
                        />
                      </div>
                      <div className="select-box select-box-with-button">
                        <Select
                          value={byRating}
                          options={SortByRating}
                          placeholder={"Sort By Rating"}
                          isSearchable={true}
                          required
                          name="SortRating"
                          className="w-100"
                          onChange={(value) => setByRating(value)}
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
          {gigs.map((g, i) => {
            let images = g.gig_images.split(",");
            return (
              <Col
                key={g.gig_id + i}
                className="mt-4 d-flex justify-content-center align-items-center flex-column"
                md={3}
              >
                <Card
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    height: "330px",
                  }}
                >
                  <Card.Img
                    style={{ width: "100%", maxWidth: "100%", height: "50%" }}
                    src={`http://localhost:4000/${images[0]}`}
                  ></Card.Img>
                  <Card.Body style={{ textAlign: "left" }}>
                    <p
                      className="clickable_link"
                      style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                      onClick={() =>
                        window.location.replace(`/gig/${g.gig_id}`)
                      }
                    >
                      {g.title}
                    </p>
                    <span
                      style={{
                        fontWeight: 550,
                        color: "rgba(0,0,0,0.7)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <FaTypo3></FaTypo3> {g.category}
                    </span>
                  </Card.Body>
                  <Card.Footer className="d-flex flex-row  justify-content-between align-items-start">
                    {/* <FaEye
                      className="signhover"
                      style={{
                        color: "grey",
                        marginBottom: "10px",
                        fontSize: "22px",
                      }}
                      onClick={() =>
                        window.location.replace(`/gig/${g.gig_id}`)
                      }
                    ></FaEye> */}
                    <div>
                      <img
                        src="http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j"
                        alt="buyer_pic"
                        className="mini_profile_pic"
                        style={{
                          height: "4vh",
                          width: "4vh",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "rgba(0,0,0,0.7)",
                        }}
                      >
                        ahsantahseen
                      </span>
                    </div>
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

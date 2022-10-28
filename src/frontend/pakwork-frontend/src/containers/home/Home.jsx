import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Container } from "react-bootstrap";
import Hero from "../../components/hero/hero";
import PopularCategory from "../../components/popular-category/PopularCategory";
import Promotional from "../../components/promotional-hero/promotional";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Hero></Hero>
        <PopularCategory></PopularCategory>
        <Promotional></Promotional>
      </Container>
    </>
  );
};

export default Home;

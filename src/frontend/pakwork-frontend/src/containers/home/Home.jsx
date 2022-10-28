import React from "react";
import NavBar from "../../components/navbar/NavBar";
import { Container } from "react-bootstrap";
import Hero from "../../components/hero/hero";
import PopularCategory from "../../components/popular-category/PopularCategory";
import Promotional from "../../components/promotional-hero/promotional";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import Footer from "../../components/footer/Footer";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const Home = () => {
  return (
    <>
      <NavBar></NavBar>
      <Container fluid>
        <Hero></Hero>
        <PopularCategory></PopularCategory>
        <Promotional></Promotional>
        <HowItWorks></HowItWorks>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;

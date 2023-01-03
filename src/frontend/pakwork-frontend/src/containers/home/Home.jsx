import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { Container } from "react-bootstrap";
import Hero from "../../components/hero/hero";
import PopularCategory from "../../components/popular-category/PopularCategory";
import Promotional from "../../components/promotional-hero/promotional";
import HowItWorks from "../../components/how-it-works/HowItWorks";
import Footer from "../../components/footer/Footer";
import { Element } from "react-scroll";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import LoginModal from "../../components/login/LoginModal";

const Home = () => {
  return (
    <>
      <NavBar isHome={true}></NavBar>
      <Container fluid>
        <LoginModal></LoginModal>
        <Element>
          <Hero></Hero>
        </Element>
        <Element name="popular-categories">
          <PopularCategory></PopularCategory>
        </Element>
        <Element name="pakwork-promo">
          <Promotional></Promotional>
        </Element>
        <Element name="how-it-works">
          <HowItWorks></HowItWorks>
        </Element>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Home;

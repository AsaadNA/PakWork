import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/pakwork_logo.svg";
import { ShowLoginModalContext } from "../../contexts/ModalContext";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";

const NavBar = () => {
  const { handleShowLogin } = useContext(ShowLoginModalContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="nav-light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt={logo} height="50px" width="150px"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-dark" style={{ fontWeight: "bold " }}>
              <Link
                to="how-it-works"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                How it works?
              </Link>
            </Nav.Link>
            <Nav.Link className="text-dark" style={{ fontWeight: "bold " }}>
              <Link
                to="popular-categories"
                spy={true}
                smooth={true}
                duration={500}
              >
                Browser Categories
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ fontWeight: "bold", color: "#006837" }}>
              <Link
                to="pakwork-promo"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Pakwork For Organizations
              </Link>
            </Nav.Link>
            <Nav.Link
              className="text-dark"
              style={{ fontWeight: "bold" }}
              onClick={handleShowLogin}
            >
              Sign In
            </Nav.Link>
            <RouterLink to="/signup/client" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginLeft: "10px", fontWeight: "bold" }}
                className="solid-green-btn"
              >
                Post a Job
              </Button>
            </RouterLink>
            <RouterLink
              to="/signup/freelancer"
              style={{ textDecoration: "none" }}
            >
              <Button
                style={{ marginLeft: "10px", fontWeight: "bold" }}
                className="hollow-green-btn mt-1 mt-md-0"
              >
                Sell Your Services
              </Button>
            </RouterLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

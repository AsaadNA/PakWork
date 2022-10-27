import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/pakwork_logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt={logo} height="50px" width="150px"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#how-it-works"
              className="text-dark"
              style={{ fontWeight: "bold " }}
            >
              How it works?
            </Nav.Link>
            <Nav.Link
              href="#categories"
              className="text-dark"
              style={{ fontWeight: "bold " }}
            >
              Browser Categories
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              href="#organization"
              style={{ fontWeight: "bold", color: "#006837" }}
            >
              Pakwork For Organizations
            </Nav.Link>
            <Nav.Link className="text-dark" style={{ fontWeight: "bold" }}>
              Sign In
            </Nav.Link>
            <Button
              style={{ marginLeft: "10px", fontWeight: "bold" }}
              className="solid-green-btn"
            >
              Post a Job
            </Button>
            <Button
              style={{ marginLeft: "10px", fontWeight: "bold" }}
              className="hollow-green-btn"
            >
              Sell Your Services
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/pakwork_logo.svg";
import { ShowLoginModalContext } from "../../contexts/ModalContext";
import { Link } from "react-scroll";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const { handleShowLogin } = useContext(ShowLoginModalContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="nav-light" variant="light">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt={logo} height="50px" width="150px"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {!localStorage.getItem("userToken") ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className="text-dark-50"
                style={{ fontWeight: "bold " }}
              >
                <Link
                  to="how-it-works"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="navlink"
                >
                  How it works?
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark-50"
                style={{ fontWeight: "bold " }}
              >
                <Link
                  to="popular-categories"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="navlink"
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
                  className="navlink"
                >
                  Pakwork For Organizations
                </Link>
              </Nav.Link>
              <Nav.Link
                className="text-dark-50 navlink-btn"
                style={{ fontWeight: "bold" }}
                onClick={handleShowLogin}
              >
                Sign In
              </Nav.Link>
              <RouterLink
                to="/signup/client"
                style={{ textDecoration: "none" }}
              >
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
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className="mx-md-2"
                style={{ fontWeight: "bold", textDecoration: "none" }}
              >
                <NavLink
                  to="/dashboard/orders"
                  className={(navData) =>
                    navData.isActive
                      ? "navlink text-dark"
                      : "navlink text-dark-50"
                  }
                  style={{ textDecoration: "none" }}
                >
                  Manage Orders
                </NavLink>
              </Nav.Link>
              <Nav.Link className="mx-md-2" style={{ fontWeight: "bold " }}>
                <NavLink
                  to="/dashboard/buyer-requests"
                  className={(navData) =>
                    navData.isActive
                      ? "navlink text-dark"
                      : "navlink text-dark-50"
                  }
                  style={{ textDecoration: "none" }}
                >
                  Buyer Requests
                </NavLink>
              </Nav.Link>
              <Nav.Link className="mx-md-2" style={{ fontWeight: "bold" }}>
                <NavLink
                  to="/dashboard/biddings"
                  className={(navData) =>
                    navData.isActive
                      ? "navlink text-dark"
                      : "navlink text-dark-50"
                  }
                  style={{ textDecoration: "none" }}
                >
                  Current Biddings
                </NavLink>
              </Nav.Link>
            </Nav>
            <Nav className="d-flex justify-content-center align-items-center">
              <Nav.Link className="text-dark-50" style={{ fontWeight: "bold" }}>
                <NavLink
                  to="/dashboard/profile"
                  className={(navData) =>
                    navData.isActive
                      ? "navlink-btn text-dark"
                      : "navlink-btn text-dark-50"
                  }
                  style={{ textDecoration: "none" }}
                >
                  <FaUser style={{ marginBottom: "4px" }}></FaUser>
                  &nbsp;Profile
                </NavLink>
              </Nav.Link>
              <Nav.Link
                className="text-dark-50"
                style={{ fontWeight: "bold" }}
                onClick={handleLogout}
              >
                <Button
                  style={{ fontWeight: "bold" }}
                  className="btn btn-danger mt-1 mt-md-0"
                >
                  Sign Out 🚀
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;

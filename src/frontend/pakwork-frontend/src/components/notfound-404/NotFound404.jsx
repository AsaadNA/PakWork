import React from "react";
import logo from "../../assets/pakwork_logo.svg";
import err_404 from "../../assets/err_404.svg";
import { Container } from "react-bootstrap";

const NotFound404 = () => {
  return (
    <Container
      fluid
      style={{
        position: "relative",
        paddingTop: "20vh",
        height: "100vh",
      }}
    >
      <img src={logo} alt="logo_pakwork" width={"25%"}></img>
      <img src={err_404} alt="logo_pakwork" width={"25%"}></img>
    </Container>
  );
};

export default NotFound404;

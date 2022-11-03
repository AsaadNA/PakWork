import React, { useContext, useEffect } from "react";
import { Button, Modal, Form, Row, Container, Col } from "react-bootstrap";
import { ShowLoginModalContext } from "../../contexts/ModalContext";
import PakworkPlusHome from "../../assets/pakwork_plus_home.svg";
import PakworkLogo from "../../assets/pakwork_logo.svg";

const LoginModal = () => {
  const { showLogin, handleCloseLogin } = useContext(ShowLoginModalContext);
  useEffect(() => {
    console.log(showLogin);
  }, [showLogin]);

  return (
    <>
      <Modal show={showLogin} onHide={handleCloseLogin} size={"lg"}>
        <Modal.Header closeButton>
          <img
            src={PakworkLogo}
            width={"150px"}
            alt={PakworkLogo}
            className="p-1"
          ></img>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="mb-3">
              <Col md={6} className="login-image-container">
                <img src={PakworkPlusHome} alt={PakworkPlusHome}></img>
              </Col>
              <Col md={6}>
                <h3 style={{ color: "#198754", fontWeight: "bold" }}>
                  Sign In To Continue
                </h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                    ></Form.Control>
                    <Form.Text className="text-muted">
                      PakWork ensures complete privacy of it's users
                    </Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    variant="success"
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Sign In
                  </Button>
                  <p
                    className="text-muted mt-2 text-center"
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    Forget Password?
                  </p>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;

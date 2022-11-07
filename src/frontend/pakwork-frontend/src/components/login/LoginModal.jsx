import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Container,
  Col,
  Alert,
} from "react-bootstrap";
import { ShowLoginModalContext } from "../../contexts/ModalContext";
import PakworkPlusHome from "../../assets/pakwork_plus_home.svg";
import PakworkLogo from "../../assets/pakwork_logo.svg";
import axios from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const LoginModal = () => {
  const { showLogin, handleCloseLogin } = useContext(ShowLoginModalContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");
  const [AlertType, setAlertType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      email: email,
      passsword: password,
    });
    try {
      let response = await axios.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        {
          "Access-Control-Expose-Headers": "x-access-token",
        }
      );
      setshowAlert(true);
      setAlertMessage(response.data.message);
      setAlertType("success");
      setloading(false);
      let token = response.headers["x-access-token"];
      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(decodeToken(token).data));
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
      setshowAlert(true);
      setAlertMessage(error.response.data.error || error.message);
      setAlertType("danger");
      setloading(false);
    }
  };

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
                <Alert key={"1"} variant={AlertType} show={showAlert}>
                  {AlertMessage}
                </Alert>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      required
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
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    variant="success"
                    className="w-100 mt-3"
                    disabled={loading}
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

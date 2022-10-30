import React, { useMemo, useState } from "react";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import countryList from "react-select-country-list";

import "bootstrap/dist/css/bootstrap.css";
import "react-phone-input-2/lib/style.css";
import PakworkLogo from "../../../assets/pakwork_logo_light.svg";

const RegularClient = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");

  const regions = [
    {
      value: "europe",
      label: "Europe",
    },
    {
      value: "oceania",
      label: "Oceania",
    },
    {
      value: "north-america",
      label: "North America",
    },
    {
      value: "middle-east",
      label: "Middle East",
    },
    {
      value: "south-america",
      label: "South America",
    },
    {
      value: "asia",
      label: "Asia",
    },
    {
      value: "africa",
      label: "Africa",
    },
  ];
  const countries = useMemo(() => countryList().getData(), []);
  const genders = [
    {
      value: "male",
      label: `👨 Male`,
    },
    {
      value: "female",
      label: `👩 Female`,
    },
  ];

  return (
    <Container fluid className="pakwork-background-blue vh-md-100">
      <Row className="d-flex justify-content-center align-items-center flex-column">
        <Col md={12} className="mt-3 mb-3 mt-xl-4">
          <img src={PakworkLogo} alt={PakworkLogo} width={250}></img>
          <p className="text-light h6">Trusted By Countless Buyers</p>
        </Col>
        <Col md={8} className="mb-3">
          <Card style={{ height: "100%", padding: "10px" }}>
            <Card.Title
              className="blue-text"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                paddingTop: "10px",
              }}
            >
              Register yourself as a Buyer!
            </Card.Title>
            <Card.Body>
              <Form style={{ textAlign: "start" }}>
                <Row>
                  <Form.Group as={Col} md={6} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      required
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={4} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      options={genders}
                      placeholder="Select Gender"
                      value={gender}
                      onChange={(value) => setGender(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formGridRegion">
                    <Form.Label>Region</Form.Label>
                    <Select
                      options={regions}
                      placeholder="Select Region"
                      value={region}
                      onChange={(value) => setRegion(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formGridCountry">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      placeholder="Select Country"
                      value={country}
                      onChange={(value) => setCountry(value)}
                    />
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={6} controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter a valid email address"
                      required
                    ></Form.Control>
                    <Form.Text>
                      Preferred Domains such as Gmail, Outlook
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      isValid={(value, country) => {
                        if (value.match(/12345/)) {
                          return (
                            "Invalid value: " + value + ", " + country.name
                          );
                        } else if (value.match(/1234/)) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                    />
                    <Form.Text>
                      Make sure that the number is associated with you
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={6} controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      required
                    ></Form.Control>
                    <Form.Text>
                      Please keep it clear and consise, for better readability
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter a secure password"
                      required
                    ></Form.Control>
                    <Form.Text>
                      Pakwork recommends having more than 10 characters, for
                      better security
                    </Form.Text>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md={12}
                    className="d-flex justify-content-center"
                  >
                    <Button type="submit" className="w-75 mt-4 blue-btn">
                      {`Register Me! 🚀`}
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegularClient;

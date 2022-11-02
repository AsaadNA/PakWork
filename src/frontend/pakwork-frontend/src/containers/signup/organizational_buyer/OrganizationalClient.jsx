import React, { useMemo, useState } from "react";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import countryList from "react-select-country-list";

import "bootstrap/dist/css/bootstrap.css";
import "react-phone-input-2/lib/style.css";
import PakworkPlusLogo from "../../../assets/pakwork_logo_plus_light.svg";

const OrganizationalClient = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [companyType, setCompanyType] = useState("");

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
      value: "product-based",
      label: `Product Based`,
    },
    {
      value: "service-based",
      label: `Service Based`,
    },
  ];

  return (
    <Container fluid className="pakwork-background-red vh-md-100">
      <Row className="d-flex justify-content-center align-items-center flex-column">
        <Col md={12} className="mt-3 mb-3 mt-xl-4">
          <img src={PakworkPlusLogo} alt={PakworkPlusLogo} width={250}></img>
          <p className="text-light h6">Trusted By Many Organizations</p>
        </Col>
        <Col md={8} className="mb-3">
          <Card style={{ height: "100%", padding: "10px" }}>
            <Card.Title
              className="red-text"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                paddingTop: "10px",
              }}
            >
              Register Your Organization 💼
            </Card.Title>
            <Card.Body>
              <Form style={{ textAlign: "start" }}>
                <Row>
                  <Form.Group as={Col} md={6} controlId="formGridCompanyName">
                    <Form.Label>Organization Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Name"
                      required
                    ></Form.Control>
                    <Form.Text>Make sure to use the offcial name</Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter a valid email address"
                      required
                    ></Form.Control>
                    <Form.Text>
                      Preferred Domains such as Gmail, Outlook or Custom Domains
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={6} controlId="formGridRegion">
                    <Form.Label>Region</Form.Label>
                    <Select
                      options={regions}
                      placeholder="Select Region"
                      value={region}
                      onChange={(value) => setRegion(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridCountry">
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
                      Make sure that the number is associated with your
                      organization
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
                </Row>
                <Row className="mt-2">
                  <Form.Group
                    as={Col}
                    md={12}
                    className="d-flex justify-content-center"
                  >
                    <Button type="submit" className="w-75 mt-4 red-btn">
                      {`Register Organization 💼`}
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

export default OrganizationalClient;

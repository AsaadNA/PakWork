import React, { useMemo, useState } from "react";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import countryList from "react-select-country-list";
import axios from "../../../Api/Api";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-phone-input-2/lib/style.css";
import PakworkLogo from "../../../assets/pakwork_logo_light.svg";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const RegularClient = () => {
  const [formSubmitted, setformSubmitted] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setuserName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [dateOfBirth, setdateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
  const [country, setCountry] = useState(countries[0]);
  const [countryState, setcountryState] = useState("");
  const [region, setRegion] = useState(regions[5]);
  const [gender, setGender] = useState(genders[0]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setformSubmitted(true);
    setLoading(true);
    console.log({
      firstName: firstName,
      lastName: lastName,
      username: userName,
      email: email,
      password: password,
      gender: gender.value,
      phone_number: phoneNumber,
      region: region.value,
      country: country.label,
      state: countryState,
    });
    if (
      firstName.length > 3 &&
      lastName.length > 3 &&
      userName.length > 5 &&
      email.length > 5 &&
      password.length >= 6 &&
      gender &&
      phoneNumber.length > 9 &&
      region &&
      countryState.length > 3 &&
      country
    ) {
      console.log({
        firstName: firstName,
        lastName: lastName,
        username: userName,
        email: email,
        password: password,
        gender: gender.value,
        phone_number: phoneNumber,
        region: region.value,
        country: country.label,
        state: countryState,
      });
      toast.success("Sending your application..", {
        position: "top-right",
        autoClose: 1500,
        toastId: "loading",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      try {
        let response = await axios.post(`/auth/register/client`, {
          first_name: firstName,
          last_name: lastName,
          username: userName,
          email: email,
          password: password,
          gender: gender.value,
          phone_number: phoneNumber,
          region: region.value,
          country: country.label,
          state: countryState,
        });

        toast.success("Email Verification Sent . Kindly Verify & Login", {
          position: "top-right",
          delay: 1000,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(response);
        setTimeout(() => {
          navigate("/");
        }, 6000);
      } catch (error) {
        console.log(error);
        toast.error(
          error.response ? error.response.data.error : error.message,
          {
            position: "top-right",
            delay: 2000,
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Complete your submission!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <Container fluid className="pakwork-background-blue vh-md-100">
      <Row className="d-flex justify-content-center align-items-center flex-column">
        <ToastContainer />
        <Col md={12} className="mt-1 mb-3 mt-xl-4">
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
              Register yourself as a buyer!
            </Card.Title>
            <Card.Body>
              <Form style={{ textAlign: "start" }} onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md={6} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                      name="firstName"
                      required
                      isInvalid={firstName.length < 3 && formSubmitted}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Name must be greater than 3 letters
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                      isInvalid={lastName.length < 3 && formSubmitted}
                      required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Name must be greater than 3 letters
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={6} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Select
                      options={genders}
                      placeholder="Select Gender"
                      isSearchable={false}
                      value={gender}
                      name="gender"
                      onChange={(value) => setGender(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridDateOfBirth">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={(e) => setdateOfBirth(e.target.value)}
                      isInvalid={dateOfBirth.length < 3 && formSubmitted}
                      required
                    ></Form.Control>
                    <Form.Text>
                      For Identification, use your offical date
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      Please Enter Correct Date
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mt-3">
                  <Form.Group as={Col} md={4} controlId="formGridRegion">
                    <Form.Label>Region</Form.Label>
                    <Select
                      options={regions}
                      placeholder="Select Region"
                      value={region}
                      name="region"
                      defaultValue={regions[0].value}
                      required
                      onChange={(value) => setRegion(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formGridCountry">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={countries}
                      placeholder="Select Country"
                      value={country}
                      defaultValue={countries[0].value}
                      name="country"
                      required
                      onChange={(value) => setCountry(value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={4} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter State/Province"
                      value={countryState}
                      onChange={(e) => setcountryState(e.target.value)}
                      name="state"
                      required
                      isInvalid={countryState.length < 3 && formSubmitted}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      State Name must be greater than 3 letters
                    </Form.Control.Feedback>
                    <Form.Text>Preferred Legal Names</Form.Text>
                  </Form.Group>
                </Row>
                <Row className="mt-1">
                  <Form.Group as={Col} md={6} controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter a valid email address"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      name="email"
                    ></Form.Control>
                    <Form.Text>
                      Preferred Domains such as Gmail, Outlook
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      inputProps={{
                        name: "phoneNumber",
                        required: true,
                      }}
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
                      value={phoneNumber}
                      onChange={(phone) => setphoneNumber(phone)}
                      name="number"
                    />
                    <Form.Text>
                      Make sure that the number is associated with you
                    </Form.Text>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <Form.Group as={Col} md={6} controlId="formGridUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={userName}
                      onChange={(e) => setuserName(e.target.value)}
                      required
                      isInvalid={userName.length < 4 && formSubmitted}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Username must be greater than 5 letters
                    </Form.Control.Feedback>
                    <Form.Text>
                      Please keep it clear and consise, for better readability
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      isInvalid={password.length <= 5 && formSubmitted}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Passwords must be greater than 6 letters
                    </Form.Control.Feedback>
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
                    {loading === false ? (
                      <Button
                        type="submit"
                        variant={"success"}
                        className="w-75 mt-4 blue-btn"
                        disabled={loading}
                      >
                        {`Register Me! 🚀`}
                      </Button>
                    ) : (
                      <Spinner
                        className="mt-3"
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
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

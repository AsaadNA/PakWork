import React, { useContext, useState } from "react";
import {
  Modal,
  Form,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import PakworkLogo from "../../../assets/pakwork_logo_plus.svg";
import { ShowEditFreelancerProfileModalContext } from "../../../contexts/ModalContext";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const EditModal = () => {
  const Industries = [
    {
      value: "Programming & Tech",
      label: `💻 Programming & Tech`,
    },
    {
      value: "Virtual Assistance",
      label: `👨🏽‍💼 Virtual Assistance`,
    },
    {
      value: "Digital Marketing",
      label: `📈 Digital Marketing`,
    },
    {
      value: "Arts & Graphic Designing",
      label: `🎨 Arts & Graphic Designing`,
    },
    {
      value: "Creative Writer",
      label: `🖊️ Creative Writer`,
    },
  ];
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyWebsite, setCompanyWebsite] = useState("");
  const [Bio, setBio] = useState("");
  const [Industry, setIndustry] = useState(Industries[0]);
  const [YearsOfExperience, setYearsOfExperience] = useState(1);
  const [linkedInLink, setlinkedInLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);

  const { showEditProfie, handleCloseFreelancerEditProfile } = useContext(
    ShowEditFreelancerProfileModalContext
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setformSubmitted(true);
    setLoading(true);
    toast.success("Processing Data..", {
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
  };
  return (
    <>
      <Modal
        show={showEditProfie}
        onHide={handleCloseFreelancerEditProfile}
        size={"xl"}
      >
        <Modal.Header closeButton>
          <img
            src={PakworkLogo}
            width={"150px"}
            alt={PakworkLogo}
            className="p-1"
          ></img>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer></ToastContainer>
          <Container>
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md={12}
                  controlId="formGridName"
                  className="mb-2"
                >
                  <Form.Label for="name" style={{ fontWeight: "bold" }}>
                    ✨ Write the name of your company?
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={CompanyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                    placeholder="Pakwork"
                    isInvalid={formSubmitted && CompanyName.length > 3}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter name more than 3 characters
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={12} controlId="formGridBio">
                  <Form.Label for="bio" style={{ fontWeight: "bold" }}>
                    ✨ Write something about your company, how would you
                    describe your company to potential sellers ?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    required
                    rows={3}
                    placeholder="Hi, We are Pakwork and we do lots of stuff.."
                    value={Bio}
                    isInvalid={Bio.length < 30 && formSubmitted}
                    minLength={30}
                    maxLength={250}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Text>
                    Be Descriptive as you can, limit is 250 characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Bio must be greater than 30 letters
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-2"
                  controlId="formGridindustry"
                >
                  <Form.Label for="industry" style={{ fontWeight: "bold" }}>
                    ✨ In Which Industry are Involved in ? This information
                    helps potential sellers to know your area of expertise
                  </Form.Label>
                  <Select
                    options={Industries}
                    placeholder="Choose your industry"
                    isSearchable={false}
                    required
                    value={Industry}
                    name="industry"
                    onChange={(value) => setIndustry(value)}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-2"
                  controlId="formGridYearsOfExperience"
                >
                  <Form.Label
                    for="YearsOfExperience"
                    style={{ fontWeight: "bold" }}
                  >
                    ✨ How many years of experience your company has in the
                    skillsets that you'll be hiring for ?
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={25}
                    isInvalid={formSubmitted && YearsOfExperience > 25}
                    step={1}
                    name="YearsOfExperience"
                    required
                    value={YearsOfExperience}
                    onChange={(e) => {
                      setYearsOfExperience(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Let's be honest here, 25 Years or less please!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-3"
                  controlId="CompanyWebsiteLink"
                >
                  <Form.Label
                    for="lCompanyWebsiteLink"
                    style={{ fontWeight: "bold" }}
                  >
                    <FaGlobe></FaGlobe> Link to your company's website
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="websiteLink"
                    placeholder="https://www.pakwork.com"
                    required
                    isInvalid={
                      formSubmitted &&
                      !CompanyWebsite.match(
                        "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)"
                      )
                    }
                    value={CompanyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid link
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-3"
                  controlId="linkedInLink"
                >
                  <Form.Label for="linkedInLink" style={{ fontWeight: "bold" }}>
                    <FaLinkedin></FaLinkedin> Link to your company's linkedIn
                    profile
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedInLink"
                    placeholder="https://www.linkedin.com/in/pakwork"
                    required
                    isInvalid={
                      formSubmitted &&
                      !linkedInLink.match(
                        "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)"
                      )
                    }
                    value={linkedInLink}
                    onChange={(e) => setlinkedInLink(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid link
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={12}
                  className="d-flex justify-content-center"
                >
                  <Button
                    type="submit"
                    variant="success"
                    className="w-75 mt-4"
                    disabled={loading}
                  >
                    {`Submit Information! 🚀`}
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModal;

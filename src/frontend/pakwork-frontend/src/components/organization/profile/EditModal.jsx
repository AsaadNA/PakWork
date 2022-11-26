import React, { useContext, useState , useEffect } from "react";
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
import { ShowEditOrganizationProfileModalContext } from "../../../contexts/ModalContext";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import axios from "../../../Api/Api";

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
  const [CompanyWebsite, setCompanyWebsite] = useState("");
  const [Bio, setBio] = useState("");
  const [Industry, setIndustry] = useState(Industries[0]);
  const [YearsOfExperience, setYearsOfExperience] = useState(1);
  const [linkedInLink, setlinkedInLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);

  const { showEditProfie, handleCloseOrganizationEditProfile } = useContext(
    ShowEditOrganizationProfileModalContext
  );

  const getProfileData = async () => {
    try {
      let userToken = localStorage.getItem("userToken");
      let response = await axios.get(`/profile`, {
        headers: {
          "x-access-token": userToken,
        },
      });

      setBio(response.data[0].bio != null ? response.data[0].bio : "");

      //Setting industry from combobox
      let idx = Industries.find((industry, index) => {
        if (response.data[0].industry_name === industry.value) {
          setIndustry(Industries[index] != null ? Industries[index] : "");
        }
      });

      setYearsOfExperience(
        response.data[0].year_experience != null
          ? response.data[0].year_experience
          : 0
      )

      setCompanyWebsite(
        response.data[0].company_website != null
          ? response.data[0].company_website
          : ""
      );

      setlinkedInLink(
        response.data[0].linkedin_link != null
          ? response.data[0].linkedin_link
          : ""
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfileData();
  } , [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformSubmitted(true);
    setLoading(true);
    
    try {
      let response = await axios.put(
        "/profile/",
        {
          bio: Bio,
          industry_name: Industry.value,
          year_experience: YearsOfExperience,
          linkedin_link: linkedInLink,
          company_website: CompanyWebsite
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("userToken").toString(),
          },
        }
      );

      if(response.status === 200) {
        setLoading(false);
        setformSubmitted(false);
        window.location.reload();
      }

    } catch(err) {
      console.log(err);
    }

  };
  return (
    <>
      <Modal
        show={showEditProfie}
        onHide={handleCloseOrganizationEditProfile}
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

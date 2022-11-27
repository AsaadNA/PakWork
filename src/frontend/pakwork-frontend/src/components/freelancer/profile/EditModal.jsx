import React, { useContext, useState, useEffect } from "react";
import axios from "../../../Api/Api";

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
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { ShowEditFreelancerProfileModalContext } from "../../../contexts/ModalContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
  const [Bio, setBio] = useState("");
  const [Industry, setIndustry] = useState(Industries[0]);
  const [YearsOfExperience, setYearsOfExperience] = useState(1);
  const [linkedInLink, setlinkedInLink] = useState("");
  const [GithubLink, setGithubLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);
  const { showEditProfie, handleCloseFreelancerEditProfile } = useContext(
    ShowEditFreelancerProfileModalContext
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
      setYearsOfExperience(
        response.data[0].year_experience != null
          ? response.data[0].year_experience
          : 0
      );

      //Setting industry from combobox
      let idx = Industries.find((industry, index) => {
        if (response.data[0].industry_name === industry.value) {
          setIndustry(Industries[index] != null ? Industries[index] : "");
        }
      });

      setGithubLink(
        response.data[0].github_link != null ? response.data[0].github_link : ""
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setformSubmitted(true);
    if (
      Bio.length >= 30 &&
      linkedInLink.length >= 21 &&
      GithubLink.length >= 16 &&
      YearsOfExperience <= 25
    ) {
      try {
        let response = await axios.put(
          "/profile/",
          {
            bio: Bio,
            industry_name: Industry.value,
            year_experience: YearsOfExperience,
            github_link: GithubLink,
            linkedin_link: linkedInLink,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("userToken").toString(),
            },
          }
        );

        if (response.status === 200) {
          setLoading(false);
          setformSubmitted(false);
          toast.success("Your Profile has been submitted", {
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
          setTimeout(() => {
            setLoading(false);
            window.location.reload();
          }, 4000);
        }
      } catch (err) {
        console.log(err);
        toast.error(err, {
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
        setLoading(false);
      }
    } else {
      toast.error("Incomplete Submission", {
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
      setLoading(false);
    }
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
                <Form.Group as={Col} md={12} controlId="formGridBio">
                  <Form.Label for="bio" style={{ fontWeight: "bold" }}>
                    ✨ Write something about yourself, how would you describe
                    yourself to potential buyers ?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    required
                    rows={3}
                    placeholder="Hi I'm Ahsan I do lots of stuff.."
                    value={Bio}
                    minLength={30}
                    maxLength={250}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                    isInvalid={Bio.length < 30 && formSubmitted}
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
                    helps potential buyers to know your area of expertise
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
                    ✨ How many years of experience you have in your skillset
                    that you'll be selling ?
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
                    isInvalid={formSubmitted && YearsOfExperience > 25}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Let's be honest here, 25 Years or less please!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-3"
                  controlId="linkedInLink"
                >
                  <Form.Label for="linkedInLink" style={{ fontWeight: "bold" }}>
                    <FaLinkedin></FaLinkedin> Link to your linkedIn profile
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedInLink"
                    placeholder="https://www.linkedin.com/in/pakwork"
                    required
                    value={linkedInLink}
                    isInvalid={formSubmitted && linkedInLink.length < 21}
                    onChange={(e) => setlinkedInLink(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid link
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={6}
                  className="mt-3"
                  controlId="GithubLink"
                >
                  <Form.Label for="GithubLink" style={{ fontWeight: "bold" }}>
                    <FaGithub></FaGithub> Link to your Github profile
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="GithubLink"
                    placeholder="https://github.com/pakwork"
                    required
                    value={GithubLink}
                    isInvalid={formSubmitted && GithubLink.length < 21}
                    onChange={(e) => {
                      setGithubLink(e.target.value);
                    }}
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

import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { ShowEditClientProfileModalContext } from "../../../contexts/ModalContext";
import { FaLinkedin } from "react-icons/fa";
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
  const [Bio, setBio] = useState("");
  const [Industry, setIndustry] = useState(Industries[0]);
  const [linkedInLink, setlinkedInLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setformSubmitted] = useState(false);
  const { showEditProfie, handleCloseClientEditProfile } = useContext(
    ShowEditClientProfileModalContext
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
    if (Bio.length >= 30 && linkedInLink.length >= 21) {
      setLoading(true);
      setformSubmitted(true);
      try {
        let response = await axios.put(
          "/profile/",
          {
            bio: Bio,
            industry_name: Industry.value,
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
        onHide={handleCloseClientEditProfile}
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
                    yourself to potential sellers ?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    required
                    rows={3}
                    placeholder="Hi I'm Ahsan I do lots of stuff.."
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
                  className="mt-3"
                  controlId="formGridindustry"
                >
                  <Form.Label for="industry" style={{ fontWeight: "bold" }}>
                    ✨ In Which Industry are Involved in ? This information
                    helps potential sellers to know your area of interest
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
                  className="mt-3"
                  controlId="linkedInLink"
                >
                  <Form.Label for="linkedInLink" style={{ fontWeight: "bold" }}>
                    <FaLinkedin></FaLinkedin> Link to your linkedIn profile,
                    This information is quite useful for sharing in terms of
                    trust
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedInLink"
                    placeholder="https://www.linkedin.com/in/pakwork"
                    required
                    isInvalid={formSubmitted && linkedInLink.length < 21}
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

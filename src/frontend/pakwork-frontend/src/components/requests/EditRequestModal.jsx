import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import PakworkLogo from "../../assets/pakwork_logo.svg";
import axios from "../../Api/Api";
import CurrencyInput from "react-currency-input-field";
import { RequestEditModalContext } from "../../contexts/ModalContext";

const EditRequestModal = () => {
  const priceLimit = 20000;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("5");

  const [formSubmitted, setformSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //Invalid Price Error
  const [ErrorMessagePrice, setErrorMessagePrice] = useState("");
  const [PriceFeedbackClass, setPriceFeedbackClass] = useState("");

  const { showEditRequestModal, handleCloseEditRequestModal, EditRequestInfo } =
    useContext(RequestEditModalContext);

  const onHandlePriceChange = (price) => {
    if (!price) {
      setPriceFeedbackClass("");
      setBudget("");
      return;
    }
    if (Number.isNaN(Number(price))) {
      setErrorMessagePrice("Please enter a valid number");
      setPriceFeedbackClass("is-invalid");
      return;
    }
    if (Number(price) > priceLimit) {
      setErrorMessagePrice(`Max Price: $${priceLimit}`);
      setPriceFeedbackClass("is-invalid");
      return;
    }
    if (Number(price) < 5) {
      setErrorMessagePrice(`Min Price: $5`);
      setPriceFeedbackClass("is-invalid");
      return;
    }
    setPriceFeedbackClass("is-valid");
    setBudget(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformSubmitted(true);
    if (
      title.length >= 25 &&
      title.length <= 80 &&
      description.length > 50 &&
      description.length <= 500 &&
      parseInt(budget) >= 5
    ) {
      try {
        let response = await axios.put(
          "/requests/",
          {
            request_id: EditRequestInfo.requestID,
            title: title,
            description: description,
            budget: budget,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("userToken"),
            },
          }
        );

        if (response.status === 200) {
          setformSubmitted(false);
          setLoading(false);
          window.location.reload();
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.message, {
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
    } else {
      toast.error("Complete Your Submission", {
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

  useEffect(() => {
    if (showEditRequestModal === true) {
      setTitle(EditRequestInfo.title);
      setDescription(EditRequestInfo.description);
      setBudget(EditRequestInfo.budget);
    }
  }, [showEditRequestModal]);

  return (
    <>
      <Modal
        show={showEditRequestModal}
        onHide={handleCloseEditRequestModal}
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
            <h2 class="line-divider ">
              <span class="span-line-divider">Edit Request Title</span>
            </h2>
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Row className="mb-1 p-2 justify-content-center">
                <Form.Group as={Col} md={8} controlId="formGridBio">
                  <Form.Control
                    as="textarea"
                    name="title"
                    required
                    rows={6}
                    placeholder="Hello I need help with this bug, please reach out to me..."
                    value={title}
                    minLength={25}
                    maxLength={80}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    isInvalid={
                      (title.length < 25 || title.length > 80) && formSubmitted
                    }
                  ></Form.Control>
                  <Form.Text>
                    Be Precise as you can, limit is 25 characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Title must be below 25 characters
                  </Form.Control.Feedback>
                </Form.Group>
                <Col md={3} className="tip-box">
                  <p style={{ fontWeight: "bold" }}>Did you know? 💡</p>
                  <p>
                    As your Job,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      the title is the most Important place{" "}
                    </span>
                    to include keywords that helps pakwork connect sellers to
                    your job post.
                  </p>
                </Col>
              </Row>
              <h2 class="line-divider ">
                <span class="span-line-divider">Request Description</span>
              </h2>
              <Row className="mb-1 p-2 justify-content-center">
                <Form.Group as={Col} md={8} controlId="formGridDescription">
                  <Form.Control
                    as="textarea"
                    name="description"
                    required
                    rows={7}
                    placeholder="I am looking for someone to fix my website bug..."
                    value={description}
                    minLength={50}
                    maxLength={500}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}  
                    isInvalid={
                      (description.length < 50 || description.length > 500) &&
                      formSubmitted
                    }
                  ></Form.Control>
                  <Form.Text>
                    Description must be more than 50 characters and less than
                    500 characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Description must be less than 500 characters
                  </Form.Control.Feedback>
                </Form.Group>
                <Col md={3} className="tip-box">
                  <p style={{ fontWeight: "bold" }}>
                    Be Descriptive as much 💡
                  </p>
                  <p>
                    Your description is the most important element of your whole
                    job. It's what sellers look at to understand what you are
                    asking, so it needs to be well-written and engaging.
                  </p>
                </Col>
              </Row>
              <h2 class="line-divider ">
                <span class="span-line-divider ">Budget</span>
              </h2>
              <Row className="ms-4 p-2 justify-content-left">
                <Form.Group
                  as={Col}
                  md={8}
                  className="mt-2"
                  controlId="formGridCategory"
                >
                  <Form.Label for="industry">
                    Enter the budget for your Request
                  </Form.Label>
                  <CurrencyInput
                    className={`form-control ${PriceFeedbackClass}`}
                    id="input-example"
                    prefix="$"
                    name="input-name"
                    placeholder="Please enter a budget"
                    defaultValue={EditRequestInfo.budget}
                    maxLength={priceLimit}
                    step={1}
                    allowDecimals={false}
                    onValueChange={(price) => onHandlePriceChange(price)}
                  />
                  <div className="invalid-feedback">{ErrorMessagePrice}</div>
                </Form.Group>
                <Col md={3} className="tip-box">
                  <p style={{ fontWeight: "bold" }}>
                    Fair and Competitive Budget 💡
                  </p>
                  <p>Enter a budget price</p>
                </Col>
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
                    {`Edit My Request! 🚀`}
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

export default EditRequestModal;

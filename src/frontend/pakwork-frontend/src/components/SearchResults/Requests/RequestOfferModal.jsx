import React from "react";
import { useContext, useState } from "react";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { RequestOfferModalContext } from "../../../contexts/ModalContext";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import axios from "../../../Api/Api";

import { ToastContainer, toast } from "react-toastify";
const RequestOfferModal = () => {
  const priceLimit = 20000;

  const {
    showRequestOfferModal,
    handleCloseRequestOfferModal,
    selectedRequestDetails,
  } = useContext(RequestOfferModalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [formSubmitted, setformSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //Invalid Price Error
  const [ErrorMessagePrice, setErrorMessagePrice] = useState("");
  const [PriceFeedbackClass, setPriceFeedbackClass] = useState("");

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setformSubmitted(true);

    try {
      let response = await axios.post(
        "/requests/offer",
        {
          requestID: selectedRequestDetails.requestID,
          title: title,
          description: description,
          amount: amount,
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
      toast.error(err.response.data.error, {
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

  const onHandlePriceChange = (price) => {
    if (!price) {
      setPriceFeedbackClass("");
      setAmount("");
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
    setAmount(price);
  };

  return (
    <>
      <Modal
        show={showRequestOfferModal}
        onHide={handleCloseRequestOfferModal}
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
              <span class="span-line-divider">Offer Title</span>
            </h2>
            {showRequestOfferModal ? (
              <Form
                onSubmit={(e) => {
                  onHandleSubmit(e);
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
                      minLength={5}
                      maxLength={25}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      isInvalid={title.length > 25 && formSubmitted}
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
                      As your Offer,{" "}
                      <span style={{ fontWeight: "bold" }}>
                        the title is the most Important place{" "}
                      </span>
                      to include keywords that helps pakwork connect sellers to
                      your offer.
                    </p>
                  </Col>
                </Row>
                <h2 class="line-divider ">
                  <span class="span-line-divider">Offer Description</span>
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
                      isInvalid={description.length > 500 && formSubmitted}
                    ></Form.Control>
                    <Form.Text>
                      Be Descriptive as you can, limit is 500 characters.
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
                      Your description is the most important element of your
                      whole job. It's what sellers look at to understand what
                      you are asking, so it needs to be well-written and
                      engaging.
                    </p>
                  </Col>
                </Row>
                <h2 class="line-divider ">
                  <span class="span-line-divider ">Offer Amount</span>
                </h2>
                <Row className="ms-4 p-2 justify-content-left">
                  <Form.Group
                    as={Col}
                    md={8}
                    className="mt-2"
                    controlId="formGridCategory"
                  >
                    <Form.Label for="industry">
                      Enter the amount for your Offer
                    </Form.Label>
                    <CurrencyInput
                      className={`form-control ${PriceFeedbackClass}`}
                      id="input-example"
                      prefix="$"
                      name="input-name"
                      placeholder="Please enter a budget"
                      defaultValue={amount}
                      maxLength={priceLimit}
                      step={1}
                      allowDecimals={false}
                      onValueChange={(price) => onHandlePriceChange(price)}
                    />
                    <div className="invalid-feedback">{ErrorMessagePrice}</div>
                  </Form.Group>
                  <Col md={3} className="tip-box">
                    <p style={{ fontWeight: "bold" }}>
                      Write something here plz :) 💡
                    </p>
                    <p>Enter a amount price</p>
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
                      {`Send My Offer! 🚀`}
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            ) : null}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestOfferModal;

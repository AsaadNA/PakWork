import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { GigModalContext } from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import { GigCategories } from "../../../Extras/CategoryLists";
import CurrencyInput from "react-currency-input-field";
import { useDropzone } from "react-dropzone";

const EditGigModal = () => {
  const priceLimit = 20000;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [GigCategory, setGigCategory] = useState("");
  const [StartingPrice, setStartingPrice] = useState("5");

  const [formSubmitted, setformSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //Invalid Price Error
  const [ErrorMessagePrice, setErrorMessagePrice] = useState("");
  const [PriceFeedbackClass, setPriceFeedbackClass] = useState("");

  const { ShowEditGigModal, handleCloseEditGigModal, EditGigID } =
    useContext(GigModalContext);

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 5,
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="dropzone-thumb"
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const onHandlePriceChange = (price) => {
    if (!price) {
      setPriceFeedbackClass("");
      setStartingPrice("");
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
    setStartingPrice(price);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <Modal
        show={ShowEditGigModal}
        onHide={handleCloseEditGigModal}
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
          <p>Editing Gig # - {EditGigID}</p>
          <ToastContainer></ToastContainer>
          <Container>
            <h2 class="line-divider ">
              <span class="span-line-divider ">Catchy Title</span>
            </h2>
            <Row className="mb-1 p-2 justify-content-center">
              <Form.Group as={Col} md={8} controlId="formGridBio">
                <Form.Control
                  as="textarea"
                  name="title"
                  required
                  rows={6}
                  placeholder="I will do something, I'm really good at..."
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
                  As your Gig storefront,{" "}
                  <span style={{ fontWeight: "bold" }}>
                    your title is the most Important place{" "}
                  </span>
                  to include keywords that buyers would likely use to search for
                  a service like yours.
                </p>
              </Col>
            </Row>
            <h2 class="line-divider ">
              <span class="span-line-divider ">Category and Pricing</span>
            </h2>
            <Row className="mb-1 p-2 justify-content-center">
              <Form.Group
                as={Col}
                md={4}
                className="mt-2"
                controlId="formGridCategory"
              >
                <Form.Label for="industry">
                  Choose Category For Your Gig From the list
                </Form.Label>
                <Select
                  options={GigCategories}
                  placeholder="Choose your gig's category"
                  isSearchable={true}
                  required
                  value={GigCategory}
                  name="GigCategory"
                  onChange={(value) => setGigCategory(value)}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md={4}
                className="mt-2"
                controlId="formGridCategory"
              >
                <Form.Label for="industry">
                  Enter Starting Price for your Gig
                </Form.Label>
                <CurrencyInput
                  className={`form-control ${PriceFeedbackClass}`}
                  id="input-example"
                  prefix="$"
                  name="input-name"
                  placeholder="Please enter a price"
                  defaultValue={StartingPrice}
                  maxLength={priceLimit}
                  step={1}
                  allowDecimals={false}
                  onValueChange={(price) => onHandlePriceChange(price)}
                />
                <div className="invalid-feedback">{ErrorMessagePrice}</div>
              </Form.Group>
              <Col md={3} className="tip-box">
                <p style={{ fontWeight: "bold" }}>Keep in mind 💡</p>
                <p>
                  Choose the category and competitive price most suitable for
                  your Gig.
                </p>
              </Col>
            </Row>
            <h2 class="line-divider ">
              <span class="span-line-divider ">Description</span>
            </h2>
            <Row className="mb-1 p-2 justify-content-center">
              <Form.Group as={Col} md={8} controlId="formGridDescription">
                <Form.Control
                  as="textarea"
                  name="description"
                  required
                  rows={7}
                  placeholder="Are you looking for services? Well then welcome to my gig. I will provide you development services related to..."
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
                <p style={{ fontWeight: "bold" }}>Be Descriptive as much 💡</p>
                <p>
                  Your description is the most important element of your whole
                  gig. It's what buyers look at to understand what you are
                  offering, so it needs to be well-written and engaging.
                </p>
              </Col>
            </Row>
            <h2 class="line-divider ">
              <span class="span-line-divider ">Images and Presentation</span>
            </h2>
            <Row className="mb-1 p-2 justify-content-center">
              <Form.Group
                as={Col}
                md={8}
                className="d-flex justify-content-center align-items-center"
              >
                <section className="container">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </section>
              </Form.Group>
              <Col md={3} className="tip-box">
                <p style={{ fontWeight: "bold" }}>
                  Show them what you can do 💡
                </p>
                <p>
                  Success begins with a great Gig image. In business,{" "}
                  <strong>
                    image is everything and first impressions count
                  </strong>
                  .When potential buyers see your Gig, a great first impression
                  is key to reeling them in.
                </p>
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
                  {`Create My Gig! 🚀`}
                </Button>
              </Form.Group>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditGigModal;
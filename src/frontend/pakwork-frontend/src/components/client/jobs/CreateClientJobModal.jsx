import React, { useContext, useState, useEffect } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import PakworkLogo from "../../../assets/pakwork_logo.svg";
import { ClientJobModalContext } from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import { GigJobCategories } from "../../../Extras/CategoryLists";
import CurrencyInput from "react-currency-input-field";
import { useDropzone } from "react-dropzone";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment, { duration } from "moment/moment";

const CreateClientJobModal = () => {
  const priceLimit = 20000;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [JobCategory, setJobCategory] = useState("");
  const [JobPrice, setJobPrice] = useState("5");
  const [StartingDate, setStartingDate] = useState(new Date().toLocaleString());
  const [EndingDate, setEndingDate] = useState(new Date().toLocaleString());
  const [Duration, setDuration] = useState(1);

  const [formSubmitted, setformSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  //Invalid Price Error
  const [ErrorMessagePrice, setErrorMessagePrice] = useState("");
  const [PriceFeedbackClass, setPriceFeedbackClass] = useState("");

  const { showCreateClientJobModal, handleCloseCreateClientJobModal } =
    useContext(ClientJobModalContext);

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
      "application/pdf": [],
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
          alt={file.name}
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEXUlEQVR4nO1bW0wUVxhe0ketvhr7Xk364os+9IXIzADOWRf1zAEaKDWNmJRGm2JCvSVibK2FeG1orcRLK1aN2FpvxbJCbREJC3htrDYlRrSNlF1QK8gu7NcctzPM0iq7MLM7s8yffK//+b/v3P5/5vwuV4JNkgqnCDLNEdysVCT0AyMhELY8071ktsuiliaR3LIsT+7fIlFgJgRCz8/PYrNcVrFAIDD9nffKrphNPAqy0ptB2LykEgeQBmB5zeHjj/XBFS17F9s/3Y3q/TWG4Yu9X2H9xo+R5ckbWQkyvf+6x/NysshPA1A7MPAUOblFWlBbd32OYDAIs+zmrd+wKO8t3XZQ1iSD/GsAOnlAzS2+kZkvXoGWP4bgewCETZMAOFNXrxfAZzphxthLksyWijJ7MxQKSQB61WCOfXNSC+ajQ414/yc8AxfBLOvxB/RnwSNTyaczNlUk9LQ64IWfm4f0wXx56KgWzCenbmgC1N2BqaY/c0wjn0HYKwKhl/WDXbzUikkhgCSzOaJM76mDSG6GmsO1/wkkJQWQ3DRTIPShOsCCRW/A23DhfwNJOQFEQotFooRU54vzl+Lq9V+eG0gqCZAmEFo+OqG523X/hYGkhACSVDhFJMoJvdOVq9air+/hmIHYXoB0mc3gyYTe4ebKHTFnc7YWIJ2xqYKsXNef9AcOHkE4HHseZ2sBBN2ez87JxzlvY9yB2FoAkdBbqpO6+oZxBcKrPtVH5Q+/awL8eA92WAHKU9XJkyf9cQcxOBhE4dslIwI09WkCdHTDBitAHsn0Wtsux02+cnuVFgQtKkFZU4Q8h38AthDgM9WJmxZgZ9UeHDn27ZjYtmt31MxHln+nRn5rh7nkjRPAkz9zIS2Y8De8DfvPofRf8hzXemwiALcWX3vVspLScRHny57PvJ589Q3zyRsqAIDy4eFhtHVcxdHa76K+w+058DUqj7dgy4mOKPDTvqKpL2rPc1S0AwMhGwqA55j3bjTBF4HPfKLIJ0yA811jE+cHXiL2fFIEGAoDzX8CpzqjwZOc9m7zr7qkC2BlMyoVrsjOyQtW7zsIu5kxqbBMB9VCaJKuAEVzEqvxQpl/8+cHpJGI92dK0gTwPYj9aowX8fxMSUkB2uwgQBiRQEdfjRNFm122gFXMEYA4KwDOFiBJOAO6+4FNrcbfAB+2Rnxb/gxoiKFCHC8au2wgQHd/ZLYm7QqwijkCEGcFwNkCxCmHkVLVoM8O1aDPKYfhlMNWMOcaJM41CCcPIE4tAKcYIk41iIQmQql1C8hU6/by+wOwi/3V49fI82f9ExBAaVcdna3zwi52+nuDmqZEQtfq+wJ4S5rV7eavt6Pa5kSZrR63ANnZBdN486HqjDclrivf/OzBdCzvBRMJHhOPLXNhrn7/d024cTKDsHm8DXWsJ3GWg6z0Cu7Fc11G2PwsNkuQFW/SScWOemFB3quGkHeNEoL3DPFn9AJRtlgL/Gk/LY6X+D8HkQ1r0Sc9gwAAAABJRU5ErkJggg=="
          }
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
      setJobPrice("");
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
    setJobPrice(price);
  };

  const handleSetTimeLine = (e, picker) => {
    setStartingDate(picker.startDate._d);
    setEndingDate(picker.endDate._d);
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userToken = localStorage.getItem("userToken");
    setformSubmitted(true);
    if (
      files.length > 0 &&
      files.length <= 4 &&
      title.length >= 25 &&
      title.length <= 80 &&
      JobCategory.value.length > 10 &&
      parseInt(JobPrice) >= 5 &&
      description.length > 50 &&
      description.length <= 500
    ) {
      try {
        setLoading(true);

        let formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", JobCategory.value);
        formData.append("starting_amount", JobPrice);

        formData.append(
          "starting_date",
          moment(StartingDate).format("YYYY-MM-DD HH:mm:ss")
        );
        formData.append(
          "ending_date",
          moment(EndingDate).format("YYYY-MM-DD HH:mm:ss")
        );

        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        formData.append("duration", Duration);

        let response = await axios.post("/jobs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": localStorage.getItem("userToken"),
          },
        });

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

  return (
    <>
      <Modal
        show={showCreateClientJobModal}
        onHide={handleCloseCreateClientJobModal}
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
              <span class="span-line-divider">Clear & Consice Title</span>
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
                    Be Precise as you can, limit is 25-80 characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Title must be greater than 25 and less than 80 characters
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
                <span class="span-line-divider">Description</span>
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
                    Be Descriptive as you can, limit is 500 characters.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Description must be more than 50 characters and less than
                    500 characters
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
                <span class="span-line-divider ">Category and Pricing</span>
              </h2>
              <Row className="mb-1 p-2 justify-content-center">
                <Form.Group
                  as={Col}
                  md={4}
                  className="mt-2"
                  controlId="formGridCategory"
                  style={{ zIndex: 2 }}
                >
                  <Form.Label for="industry">
                    Choose Category For Your Job From the list
                  </Form.Label>
                  <Select
                    options={GigJobCategories}
                    placeholder="Choose your job's category"
                    isSearchable={true}
                    required
                    value={JobCategory}
                    name="JobCategory"
                    onChange={(value) => setJobCategory(value)}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={4}
                  className="mt-2"
                  controlId="formGridCategory"
                >
                  <Form.Label for="industry">
                    Enter Price for your Job
                  </Form.Label>
                  <CurrencyInput
                    className={`form-control ${PriceFeedbackClass}`}
                    id="input-example"
                    prefix="$"
                    name="input-name"
                    placeholder="Please enter a price"
                    defaultValue={JobPrice}
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
                    Choose the category and a fair offering price most suitable
                    for your Job.
                  </p>
                </Col>
              </Row>
              <h2 class="line-divider ">
                <span class="span-line-divider ">Mention Bidding Timeline</span>
              </h2>
              <Row className="mb-1 p-2 justify-content-center">
                <Form.Group
                  as={Col}
                  md={4}
                  className="mt-2"
                  controlId="formGridCategory"
                >
                  <Form.Label for="industry">
                    Select The Bidding Period For Your Job
                  </Form.Label>
                  <div
                    className="date-picker-container"
                    style={{ position: "relative" }}
                  >
                    <DateRangePicker
                      initialSettings={{
                        timePicker: true,
                        opens: "left",
                        parentEl: ".date-picker-container",
                      }}
                      onApply={(e, picker) => handleSetTimeLine(e, picker)}
                    >
                      <input className="form-control" type="text" required />
                    </DateRangePicker>
                  </div>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md={4}
                  className="mt-2"
                  controlId="formGridCategory"
                >
                  <Form.Label for="duration">
                    Select The Duration For Your Job (Days)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={Duration}
                    onChange={(e) => setDuration([e.target.value])}
                    required
                  ></Form.Control>
                </Form.Group>
                <Col md={3} className="tip-box">
                  <p style={{ fontWeight: "bold" }}>
                    Set Your Bidding Period 💡
                  </p>
                  <p>
                    Remember to choose wisely, you won't be able to edit the
                    period later !
                  </p>
                </Col>
              </Row>
              <h2 class="line-divider ">
                <span class="span-line-divider ">Attachments</span>
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
                  {formSubmitted && files.length > 4 ? (
                    <Form.Control.Feedback type="invalid">
                      Maximum Limit For Images is 4
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Col md={3} className="tip-box">
                  <p style={{ fontWeight: "bold" }}>For a better idea💡</p>
                  <p>
                    Include any Attachments, such as{" "}
                    <strong>Sample Mockups, Documents, Source files</strong>{" "}
                    related to your project. This Helps the Seller get a
                    hands-on approach of your idea.
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
                    {`Create My Job! 🚀`}
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

export default CreateClientJobModal;

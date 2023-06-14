import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import validate from "./validate";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoginPoster from "../../assets/login_poster.svg";
import { FaPlusCircle, FaTrash, FaWindowClose } from "react-icons/fa";

class QuizForm extends Component {
  carouselRef = React.createRef();

  handleCardTrigger = (direction) => {
    console.log(this.carouselRef);
    if (this.carouselRef.current) {
      if (direction === "next") {
        this.carouselRef.current.increment();
      } else if (direction === "prev") {
        this.carouselRef.current.decrement();
      }
    }
  };

  renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="py-2">{label}</label>
      <input
        {...input}
        type={type}
        placeholder={label}
        className="form-control mb-2"
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );

  renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="py-2">{label}</label>
      <textarea
        {...input}
        type={type}
        placeholder={label}
        className="form-control mt-2"
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );

  renderSelectField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children,
  }) => (
    <div className="form-group">
      <label>{label}</label>
      <select {...input} className="form-control w-100">
        {children}
      </select>
      {touched && error && <span className="error">{error}</span>}
    </div>
  );

  renderSelectQuestionTypeField = ({
    input,
    label,
    type,
    meta: { touched, error },
    children,
  }) => (
    <div className="form-group">
      <label>{label}</label>
      <select {...input} className="form-control mt-2">
        {children}
      </select>
      {touched && error && <span className="error">{error}</span>}
    </div>
  );

  renderTextAnswers = ({ fields, question, meta: { error } }) => (
    <div>
      <Row className="d-flex">
        <Col md={10} style={{ textAlign: "left" }}>
          <Field
            name={`${question}.correctAnswer`}
            component={this.renderSelectField}
            label="Correct Answer"
          >
            <option value="">Please select correct answer</option>
            {fields.map((answer, index) => (
              <option key={index + 1} value={index + 1}>{`Answer #${
                index + 1
              }`}</option>
            ))}
          </Field>
        </Col>
        <Col
          md={2}
          className="d-flex justify-content-start align-items-center mt-4"
        >
          <button
            type="button"
            className="btn btn-primary d-flex justify-content-center align-items-center"
            onClick={() => fields.push()}
          >
            Generate Answers <FaPlusCircle className="mx-1"></FaPlusCircle>
          </button>
        </Col>
      </Row>
      {error && (
        <div className="error py-2" style={{ textAlign: "left" }}>
          {error}
        </div>
      )}
      {fields.map((answer, index) => (
        <Row key={index}>
          <Col md={10} style={{ textAlign: "left" }}>
            <Field
              name={answer}
              type="text"
              component={this.renderInputField}
              label={`Answer #${index + 1}`}
            />
          </Col>
          <Col
            md={2}
            className="d-flex justify-content-start align-items-end"
            style={{ marginBottom: "0.5em" }}
          >
            <button
              type="button"
              title="Remove Answer"
              className="btn btn-danger"
              onClick={() => fields.remove(index)}
            >
              <FaTrash className="mb-1"></FaTrash>
            </button>
          </Col>
        </Row>
      ))}
    </div>
  );

  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <ul style={{ listStyleType: "none" }}>
      <li>
        <h5>
          Click The Icon To Add Questions In Your Quiz
          <FaPlusCircle
            onClick={() => fields.push({})}
            color={"green"}
            className="mb-1 mx-2"
          ></FaPlusCircle>
          {(touched || submitFailed) && error && (
            <span className="error">{error}</span>
          )}
        </h5>
      </li>
      {fields.map((question, index) => (
        <li key={index}>
          <hr />
          <div className="d-flex justify-content-between align-items-center mt-1">
            <h4>Question #{index + 1}</h4>
            <button
              type="button"
              title="Remove Question"
              className="btn btn-danger"
              onClick={() => fields.remove(index)}
            >
              <FaWindowClose className="mb-1"></FaWindowClose>
            </button>
          </div>

          <Row className="d-flex justify-content-center align-items-center">
            <Col md={6} style={{ textAlign: "left" }}>
              <Field
                name={`${question}.question`}
                type="text"
                component={this.renderInputField}
                label="Question Title"
              />
            </Col>
            <Col md={6} style={{ textAlign: "left" }}>
              <Field
                name={`${question}.questionType`}
                component={this.renderSelectQuestionTypeField}
                label="Question Type"
              >
                <option value="">Please select a question type</option>
                <option value="text">Text</option>
              </Field>
            </Col>
          </Row>
          <FieldArray
            name={`${question}.answers`}
            component={this.renderTextAnswers}
            question={question}
            style={{ textAlign: "left" }}
          />
          <Row style={{ textAlign: "left" }}>
            <Col md={3}>
              <Field
                name={`${question}.messageForCorrectAnswer`}
                type="text"
                component={this.renderTextareaField}
                label="Message for Correct Answer"
              />
            </Col>
            <Col md={3}>
              <Field
                name={`${question}.messageForIncorrectAnswer`}
                type="text"
                component={this.renderTextareaField}
                label="Message for Incorrect Answer"
              />
            </Col>
            <Col md={3}>
              <Field
                name={`${question}.explanation`}
                type="text"
                component={this.renderTextareaField}
                label="Explanation"
              />
            </Col>
            <Col md={3}>
              <Field
                name={`${question}.point`}
                type="number"
                component={this.renderInputField}
                label="Point"
              />
            </Col>
          </Row>
        </li>
      ))}
    </ul>
  );

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Container>
        <div className="QuizForm p-4">
          <form name="quiz-form" onSubmit={handleSubmit}>
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop={true}
              autoPlay={false}
              interval={3000}
              ref={this.carouselRef}
            >
              <Card>
                <Card.Body>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col md={5} style={{ textAlign: "left" }}>
                      <h3 className="mb-3">Create Your Quiz</h3>
                      <Field
                        name="quizTitle"
                        type="text"
                        component={this.renderInputField}
                        label="Quiz Title"
                      />
                      <Field
                        name="quizSynopsis"
                        type="text"
                        component={this.renderTextareaField}
                        label="Quiz Synopsis"
                      />
                      <Button
                        className="mt-2"
                        variant="success"
                        onClick={() => {
                          this.handleCardTrigger("next");
                        }}
                      >
                        Generate Questions
                      </Button>
                    </Col>
                    <Col md={5}>
                      <img src={LoginPoster} alt="poster"></img>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <FieldArray
                    name="questions"
                    component={this.renderQuestions}
                  />
                  <div className="button-group d-flex justify-content-center align-items-start my-2">
                    <button
                      type="submit"
                      className="btn btn-primary mx-1"
                      disabled={submitting}
                    >
                      Generate Quiz
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning"
                      disabled={pristine || submitting}
                      onClick={reset}
                    >
                      Clear Values
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Carousel>
          </form>
        </div>
      </Container>
    );
  }
}

QuizForm = reduxForm({
  form: "quizForm",
  validate,
})(QuizForm);

const selector = formValueSelector("quizForm");

QuizForm = connect((state) => {
  const questions = selector(state, "questions");
  const questionType =
    questions && questions.map((question) => question.questionType);

  return { questionType: questionType };
})(QuizForm);

export default QuizForm;

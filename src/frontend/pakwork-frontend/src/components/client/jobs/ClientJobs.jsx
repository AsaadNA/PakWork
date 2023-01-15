import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  FaUser,
  FaPlus,
  FaCalendar,
  FaMapPin,
  FaAngleDoubleRight,
  FaBusinessTime,
} from "react-icons/fa";
import {
  ClientJobModalContext,
  RequestCreateModalContext,
  RequestEditModalContext,
} from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import moment from "moment/moment";

const ClientJobs = () => {
  const { handleShowCreateClientJobModal, handleShowEditClientJobModal } =
    useContext(ClientJobModalContext);

  const { handleShowCreateRequestModal, handleCloseCreateRequestModal } =
    useContext(RequestCreateModalContext);

  const { handleShowEditRequestModal, handleCloseEditRequestModal } =
    useContext(RequestEditModalContext);

  const [jobs, setJobs] = useState([]);
  const [requests, setRequests] = useState([]);

  const fetchAllJobs = async () => {
    let response = await axios.get("/jobs/", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      setJobs(response.data);
    }
  };

  const fetchAllRequests = async () => {
    let response = await axios.get("/requests/", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      setRequests(response.data);
    }
  };

  const onRequestDelete = async (requestID) => {
    try {
      let response = await axios.delete(`/requests/${requestID}`, {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      });

      if (response.status === 200) {
        let filteredRequests = requests.filter((r) => {
          return r.request_id !== requestID;
        });

        setRequests(filteredRequests);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onJobDelete = async (jobID) => {
    try {
      let response = await axios.delete(`/jobs/${jobID}`, {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      });

      if (response.status === 200) {
        let filterdJobs = jobs.filter((j) => {
          return j.job_id !== jobID;
        });

        setJobs(filterdJobs);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
    fetchAllRequests();
  }, []);

  const displayRequests = () => {
    return requests.map((r) => {
      return (
        <Col key={r.request_id} md={12} className="mb-2">
          <Card style={{ width: "100%", height: "340px" }}>
            <Card.Header
              style={{
                textAlign: "left",
                fontWeight: "bold",
                paddingTop: "15px",
              }}
              className="bg-dark text-light"
            >
              <p>
                <FaBusinessTime></FaBusinessTime> {r.title}
              </p>
            </Card.Header>
            <Card.Body style={{ textAlign: "left", fontWeight: "" }}>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Request Description:
              </p>
              <p className="text-dark-50">{r.description}</p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Posting Date:
              </p>
              <p>
                <FaCalendar color="purple"></FaCalendar>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>
                  {" "}
                  {moment
                    .utc(r.posting_date)
                    .local()
                    .format("Do MMM YYYY HH:mm:ss")}
                </span>
              </p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Budget: <span style={{ fontWeight: "400" }}>${r.budget}</span>
              </p>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-space-between align-items-center">
              <p
                onClick={() => {
                  window.location.replace(`/request/${r.request_id}`);
                }}
                className="text-success"
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                View All Offers &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
              <p
                className="text-success ms-4 me-4"
                onClick={() => {
                  handleShowEditRequestModal({
                    requestID: r.request_id,
                    title: r.title,
                    description: r.description,
                    budget: r.budget,
                  });
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                Edit Request &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>

              <p
                className="text-danger"
                onClick={() => {
                  onRequestDelete(r.request_id);
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                Delete Request &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  };

  const displayJobs = () => {
    return jobs.map((j) => {
      return (
        <Col key={j.job_id} md={12} className="mb-2">
          <Card style={{ width: "100%", height: "380px" }}>
            <Card.Header
              style={{
                textAlign: "left",
                fontWeight: "bold",
                paddingTop: "15px",
              }}
              className="bg-success text-light"
            >
              <p>
                <FaBusinessTime></FaBusinessTime> {j.title}
              </p>
            </Card.Header>
            <Card.Body style={{ textAlign: "left", fontWeight: "" }}>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Job Description:
              </p>
              <p className="text-dark-50">{j.description}</p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Post Expiry Date:
              </p>
              <p>
                <FaCalendar color="purple"></FaCalendar>&nbsp;{" "}
                <span style={{ paddingTop: "15px" }}>
                  {moment
                    .utc(j.ending_date)
                    .local()
                    .format("Do MMM YYYY HH:mm:ss")}
                </span>
              </p>
              <p
                style={{
                  lineHeight: "10px",
                  fontWeight: "bold",
                }}
              >
                Category:
              </p>
              <p>{j.category}</p>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-space-between align-items-center">
              <p
                className="text-success"
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                View All Bids &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
              <p
                onClick={() =>
                  handleShowEditClientJobModal({
                    jobID: j.job_id,
                    title: j.title,
                    description: j.description,
                    jobCategory: j.category,
                    startingAmount: j.starting_amount,
                    startDate: j.starting_date,
                    endDate: j.ending_date,
                  })
                }
                className="text-success ms-4 me-4"
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                Edit Job &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>

              <p
                onClick={() => onJobDelete(j.job_id)}
                className="text-danger"
                style={{
                  cursor: "pointer",
                  fontWeight: "",
                }}
              >
                Delete Job &nbsp;
                <FaAngleDoubleRight></FaAngleDoubleRight>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <div className="d-flex justify-space-between align-items-center">
        <h4 style={{ textAlign: "left", marginRight: "16vw" }} className="p-2">
          Your Posted Jobs & Requests
        </h4>
        <Button
          type="button"
          variant="success"
          className="d-flex me-2 mb-2 justify-content-right align-items-right"
          onClick={handleShowCreateClientJobModal}
        >
          Post A Job
          <FaPlus className="mt-1" style={{ marginLeft: "5px" }}></FaPlus>
        </Button>
        <Button
          type="button"
          variant="success"
          className="d-flex mb-2 justify-content-right align-items-right"
          onClick={handleShowCreateRequestModal}
        >
          Post A Request
          <FaPlus className="mt-1" style={{ marginLeft: "5px" }}></FaPlus>
        </Button>
      </div>
      <Row className="d-flex mt-4 justify-content-center-md align-items-center flex-column-md">
        {displayRequests()}
      </Row>

      <Row className="d-flex mt-4 justify-content-center-md align-items-center flex-column-md">
        {displayJobs()}
      </Row>
    </>
  );
};

export default ClientJobs;

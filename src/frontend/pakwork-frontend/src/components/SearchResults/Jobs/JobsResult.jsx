import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../navbar/NavBar";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { GigJobCategories, SortByPrice } from "../../../Extras/CategoryLists";
import Select from "react-select";
import JobDetailModal from "./JobDetailModal";
import { JobDetailModalContext } from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import moment from "moment/moment";
import Countdown from "react-countdown";
import { SocketContext } from "../../../contexts/socket";
import { useNavigate } from "react-router-dom";

const JobsResult = () => {
  const [jobs, setjobs] = useState([]);
  const [FilteredJobs, setFilteredJobs] = useState([]);
  const [sortState, setsortState] = useState("hightolow");
  const [showJobDetailModal, setshowJobDetailModal] = useState(false);
  const [selectedJobDetails, setselectedJobDetails] = useState();

  const socket = useContext(SocketContext);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const navigate = useNavigate();

  const fetchAllJobs = async () => {
    let response = await axios.get("/jobs/all");
    if (response.status === 200) {
      setjobs(response.data);
      setFilteredJobs(response.data);
    }
  };

  //Handles Socket Stuff
  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("invalid_bid", (data) => {
      alert(`ERR: ${data.msg}`);
    });

    //Handles incoming bids
    socket.on("bid", (data) => {
      if (jobs.length > 0 && isConnected) {
        //Update & Find the job emitted from the event
        //The Amount and the highest bidder
        let updatedJobs = jobs.map((j) => {
          if (j.job_id === data.jobID) {
            j.starting_amount = data.amount;
            j.current_highest_bidder = data.username;
          }
        });

        //Traditionlly setting the state using useState does not work
        //So we use functional function to update
        setjobs((prev) => [...prev, updatedJobs]);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("bid");
      socket.off("invalid_bid");
      socket.off("disconnect");
    };
  }, [jobs, isConnected]);

  //HANDLE BIDDING POST
  const onPostBid = async (e) => {
    let jobID = e.target.parentNode.parentNode.id;
    let userID = JSON.parse(localStorage.getItem("user"))["freelancer_id"];

    //Check if user has taken the test
    let response = await axios.get(`/jobs/${userID}/${jobID}/test-taken`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    const { status, data } = response;

    //Test not assigned or test has been taken then we can bid
    if (status === 200 && (data === "TAKEN" || data === "NOT ASSIGNED")) {
      let bidAmount = prompt(`Enter Bid Amount `);
      if (bidAmount) {
        socket.emit("bid", {
          jobID: jobID,
          amount: bidAmount,
          username: JSON.parse(localStorage.getItem("user"))["username"],
        });
      }
    }

    //Otherwise we have to take the test
    else if (status === 200 && data === "NOT TAKEN") {
      let text =
        "A test has been assigned to this job. Do you want to take the test ?";

      //If confirmed navigate to the testing page
      if (window.confirm(text) == true) {
        navigate(`/job/${jobID}/quiz`);
      }
    }
  };

  const filterDescription = (text) => {
    const tempArr = [];
    console.log(text);
    if (text.length <= 0) {
      setFilteredJobs(jobs);
    } else {
      jobs.forEach((job) => {
        if (job.title.includes(text)) {
          tempArr.push(job);
        }
      });
      setFilteredJobs(tempArr);
    }
  };
  const filterCategory = (category) => {
    let tempArr = [];
    if (category === "Show All") {
      tempArr = [...jobs];
    } else {
      jobs.forEach((job) => {
        if (job.category === category) {
          tempArr.push(job);
        }
      });
    }
    if (sortState === "hightolow") {
      tempArr.sort(
        (a, b) => parseInt(b.starting_amount) - parseInt(a.starting_amount)
      );
    } else {
      tempArr.sort(
        (a, b) => parseInt(a.starting_amount) - parseInt(b.starting_amount)
      );
    }
    setFilteredJobs(tempArr);
  };
  const sortPrice = (sortBy) => {
    let tempArr = [...FilteredJobs];
    setsortState(sortBy);
    console.log(sortBy);
    if (sortBy === "desc") {
      console.log(tempArr);
      tempArr.sort(
        (a, b) => parseInt(b.starting_amount) - parseInt(a.starting_amount)
      );
    } else {
      console.log(tempArr);
      tempArr.sort(
        (a, b) => parseInt(a.starting_amount) - parseInt(b.starting_amount)
      );
    }
    setFilteredJobs(tempArr);
  };

  const handleCloseJobDetailModal = () => {
    setshowJobDetailModal(false);
  };
  const handleOpenJobDetailModal = (jobDetails) => {
    setselectedJobDetails(jobDetails);
    setshowJobDetailModal(true);
  };

  //Custom Renderer For Our CountDown timer
  const countRenderer = ({
    props,
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      //Emit to the server to move the bid
      socket.emit("move_job_to_order", {
        jobID: props.value,
      });

      return (
        <React.Fragment>
          <td>
            <span>
              <strong>Bidding Finished</strong>
            </span>
          </td>
          <td>
            <Button disabled>Post Bid</Button>
          </td>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <td>
            <span>
              {days}d {hours}h {minutes}m {seconds}s
            </span>
          </td>
          <td>
            <Button onClick={(e) => onPostBid(e)}>Post Bid</Button>
          </td>
        </React.Fragment>
      );
    }
  };

  return (
    <>
      <JobDetailModalContext.Provider
        value={{
          handleCloseJobDetailModal,
          showJobDetailModal,
          selectedJobDetails,
        }}
      >
        <NavBar></NavBar>
        <Container>
          <JobDetailModal></JobDetailModal>
          <hr></hr>
          <Row style={{ textAlign: "left" }}>
            <Col md={12} className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="py-2">All Available Jobs</h4>
                </div>
                <div>
                  <InputGroup className="mb-1">
                    <InputGroup.Text style={{ background: "#006837" }}>
                      <FaSearch color="white"></FaSearch>
                    </InputGroup.Text>
                    <Form.Control
                      className="me-2"
                      aria-label="Search Job"
                      placeholder="Search Job..."
                      onInput={(e) => filterDescription(e.target.value)}
                    />
                    <Select
                      styles={{
                        container: (base) => ({
                          ...base,
                          flex: 1,
                        }),
                      }}
                      className="ms-2 me-2"
                      options={GigJobCategories}
                      isSearchable={false}
                      defaultValue={GigJobCategories[0]}
                      required
                      name="GigJobCategory"
                      onChange={({ value }) => filterCategory(value)}
                    />
                    <Select
                      styles={{
                        container: (base) => ({
                          ...base,
                          flex: 1,
                        }),
                      }}
                      options={SortByPrice}
                      placeholder={"Sort By Price"}
                      defaultValue={SortByPrice[0]}
                      isSearchable={false}
                      required
                      name="SortByPrice"
                      onChange={({ value }) => sortPrice(value)}
                    />
                  </InputGroup>
                </div>
              </div>
            </Col>
            <Col md={12} className="mt-4">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Posted On</th>
                    <th>Client</th>
                    <th>Request</th>
                    <th>Current Bid</th>
                    <th>Category</th>
                    <th>Project Duration</th>
                    <th>Ending Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredJobs.length > 0
                    ? FilteredJobs.map((job, i) => {
                        return (
                          <tr id={job.job_id} key={i}>
                            <td>
                              {moment
                                .utc(job.starting_date)
                                .local()
                                .format("Do MMM YYYY")}
                            </td>
                            <td>
                              <img
                                src={`http://localhost:4000/${job.profile_picture}`}
                                alt="buyer_pic"
                                className="mini_profile_pic"
                              />
                            </td>
                            <td>
                              <p
                                className="clickable_link"
                                onClick={() =>
                                  handleOpenJobDetailModal({
                                    startingTime: job.starting_date,
                                    budget: job.starting_amount,
                                    endingTime: job.ending_date,
                                    category: job.category,
                                    request: job.title,
                                    description: job.description,
                                  })
                                }
                              >
                                {job.title}
                              </p>
                            </td>
                            <td>
                              <p className="text-success">
                                ${job.starting_amount}
                              </p>
                            </td>
                            <td>
                              <p>{job.category}</p>
                            </td>
                            <td>
                              <p>{job.duration} Days</p>
                            </td>
                            <Countdown
                              value={job.job_id}
                              date={job.ending_date}
                              renderer={countRenderer}
                            />
                            {job.current_highest_bidder ===
                            JSON.parse(localStorage.getItem("user"))[
                              "username"
                            ] ? (
                              <td>
                                <span style={{ color: "green" }}>⭐</span>
                              </td>
                            ) : null}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </JobDetailModalContext.Provider>
    </>
  );
};

export default JobsResult;

import React, { useState, useEffect } from "react";
import NavBar from "../../navbar/NavBar";
import { Container, Row, Col, Table, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { GigJobCategories, SortByPrice } from "../../../Extras/CategoryLists";
import Select from "react-select";
import JobDetailModal from "./JobDetailModal";
import { JobDetailModalContext } from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import moment from "moment/moment";

const JobsResult = () => {
  const [jobs, setjobs] = useState([]);
  const [FilteredJobs, setFilteredJobs] = useState([]);
  const [sortState, setsortState] = useState("hightolow");
  const [showJobDetailModal, setshowJobDetailModal] = useState(false);
  const [selectedJobDetails, setselectedJobDetails] = useState();

  const fetchAllJobs = async () => {
    let response = await axios.get("/jobs/all");
    if (response.status === 200) {
      setjobs(response.data);
      setFilteredJobs(response.data);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

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
                    <th>Starting Amount</th>
                    <th>Ending Time</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredJobs.length > 0
                    ? FilteredJobs.map((job, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              {moment
                                .utc(job.starting_date)
                                .local()
                                .format("Do MMM YYYY HH:mm:ss")}
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
                              <p>
                                {moment
                                  .utc(job.ending_date)
                                  .local()
                                  .format("Do MMM YYYY HH:mm:ss")}
                              </p>
                            </td>
                            <td>
                              <p>{job.category}</p>
                            </td>
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

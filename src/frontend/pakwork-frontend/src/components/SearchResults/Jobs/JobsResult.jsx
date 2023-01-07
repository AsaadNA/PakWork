import React, { useState, useEffect } from "react";
import NavBar from "../../navbar/NavBar";
import { Container, Row, Col, Table, InputGroup, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { GigJobCategories, SortByPrice } from "../../../Extras/CategoryLists";
import Select from "react-select";
import JobDetailModal from "./JobDetailModal";
import { JobDetailModalContext } from "../../../contexts/ModalContext";

const JobsResult = () => {
  const [jobs, setjobs] = useState([]);
  const [FilteredJobs, setFilteredJobs] = useState([]);
  const [sortState, setsortState] = useState("hightolow");
  const [showJobDetailModal, setshowJobDetailModal] = useState(false);
  const [selectedJobDetails, setselectedJobDetails] = useState();

  useEffect(() => {
    sampleData.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    setjobs(sampleData);
    setFilteredJobs(sampleData);
  }, []);

  const filterDescription = (text) => {
    const tempArr = [];
    console.log(text);
    if (text.length <= 0) {
      setFilteredJobs(jobs);
    } else {
      jobs.forEach((job) => {
        if (job.jobRequest.includes(text)) {
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
      tempArr.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    } else {
      tempArr.sort((a, b) => parseInt(a.budget) - parseInt(b.budget));
    }
    setFilteredJobs(tempArr);
  };
  const sortPrice = (sortBy) => {
    let tempArr = [...FilteredJobs];
    setsortState(sortBy);
    if (sortBy === "hightolow") {
      tempArr.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    } else {
      tempArr.sort((a, b) => parseInt(a.budget) - parseInt(b.budget));
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
  const sampleData = [
    {
      postedOn: "11-4-2022",
      buyerPic:
        "http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      jobRequest: "I want to someone to create a website for my business.",
      budget: "30",
      duration: "10",
      category: "Web Development",
      jobDescription:
        "We cannot return a JavaScript object from a return call inside the render() method. The reason being React expects some JSX, false, null, undefined, true to render in the UI and NOT some JavaScript object that I am trying to render when I use return {orderDetails} and hence get the error as above.",
    },
    {
      postedOn: "11-5-2022",
      buyerPic:
        "http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      jobRequest: "I want to someone to create a backend api for my website.",
      budget: "120",
      duration: "5",
      category: "Web Development",
      jobDescription:
        "We cannot return a JavaScript object from a return call inside the render() method. The reason being React expects some JSX, false, null, undefined, true to render in the UI and NOT some JavaScript object that I am trying to render when I use return {orderDetails} and hence get the error as above.",
    },
    {
      postedOn: "11-5-2022",
      buyerPic:
        "http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      jobRequest: "I want to someone to create a logo for my shop.",
      budget: "20",
      duration: "5",
      category: "Logo Designing",
      jobDescription:
        "We cannot return a JavaScript object from a return call inside the render() method. The reason being React expects some JSX, false, null, undefined, true to render in the UI and NOT some JavaScript object that I am trying to render when I use return {orderDetails} and hence get the error as above.",
    },
  ];
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
          <Row style={{ textAlign: "left" }}>
            <Col md={12}>
              <hr></hr>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="py-2">Available Jobs</h4>
                </div>
                <div>
                  <InputGroup className="mb-1">
                    <InputGroup.Text style={{ background: "#006837" }}>
                      <FaSearch color="white"></FaSearch>
                    </InputGroup.Text>
                    <Form.Control
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
              <hr></hr>
            </Col>
            <Col md={12}>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Posted On</th>
                    <th>Buyer</th>
                    <th>Request</th>
                    <th>Budget</th>
                    <th>Duration</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredJobs.map((job, i) => {
                    return (
                      <tr key={i}>
                        <td>{job.postedOn}</td>
                        <td>
                          <img
                            src={job.buyerPic}
                            alt="buyer_pic"
                            className="mini_profile_pic"
                          />
                        </td>
                        <td>
                          <p
                            className="clickable_link"
                            onClick={() =>
                              handleOpenJobDetailModal({
                                postedOn: job.postedOn,
                                budget: job.budget,
                                duration: job.duration,
                                category: job.category,
                                request: job.jobRequest,
                                description: job.jobDescription,
                              })
                            }
                          >
                            {job.jobRequest}
                          </p>
                        </td>
                        <td>
                          <p className="text-success">${job.budget}</p>
                        </td>
                        <td>
                          <p>{job.duration} Days</p>
                        </td>
                        <td>
                          <p>{job.category}</p>
                        </td>
                      </tr>
                    );
                  })}
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

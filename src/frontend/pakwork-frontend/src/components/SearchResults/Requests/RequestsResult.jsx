import React, { useState, useEffect } from "react";
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
import { SortByPrice } from "../../../Extras/CategoryLists";
import Select from "react-select";
import {
  RequestDetailModalContext,
  RequestOfferModalContext,
} from "../../../contexts/ModalContext";
import axios from "../../../Api/Api";
import moment from "moment/moment";
import RequestDetailModal from "./RequestDetailModal";
import RequestOfferModal from "./RequestOfferModal";
import { useNavigate } from "react-router-dom";

const RequestsResult = () => {
  const [requests, setRequests] = useState([]);
  const [FilteredRequests, setFilteredRequests] = useState([]);
  const [sortState, setsortState] = useState("hightolow");

  const [showRequestDetailModal, setshowRequestDetailModal] = useState(false);
  const [selectedRequestDetails, setselectedRequestDetails] = useState();
  const [showRequestOfferModal, setshowRequestOfferModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseRequestDetailModal = () => {
    setshowRequestDetailModal(false);
  };

  const handleOpenRequestDetailModal = (requestDetails) => {
    setselectedRequestDetails(requestDetails);
    setshowRequestDetailModal(true);
  };

  const handleCloseRequestOfferModal = () => {
    setshowRequestOfferModal(false);
  };

  const handleOpenRequestOfferModal = (requestDetails) => {
    setselectedRequestDetails(requestDetails);
    setshowRequestOfferModal(true);
  };

  const fetchAllRequests = async () => {
    let response = await axios.get("/requests/freelancer", {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });
    if (response.status === 200) {
      setRequests(response.data);
      let tempArr = response.data;
      tempArr.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
      setFilteredRequests(tempArr);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const filterDescription = (text) => {
    const tempArr = [];
    //console.log(text);
    if (text.length <= 0) {
      setFilteredRequests(requests);
    } else {
      requests.forEach((job) => {
        if (job.title.includes(text)) {
          tempArr.push(job);
        }
      });
      setFilteredRequests(tempArr);
    }
  };
  const filterCategory = () => {
    let tempArr = [];

    if (sortState === "desc") {
      tempArr.sort(
        (a, b) => parseInt(b.starting_amount) - parseInt(a.starting_amount)
      );
    } else {
      tempArr.sort(
        (a, b) => parseInt(a.starting_amount) - parseInt(b.starting_amount)
      );
    }
    setFilteredRequests(tempArr);
  };
  const sortPrice = (sortBy) => {
    let tempArr = [...FilteredRequests];
    setsortState(sortBy);

    if (sortBy === "desc") {
      tempArr.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    } else {
      tempArr.sort((a, b) => parseInt(a.budget) - parseInt(b.budget));
    }
    setFilteredRequests(tempArr);
  };

  return (
    <>
      <RequestDetailModalContext.Provider
        value={{
          handleCloseRequestDetailModal,
          showRequestDetailModal,
          selectedRequestDetails,
        }}
      >
        <RequestOfferModalContext.Provider
          value={{
            handleCloseRequestOfferModal,
            showRequestOfferModal,
            selectedRequestDetails,
          }}
        >
          <NavBar></NavBar>
          <Container>
            <RequestDetailModal></RequestDetailModal>
            <RequestOfferModal></RequestOfferModal>
            <hr></hr>
            <Row style={{ textAlign: "left" }}>
              <Col md={12} className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="py-2">All Available Requests</h4>
                  </div>
                  <div>
                    <InputGroup className="mb-1">
                      <InputGroup.Text style={{ background: "#006837" }}>
                        <FaSearch color="white"></FaSearch>
                      </InputGroup.Text>
                      <Form.Control
                        className="me-2"
                        aria-label="Search Requests"
                        placeholder="Search Requests"
                        onInput={(e) => filterDescription(e.target.value)}
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
                        onChange={({ value }) => {
                          sortPrice(value);
                        }}
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
                      <th>Budget</th>
                      <th>Project Duration</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {FilteredRequests.length > 0
                      ? FilteredRequests.map((request, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                {moment
                                  .utc(request.posting_date)
                                  .local()
                                  .format("Do MMM YYYY")}
                              </td>
                              <td>
                                <img
                                  src={`http://localhost:4000/${request.profile_picture}`}
                                  alt="buyer_pic"
                                  className="mini_profile_pic"
                                />
                              </td>
                              <td>
                                <p
                                  className="clickable_link"
                                  onClick={() =>
                                    handleOpenRequestDetailModal({
                                      posting_date: request.posting_date,
                                      title: request.title,
                                      description: request.description,
                                      budget: request.budget,
                                    })
                                  }
                                >
                                  {request.title}
                                </p>
                              </td>
                              <td>
                                <p className="text-success">
                                  ${request.budget}
                                </p>
                              </td>
                              <td>
                                <p>{request.duration} Days</p>
                              </td>
                              <td>
                                {request.already_sent ? (
                                  <Button disabled variant="success">
                                    Already Sent
                                  </Button>
                                ) : (
                                  <div>
                                    <Button
                                      onClick={() =>
                                        handleOpenRequestOfferModal({
                                          requestID: request.request_id,
                                        })
                                      }
                                      variant="success"
                                    >
                                      Send Offer
                                    </Button>
                                  </div>
                                )}
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
        </RequestOfferModalContext.Provider>
      </RequestDetailModalContext.Provider>
    </>
  );
};

export default RequestsResult;

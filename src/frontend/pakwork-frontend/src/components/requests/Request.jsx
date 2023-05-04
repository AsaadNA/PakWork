import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavBar from "../navbar/NavBar";
import axios from "../../Api/Api";
import NotFound404 from "../notfound-404/NotFound404";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
const Request = () => {
  const { requestID } = useParams();
  const [requestData, setRequestData] = useState({});
  const [requestNotFound, setRequestNotFound] = useState(false);

  const fetchOffers = async () => {
    let response = await axios.get(`/requests/offers/${requestID}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      setRequestData(response.data);
    }
  };

  const navigate = useNavigate();

  const onOfferAccepted = async (offerData) => {
    let result = await axios.put(
      "/requests/offer/accept",
      {
        requestID,
        offerData,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }
    );

    if (result.status === 200) {
      navigate("/dashboard/orders");
    }
  };

  const onOfferDelete = async (requestOfferID) => {
    let response = await axios.delete(`/requests/offers/${requestOfferID}`, {
      headers: {
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (response.status === 200) {
      const filteredData = requestData.filter((r) => {
        return r.request_offer_id !== requestOfferID;
      });

      setRequestData(filteredData);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <>
      <Container>
        <NavBar></NavBar>
        {requestNotFound ? (
          <NotFound404></NotFound404>
        ) : (
          <Row style={{ textAlign: "left" }}>
            <Col md={12} className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="py-2">All Available Offers</h4>
                </div>
              </div>
            </Col>
            <Col md={12} className="mt-4">
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Freelancer</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.length > 0
                    ? requestData.map((r) => {
                        return (
                          <tr key={r.request_offer_id}>
                            <td>
                              <p className="clickable_link">{r.title}</p>
                            </td>
                            <td>
                              <img
                                src={`http://localhost:4000/${r.profile_picture}`}
                                alt="buyer_pic"
                                className="mini_profile_pic"
                              />
                              <span> {r.username}</span>
                            </td>
                            <td>${r.amount}</td>
                            <td>
                              <Button
                                variant="success"
                                onClick={() => {
                                  onOfferAccepted(r);
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                className="ms-2"
                                onClick={() => {
                                  onOfferDelete(r.request_offer_id);
                                }}
                                variant="danger"
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Request;

import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { GigModalContext } from "../../../contexts/ModalContext";
import "./Gigs.css";
import axios from "../../../Api/Api";

const Gigs = () => {
  const { handleShowCreateGigModal, handleShowEditGigModal } =
    useContext(GigModalContext);

  const [gigs, setGigs] = useState([]);
  const getGigInfo = async () => {
    try {
      let userToken = localStorage.getItem("userToken");
      let response = await axios.get("/gigs/", {
        headers: {
          "x-access-token": userToken,
        },
      });

      setGigs(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onGigDelete = async (gigID) => {
    try {
      let response = await axios.delete(`/gigs/${gigID}`, {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      });

      if (response.status === 200) {
        let filteredGigs = gigs.filter((g) => {
          return g.gig_id !== gigID;
        });

        setGigs(filteredGigs);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getGigInfo();
  }, []);

  const displayGigs = () => {
    return gigs.map((g) => {
      let images = g.images.split(",");
      return (
        <Col key={g.gig_id} className="mt-4" md={4}>
          <Card style={{ width: "100%", maxWidth: "320px", height: "305px" }}>
            <Card.Img
              style={{ width: "100%", maxWidth: "100%", height: "50%" }}
              src={`http://localhost:4000/${images[0]}`}
            ></Card.Img>
            <Card.Body style={{ textAlign: "left", fontWeight: "bold" }}>
              {g.title}
            </Card.Body>
            <Card.Footer className="d-flex flex-row  justify-content-end align-items-center">
              <FaEye
                className="signhover"
                style={{
                  color: "grey",
                  marginBottom: "10px",
                  fontSize: "22px",
                }}
                onClick={() => window.location.replace(`/gig/${g.gig_id}`)}
              ></FaEye>
              <FaEdit
                className="signhover ms-2"
                style={{
                  marginBottom: "12px",
                  fontSize: "20px",
                  color: "grey",
                }}
                onClick={() =>
                  handleShowEditGigModal({
                    gigID: g.gig_id,
                    title: g.title,
                    description: g.details,
                    gigCategory: g.category,
                    startingPrice: g.starting_rate,
                  })
                }
              ></FaEdit>

              <FaTrash
                className="signhover ms-2"
                style={{
                  marginRight: "33.5%",
                  color: "grey",
                  marginBottom: "12px",
                  fontSize: "15px",
                }}
                onClick={() => onGigDelete(g.gig_id)}
              ></FaTrash>
              <p className="text-success" style={{ fontSize: "13px" }}>
                STARTING AT{" "}
                <strong style={{ fontSize: "17px" }}>${g.starting_rate}</strong>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  };

  return (
    <>
      <Row className="d-flex mt-4 justify-content-center-md align-items-center flex-column-md">
        {displayGigs()}
        <Col className="mt-4" md={4}>
          <Card style={{ width: "100%", maxWidth: "320px", height: "305px" }}>
            <FaPlus
              className="signhover m-auto align-self-center"
              style={{ color: "grey", marginBottom: "15px", fontSize: "100px" }}
              onClick={handleShowCreateGigModal}
            ></FaPlus>
          </Card>
        </Col>
      </Row>
      <hr className="mt-4"></hr>
    </>
  );
};

export default Gigs;

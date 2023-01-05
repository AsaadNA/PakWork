import React from "react";
import NavBar from "../../navbar/NavBar";
import { Container, Row, Col, Table } from "react-bootstrap";

const JobsResult = () => {
  const sampleData = [
    {
      postedOn: "11-4-2022",
      buyerPic:
        "http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      jobRequest: "I want to someone to create a website for my business.",
      budget: "30",
      duration: "10",
    },
    {
      postedOn: "11-5-2022",
      buyerPic:
        "http://localhost:4000//images/profiles/hi1oSZYmbbGcjt1Ix7VODR4UYGhMJOfxmliGaY6Kd0O8j",
      jobRequest: "I want to someone to create a backend api for my website.",
      budget: "120",
      duration: "5",
    },
  ];
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Row style={{ textAlign: "left" }}>
          <Col md={12}>
            <hr></hr>
            <div>
              <h4 className="py-2">Availible Jobs</h4>
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
                </tr>
              </thead>
              <tbody>
                {sampleData.map((job, i) => {
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
                          onClick={() => alert("Open Job Detail Modal")}
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
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobsResult;

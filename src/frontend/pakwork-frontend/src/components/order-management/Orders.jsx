import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "../../Api/Api";
import moment from "moment/moment";
import { toSentenceCase } from "../../Extras/HelperFunctions";
import Select from "react-select";
import {
  GigJobCategories as JobCategories,
  SortByPrice,
  SortByStatus,
} from "../../Extras/CategoryLists";
import { FaSearch } from "react-icons/fa";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [userType, setUserType] = useState("");
  const [InputText, setInputText] = useState("");
  const [jobCategory, setjobCategory] = useState("show_all");
  const [FilteredOrders, setFilteredOrders] = useState([]);
  const [sortState, setsortState] = useState("hightolow");

  const fetchOrders = async () => {
    let result = await axios.put(
      "/orders/",
      {
        tokenData: JSON.parse(localStorage.getItem("user")),
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("userToken"),
        },
      }
    );

    if (result.status === 200) {
      console.log(result.data);
      setOrders(result.data);
      setFilteredOrders(result.data);
    }
  };

  useEffect(() => {
    setUserType(JSON.parse(localStorage.getItem("user"))["user_type"]);
    fetchOrders();
  }, []);

  const filterTitle = (text) => {
    const tempArr = [];
    console.log(text);
    if (text.length <= 0) {
      setFilteredOrders(Orders);
    } else {
      Orders.forEach((job) => {
        if (job.title.includes(text)) {
          tempArr.push(job);
        }
      });
      setFilteredOrders(tempArr);
    }
  };
  const filterCategory = (category) => {
    let tempArr = [];
    if (category === "Show All") {
      tempArr = [...Orders];
    } else {
      Orders.forEach((order) => {
        if (order.category === category) {
          tempArr.push(order);
        }
      });
    }
    if (sortState === "hightolow") {
      tempArr.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));
    } else {
      tempArr.sort((a, b) => parseInt(a.amount) - parseInt(b.amount));
    }
    setFilteredOrders(tempArr);
  };
  const sortPrice = (sortBy) => {
    let tempArr = [...FilteredOrders];
    setsortState(sortBy);
    console.log(sortBy);
    if (sortBy === "desc") {
      console.log(tempArr);
      tempArr.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));
    } else {
      console.log(tempArr);
      tempArr.sort((a, b) => parseInt(a.amount) - parseInt(b.amount));
    }
    setFilteredOrders(tempArr);
  };
  const sortStatus = (status) => {
    let tempArr = [];
    Orders.forEach((order) => {
      if (order.order_status === status) {
        tempArr.push(order);
      }
    });
    setFilteredOrders(tempArr);
  };
  return (
    <Container>
      <NavBar></NavBar>
      <Row className="mt-4">
        <Col md={12}>
          <InputGroup className="mb-1">
            <InputGroup.Text style={{ background: "#006837" }}>
              <FaSearch color="white"></FaSearch>
            </InputGroup.Text>
            <Col md={5}>
              <Form.Control
                className="me-2"
                aria-label="Search Job"
                placeholder="Search Job..."
                onInput={(e) => filterTitle(e.target.value)}
              />
            </Col>
            <Select
              styles={{
                container: (base) => ({
                  ...base,
                  flex: 1,
                }),
              }}
              className="ms-2 me-2"
              options={JobCategories}
              isSearchable={false}
              defaultValue={JobCategories[0]}
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
            <Select
              styles={{
                container: (base) => ({
                  ...base,
                  flex: 1,
                }),
              }}
              options={SortByStatus}
              placeholder={"Sort By Status"}
              defaultValue={SortByStatus[0]}
              isSearchable={false}
              required
              name="SortByStatus"
              onChange={({ value }) => sortStatus(value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="p-3">
          <Table style={{ textAlign: "left" }}>
            <thead>
              <tr>
                <th>Title</th>
                {userType === "freelancer" ? (
                  <th>Client</th>
                ) : (
                  <th>Fulfilled By</th>
                )}
                <th>Amount</th>
                <th>Order Status</th>
                <th>Category</th>
                <th>Due Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {FilteredOrders.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td>{order.title}</td>
                    <td>
                      <div className="seller-mini-banner">
                        <img
                          src={`http://localhost:4000/${order.profile_picture}`}
                          alt="buyer_pic"
                        ></img>
                        <span
                          style={{ paddingLeft: "10px", fontWeight: "bold" }}
                        >
                          {order.username
                            ? order.username
                            : order.freelancer_username}
                        </span>
                      </div>
                    </td>
                    <td>${order.amount}</td>
                    <td>
                      {order.order_status === "Delivered" ? (
                        <p className="order-status-badge-delivered">
                          {toSentenceCase(order.order_status)}
                        </p>
                      ) : order.order_status === "Overdue" ? (
                        <p className="order-status-badge-overdue">
                          {toSentenceCase(order.order_status)}
                        </p>
                      ) : (
                        <p className="order-status-badge-progress">
                          {toSentenceCase(order.order_status)}
                        </p>
                      )}
                    </td>
                    {!order.category ? (
                      <td>
                        <strong>Buyer Request</strong>
                      </td>
                    ) : (
                      <td>{order.category}</td>
                    )}
                    <td>
                      {moment
                        .utc(order.ending_date)
                        .local()
                        .format("Do MMM YYYY")}
                    </td>
                    <td>
                      <NavLink
                        to={`/dashboard/orders/${order.order_id}`}
                        className="navlink"
                        style={{ fontWeight: "bold" }}
                      >
                        View Details
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;

import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <Form
      className="d-flex"
      onSubmit={() => {
        console.log("searching..");
      }}
    >
      <InputGroup className="mt-1">
        <Form.Control
          type="text"
          placeholder="Search.."
          className="Nav-search"
        ></Form.Control>
        <Button
          type="submit"
          variant="success"
          // style={{ marginLeft: "2%" }}
        >
          <FaSearch style={{ marginBottom: "5px" }}></FaSearch>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

/*

     THIS SEARCH BAR WILL ONLY BE USED FOR THE NAVBAR TO SEARCH FOR GIGS

    - GIG RESULT WILL HAVE ITS OWN IMPLEMENTATION
    - AVAILABLE JOBS WILL HAVE IT'S OWN

*/

const SearchBar = () => {
  const [inputText, setInputText] = useState("");

  return (
    <Form
      className="d-flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputText.length > 0) {
          window.location.replace(`/gigs/search/${inputText}`);
        }
      }}
    >
      <InputGroup onChange={(e) => setInputText([e.target.value])}>
        <Form.Control
          type="text"
          placeholder="Search Gigs"
          className="Nav-search"
        ></Form.Control>
        <Button type="submit" variant="success">
          <FaSearch style={{ marginBottom: "5px" }}></FaSearch>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;

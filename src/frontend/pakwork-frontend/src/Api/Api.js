import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": `application/json`,
  },
});

export default instance;

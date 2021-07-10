import axios from "axios";

const http = axios.create({
  baseURL: "http://app:3000/api",
});
export default http;

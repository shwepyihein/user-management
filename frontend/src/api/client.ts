import axios from "axios";

const API_ENDPOINT = "http://139.59.225.230/api";

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export { client };

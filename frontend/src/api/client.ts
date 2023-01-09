import axios from "axios";

const API_ENDPOINT = "http://localhost:8000";

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export { client };

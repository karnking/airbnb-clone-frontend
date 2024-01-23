import axios from "axios";

const instance = axios.create({
  baseURL: "https://airbnb-depr.onrender.com/",
  withCredentials: true,
});

export default instance;

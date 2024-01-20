import axios from "axios";

const instance = axios.create({
  baseURL: "https://airbnb-clone-p8wh.onrender.com",
  withCredentials: true,
});

export default instance;

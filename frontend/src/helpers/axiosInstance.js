import axios from "axios";
import { BASE_URL } from "../constants.js";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

const storedToken = localStorage.getItem("accessToken");
if (storedToken) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
}

export default axiosInstance;

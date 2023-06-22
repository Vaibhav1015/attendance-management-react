import axiosAPI from "axios";
import config from "./config";

// Axios call to get authorized
const axiosClient = axiosAPI.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

(function () {
  let authToken = localStorage.getItem("token");
  if (authToken !== null) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
})();

export default axiosClient;

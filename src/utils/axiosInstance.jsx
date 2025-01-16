import axios from "axios";
import { Store } from "../reduxstate/Store";
import { setAccessToken } from "../reduxstate/TokenSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Store.getState().token.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.url.includes("/api/v1/auth/refreshToken")) {
      config.headers.isRefreshToken = "true";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    var data = error.response.data;
    if (data["message"] && data["message"].includes("JWT expired")) {
      await refreshToken();
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  await axiosInstance
    .get("/api/v1/auth/refreshToken")
    .then((response) => {
      if (response.status === 200) {
        Store.dispatch(setAccessToken(response.data.accessToken));
      }
    })
    .catch(() => {});
};

export default axiosInstance;

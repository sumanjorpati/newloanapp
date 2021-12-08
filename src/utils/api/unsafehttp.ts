import { ROUTES } from "@utils/routes";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const unsafehttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT, // TODO: take this api URL from env
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
unsafehttp.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Change response data/error here
unsafehttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === "PICKBAZAR_ERROR.NOT_AUTHORIZED")
    ) {
      Cookies.remove("AUTH_CRED");
      Router.push(ROUTES.LOGIN);
    }
    return Promise.reject(error);
  }
);

export default unsafehttp;

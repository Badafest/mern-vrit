import axios from "axios";
import { AxiosHeaders } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface IExtendedHeaders extends AxiosHeaders {
  authorization: string;
}

instance.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem("access_token");
    (config.headers as IExtendedHeaders)[
      "authorization"
    ] = `Bearer ${access_token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error.response.status === 401 &&
      error.response.data.error === "jwt expired"
    ) {
      const token = localStorage.getItem("refresh_token");
      const { data } = await instance.post("/user/refresh_tokens", {
        refresh_token: token,
      });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      return await instance.request(error.config);
    }
    throw error;
  }
);

export default instance;

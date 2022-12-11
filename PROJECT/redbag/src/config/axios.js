import axios from "axios";
import vars from "./vars";

const instance = axios.create({
  baseURL: vars.API_URI,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.error === "jwt expired"
    ) {
      const token = localStorage.getItem("refresh_token");
      const { data } = await instance.post("/auth/refresh", {
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

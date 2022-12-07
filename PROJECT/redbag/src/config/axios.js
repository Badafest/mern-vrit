import axios from "axios";

const API_URI = ENV.API_URI;
console.log(API_URI);

const instance = axios.create({
  baseURL: API_URI,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = access_token;
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
    }
    throw error;
  }
);

export default instance;

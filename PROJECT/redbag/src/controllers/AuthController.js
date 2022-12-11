import axios from "../config/axios";

const AuthController = {
  register: async (username, password, email) => {
    try {
      const { data } = await axios.post("/auth/register", {
        username,
        password,
        email,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  login: async (username, password) => {
    try {
      const { data } = await axios.post("/auth/login", { username, password });
      return data;
    } catch (error) {
      throw new Error(error.response.data.error || error.message);
    }
  },

  resetPassword: async (username, email) => {
    try {
      const { data } = await axios.post("/auth/reset_password", {
        username,
        email,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.error || error.message);
    }
  },

  authGoogle: async (id_token) => {
    try {
      const { data } = await axios.post("/auth/google_auth", {
        id_token,
      });
      return data;
    } catch (error) {
      throw new Error(error.response.data.error || error.message);
    }
  },
};

export default AuthController;

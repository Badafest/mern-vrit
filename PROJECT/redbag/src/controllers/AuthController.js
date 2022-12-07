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
      return error.response.data;
    }
  },

  login: async (username, password) => {
    try {
      const { data } = await axios.post("/auth/login", { username, password });
      return data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default AuthController;

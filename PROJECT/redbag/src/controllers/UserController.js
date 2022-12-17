import axios from "../config/axios";
import { readFile } from "../helpers";

const UserController = {
  setAvatar: async (file) => {
    try {
      const image = await readFile(file);
      const { data } = await axios.post("/user/set_avatar", { image });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  delAvatar: async () => {
    try {
      const { data } = await axios.patch("/user/del_avatar");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  getUserData: async () => {
    try {
      const { data } = await axios.get("/user/me");
      return { email: data.user.email, role: data.user.role };
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },
};

export default UserController;

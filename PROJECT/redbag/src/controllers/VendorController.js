import axios from "../config/axios";

const VendorController = {
  add: async (name, location, email, phone) => {
    try {
      const { data } = await axios.post("/vendor/add", {
        name,
        location,
        email,
        phone,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  edit: async (name, new_name, new_location, new_email, new_phone) => {
    try {
      const { data } = await axios.patch("/vendor/edit", {
        name,
        new_name,
        new_location,
        new_email,
        new_phone,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  delete: async (name) => {
    console.log(name);
    try {
      const { data } = await axios.delete("/vendor/delete", {
        data: { name },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },
};

export default VendorController;

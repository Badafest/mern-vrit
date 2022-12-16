import axios from "../config/axios";

const CategoryController = {
  add: async (parent_name, child_name) => {
    try {
      const { data } = await axios.post("/category/add", {
        parent_name,
        child_name,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  edit: async (name, new_name) => {
    try {
      const { data } = await axios.patch("/category/edit", {
        name,
        new_name,
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
      const { data } = await axios.delete("/category/delete", {
        data: { name },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  parent: async (parent, child) => {
    try {
      const { data } = await axios.patch("/category/parent", {
        parent,
        child,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },
};

export default CategoryController;

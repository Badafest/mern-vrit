import axios from "../config/axios";
import { readFile } from "../helpers";

const ProductController = {
  add: async (name, vendor, price, stock, category, avatar, description) => {
    try {
      const image = avatar ? await readFile(avatar) : "";
      const { data } = await axios.post("/product/add", {
        name,
        vendor,
        price,
        stock,
        category,
        avatar: image,
        description,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },

  edit: async (
    name,
    new_name,
    new_vendor,
    new_price,
    new_stock,
    new_category,
    new_avatar,
    new_description
  ) => {
    try {
      const image = new_avatar ? await readFile(new_avatar) : "";
      const { data } = await axios.patch("/product/edit", {
        name,
        new_name,
        new_vendor,
        new_price,
        new_stock,
        new_category,
        new_avatar: image,
        new_description,
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
      const { data } = await axios.delete("/product/delete", {
        data: { name },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error || error.message);
    }
  },
};

export default ProductController;

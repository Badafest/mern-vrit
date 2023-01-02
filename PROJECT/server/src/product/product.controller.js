const ProductService = require("./product.service");

const ProductController = {
  add: async (req, res) => {
    try {
      const { name, vendor, price, stock, category, avatar, description } =
        req.body;
      const product = await ProductService.add(
        name,
        vendor,
        price,
        stock,
        category,
        avatar,
        description
      );
      return res.status(200).json({
        message: "Product added successfully",
        product: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchAll: async (_, res) => {
    try {
      const products = await ProductService.fetchAll();
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchRandom: async (_, res) => {
    try {
      const products = await ProductService.fetchRandom();
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchFiltered: async (req, res) => {
    try {
      const { category, vendor, price, index, total } = req.body;
      const products = await ProductService.fetchFiltered(
        category,
        vendor,
        price,
        index,
        total
      );
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchById: async (req, res) => {
    try {
      const { _id } = req.params;
      const products = await ProductService.fetchById(_id);
      return res.status(200).json({
        message: "Product fetched successfully",
        products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  search: async (req, res) => {
    try {
      const { query } = req.query;
      console.log(query);
      const suggestions = await ProductService.fetchSearch(query);
      return res.status(200).json({
        message: "Product fetched successfully",
        suggestions,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  edit: async (req, res) => {
    try {
      const {
        name,
        new_name,
        new_vendor,
        new_price,
        new_stock,
        new_category,
        new_avatar,
        new_description,
      } = req.body;
      const product = await ProductService.edit(
        name,
        new_name,
        new_vendor,
        new_price,
        new_stock,
        new_category,
        new_avatar,
        new_description
      );
      return res.status(200).json({
        message: "Product edited successfully",
        product: product,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        error.message = `${Object.keys(error.keyPattern)[0]} is already taken`;
      }
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { name } = req.body;
      await ProductService.delete(name);
      return res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = ProductController;

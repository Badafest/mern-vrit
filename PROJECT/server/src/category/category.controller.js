const CategoryService = require("./category.service");

const CategoryController = {
  add: async (req, res) => {
    try {
      const { parent_name, child_name } = req.body;
      const category = await CategoryService.add(parent_name, child_name);
      return res.status(200).json({
        message: "Successfully added category",
        category,
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

  edit: async (req, res) => {
    try {
      const { name, new_name } = req.body;
      const category = await CategoryService.edit(name, new_name);
      return res.status(200).json({
        message: "Successfully edited category",
        category,
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
      console.log(req.body);
      await CategoryService.delete(name);
      return res.status(200).json({
        message:
          "Successfully deleted category. Note that products using this category will be orphaned",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  fetchJSON: async (_, res) => {
    try {
      const categories = await CategoryService.fetchJSON();
      return res.status(200).json({
        message: "Successfully fetched categories JSON",
        categories,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = CategoryController;

const productService = require("./product.service");

const ProductController = {
  add: async (req, res) => {
    try {
      const product = await productService.add(...req.body);
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
};

module.exports = ProductController;

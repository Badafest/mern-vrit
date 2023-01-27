const orderService = require("./order.service");

const OrderController = {
  addOrder: async (req, res) => {
    try {
      const { cart, payment_method } = req.body;
      const { _id } = req;
      const order = await orderService.createOrder(_id, cart, payment_method);
      return res.status(200).json({
        message: "Order added successfully",
        order,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  getOrder: async (req, res) => {
    try {
      const { _id } = req;
      const orders = await orderService.getOrdersByUser(_id);
      return res.status(200).json({
        message: "Orders fetched successfully",
        orders,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  payOrder: async (req, res) => {
    try {
      const { _id } = req;
      const { order } = req.body;
      await orderService.payOrder(order, _id);
      return res.status(200).json({
        message: "Order paid successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: error.message,
      });
    }
  },
  confirmOrder: async (req, res) => {
    try {
      const { _id } = req;
      const { order } = req.body;
      await orderService.confirmOrder(order, _id);
      return res.status(200).json({
        message: "Order confirmed successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: error.message,
      });
    }
  },
  addReview: async (req, res) => {
    try {
      const { _id } = req;
      const { order_id, product_name, rating, review } = req.body;
      await orderService.addReview(order_id, _id, product_name, rating, review);
      return res.status(200).json({
        message: "Review added successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  },
};

module.exports = OrderController;

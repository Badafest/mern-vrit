const Order = require("./Order");
const Product = require("../product/Product");
const User = require("../user/User");
const validate = require("../validate");

class OrderService {
  Order;
  constructor(Order, Product, User) {
    this.Order = Order;
    this.Product = Product;
    this.User = User;
  }

  async getOrdersByUser(user) {
    const orders = await this.Order.find(
      { user },
      "cart isPaid isConfirmed bill_amount payment_method createdAt"
    ).populate("cart.item", "name");
    return orders;
  }

  async createOrder(user, cart, payment_method) {
    const bill_amount = await cart.reduce(async (accumulator, current) => {
      const product = await this.Product.findById(current.item._id);
      const price = product.price;
      const delivery =
        price < 100
          ? 0
          : price < 1000
          ? 0.03 * price
          : price < 10000
          ? 0.05 * price
          : Math.min(5000, 0.08 * price);
      accumulator = (await accumulator) + current.quantity * (price + delivery);
      return accumulator;
    }, 0);

    const payingUser = await this.User.findById(user);
    if (!payingUser) {
      throw new Error("User not found");
    }

    const order = await new this.Order({
      user,
      cart,
      bill_amount: Math.round(bill_amount * 100) / 100,
      payment_method,
      isPaid: false,
      isConfirmed: false,
    });

    await order.save();

    payingUser.cart = [];
    await payingUser.save();

    return order;
  }

  async payOrder(order_id, user_id) {
    const order = await this.Order.findById(order_id);
    if (!order) {
      throw new Error("No order found");
    }
    if (order.user.toString() !== user_id.toString()) {
      throw new Error("Not authorized");
    }
    order.isPaid = true;
    await order.save();
  }

  async confirmOrder(order_id, user_id) {
    const order = await this.Order.findById(order_id).populate("cart.item");
    if (!order) {
      throw new Error("No order found");
    }
    if (order.user.toString() !== user_id.toString()) {
      throw new Error("Not authorized");
    }
    order.isConfirmed = true;
    await order.save();

    await order.cart.forEach(async (cartItem) => {
      cartItem.sold += 1;
      cartItem.stock -= 1;
      await cartItem.save();
    });
  }

  async addReview(order_id, user_id, product_name, rating, review) {
    const isValid = await validate(order_id, product_name, review);
    if (!isValid) {
      throw new Error("Order, product and review are required");
    }
    const order = await this.Order.findById(order_id, "cart user").populate(
      "cart.item"
    );
    if (!order) {
      throw new Error("No order found");
    }
    const { user, cart } = order;
    if (user.toString() !== user_id.toString()) {
      throw new Error("Not authorized");
    }

    const product = cart.find((product) => {
      console.log(product_name, product.item.name);
      return product.item.name === product_name;
    });
    if (!product) {
      throw new Error("No product found");
    }
    console.log(product);
    product.item.reviews.push({
      rating,
      text: review,
      author: user,
    });
    await product.item.save();
  }
}

module.exports = new OrderService(Order, Product, User);

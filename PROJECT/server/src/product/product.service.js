const Product = require("./Product");

class ProductService {
  Product;
  constructor(Product) {
    this.Product = Product;
  }
  async add(title, vendor, price, stock, description, avatar, categories) {
    if (avatar && avatar.length) {
    }
    const product = await new this.Product({
      title,
      vendor,
      price,
      stock,
      description,
      avatar,
      categories,
    }).save();
    return product;
  }
}

module.exports = new ProductService(Product);

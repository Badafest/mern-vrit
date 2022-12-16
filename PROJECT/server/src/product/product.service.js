const Product = require("./Product");

class ProductService {
  Product;
  constructor(Product) {
    this.Product = Product;
  }
  async add(
    title,
    vendor,
    main_category,
    sub_category,
    price,
    stock,
    description
  ) {
    const product = await new this.Product({
      title,
      main_category,
      sub_category,
      vendor,
      price,
      stock,
      description,
    }).save();
    return product;
  }
}

module.exports = new ProductService(Product);

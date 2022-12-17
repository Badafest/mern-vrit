const cloudinary = require("../config/cloudinary");
const Product = require("./Product");
const Category = require("../category/Category");
const validate = require("../validate");

class ProductService {
  Product;
  Category;
  constructor(Product, Category) {
    this.Product = Product;
    this.Category = Category;
  }

  async add(name, vendor, price, stock, category, avatar, description) {
    const isValid = await validate(name, vendor, price);
    if (!isValid) {
      throw new Error("Name, vendor and price are required");
    }
    const product = await new this.Product({
      name,
      vendor,
      price,
      stock: stock || 0,
      description,
    });

    if (category && category.length) {
      const categories = await Promise.all(
        category.map(async (item) => {
          const category = await this.Category.findOne({ name: item });
          return category._id;
        })
      );
      product.categories = categories;
    }

    if (avatar && avatar.length) {
      const url = await cloudinary.upload(avatar, "products");
      product.avatar = url;
    }

    await product.save();
    return product;
  }

  async fetchAll() {
    const products = await this.Product.find({})
      .populate("vendor")
      .populate("categories");
    return products.map((product) => ({
      ...product._doc,
      vendor: product._doc.vendor?.name || "Not Available",
      categories: product._doc.categories.map(
        (category) => category.name || "Not Available"
      ),
    }));
  }
}

module.exports = new ProductService(Product, Category);

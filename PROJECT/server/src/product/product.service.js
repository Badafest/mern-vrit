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

    if (await validate(category)) {
      const categories = await Promise.all(
        category.map(async (item) => {
          const category = await this.Category.findOne({ name: item });
          return category._id;
        })
      );
      product.categories = categories;
    }

    if (await validate(avatar)) {
      const url = await cloudinary.upload(avatar, "products");
      product.avatar = url;
    }
    await product.save();
    return product;
  }

  async fetchAll() {
    const products = await this.Product.find({}).populate("vendor categories");
    return products.map((product) => ({
      ...product._doc,
      categories: product.categories.map(
        (category) => category.name || "Not Available"
      ),
      vendor: product.vendor?.name || "Not Available",
    }));
  }

  async edit(
    name,
    new_name,
    new_vendor,
    new_price,
    new_stock,
    new_category,
    new_avatar,
    new_description
  ) {
    const product = await this.Product.findOne({ name });

    if (!product) {
      throw new Error("Product not found");
    }

    if (await validate(new_name)) {
      product.name = new_name;
    }

    if (await validate(new_vendor)) {
      product.vendor = new_vendor;
    }

    if (await validate(new_price)) {
      product.price = new_price;
    }

    if (await validate(new_stock)) {
      product.stock = new_stock;
    }

    if (await validate(new_description)) {
      product.description = new_description;
    }

    if (await validate(new_category)) {
      const categories = await Promise.all(
        new_category.map(async (item) => {
          const category = await this.Category.findOne({ name: item });
          return category._id;
        })
      );
      product.categories = categories;
    }

    if (await validate(new_avatar)) {
      const old_avatar = product.avatar;
      if (old_avatar && old_avatar.length) {
        const { result } = await cloudinary.destroy(old_avatar);
        if (result !== "ok") {
          throw new Error("Problem while replacing image");
        }
      }
      const url = await cloudinary.upload(new_avatar, "products");
      product.avatar = url;
    }

    await product.save();
    return product;
  }

  async delete(name) {
    if (!(await validate(name))) {
      throw new Error("Name is required");
    }
    const product = await this.Product.findOne({ name });
    if (!product) {
      throw new Error("Product not found");
    }
    await product.remove();
    return true;
  }
}

module.exports = new ProductService(Product, Category);

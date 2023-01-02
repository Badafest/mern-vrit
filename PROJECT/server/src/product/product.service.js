const cloudinary = require("../config/cloudinary");
const validate = require("../validate");

const Product = require("./Product");
const Category = require("../category/Category");
const Vendor = require("../vendor/Vendor");

class ProductService {
  Product;
  Category;
  Vendor;
  constructor(Product, Category) {
    this.Product = Product;
    this.Category = Category;
    this.Vendor = Vendor;
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

  fillNames(products) {
    return products.map((product) => ({
      ...product._doc,
      categories: product.categories.map(
        (category) => category.name || "Not Available"
      ),
      vendor: product.vendor?.name || "Not Available",
    }));
  }

  async fetchAll() {
    const products = await this.Product.find({}).populate("vendor categories");
    return this.fillNames(products);
  }

  async fetchRandom() {
    const products = await this.Product.find({})
      .populate("vendor categories")
      .limit(5);
    return this.fillNames(products);
  }

  async fetchById(_id) {
    const product = await this.Product.findById(_id).populate(
      "vendor categories"
    );
    return this.fillNames([product]);
  }

  async fetchFiltered(category, vendor, price, index, total) {
    const filter = {};

    if (await validate(vendor)) {
      filter.vendor = {
        $in: await Promise.all(
          vendor.map(async (item) => await this.Vendor.findOne({ name: item }))
        ),
      };
    }

    if (await validate(category)) {
      filter.categories = {
        $in: await Promise.all(
          category.map(
            async (item) => await this.Category.findOne({ name: item })
          )
        ),
      };
    }

    if (await validate(price)) {
      filter.price = {
        $gte: price[0],
        $lte: price[1],
      };
    }

    const count = parseInt(total || 1);
    const from = count * (parseInt(index || 1) - 1);

    let products = await this.Product.find(filter)
      .skip(from)
      .limit(count)
      .populate("vendor categories");

    return this.fillNames(products);
  }

  async fetchSearch(query) {
    if (!(await validate(query))) {
      throw new Error("Query is required");
    }

    const pattern = new RegExp(`${query.replaceAll(" ", "|")}`, "i");
    console.log(pattern);

    const products = await this.Product.find(
      {
        $or: [{ name: pattern }, { description: pattern }],
      },
      "_id name"
    );
    const categories = await this.Category.find({ name: pattern }, "-_id name");
    const vendors = await this.Vendor.find({ name: pattern }, "-_id name");

    return {
      products,
      categories: categories.map((x) => x.name),
      vendors: vendors.map((x) => x.name),
    };
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

module.exports = new ProductService(Product, Category, Vendor);

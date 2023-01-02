const cloudinary = require("../config/cloudinary");
const ProductService = require("../product/product.service");
const User = require("./User");

class UserService {
  User;
  constructor(User) {
    this.User = User;
  }

  async getUserData(_id) {
    const user = await this.User.findById(_id, "-password");
    if (!user) {
      throw new Error("No user found");
    }
    return user;
  }

  async setAvatar(_id, image) {
    const user = await this.User.findById(_id);
    if (!user) {
      throw new Error("No user found");
    }

    const url = await cloudinary.upload(image, "users");
    const old_url = user.avatar;
    if (old_url && old_url.length) {
      const response = await cloudinary.destroy(old_url);
      if (response.result !== "ok") {
        throw new Error("Problem while replacing image");
      }
    }
    user.avatar = url;
    await user.save();
    return url;
  }

  async delAvatar(_id) {
    const user = await this.User.findById(_id);
    if (!user) {
      throw new Error("No user found");
    }
    const url = user.avatar;
    if (url && url.length) {
      await cloudinary.destroy(url);
      user.avatar = "";
      await user.save();
    }
  }

  async dumpFavorites(_id, favorites) {
    await this.User.findByIdAndUpdate(_id, { favorites });
  }

  async getFavorites(_id) {
    const user = await this.User.findById(_id);
    if (!user) {
      throw new Error("No user found");
    }
    return Promise.all(
      user.favorites.map(
        async (product) => (await ProductService.fetchById(product._id))[0]
      )
    );
  }

  async dumpCart(_id, cart) {
    await this.User.findByIdAndUpdate(_id, {
      cart: cart.map((product) => ({
        item: product.item._id,
        quantity: product.quantity,
      })),
    });
  }

  async getCart(_id) {
    const user = await this.User.findById(_id);
    if (!user) {
      throw new Error("No user found");
    }
    return Promise.all(
      user.cart.map(async (product) => ({
        item: (await ProductService.fetchById(product.item._id))[0],
        quantity: product.quantity,
      }))
    );
  }
}

module.exports = new UserService(User);

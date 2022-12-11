const { CN_CLOUD_NAME, CN_API_KEY, CN_API_SECRET } = require("./vars");
const cloudinary = require("cloudinary").v2;

class Cloudinary {
  cloudinary;
  constructor() {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: CN_CLOUD_NAME,
      api_key: CN_API_KEY,
      api_secret: CN_API_SECRET,
      secure: true,
    });
  }

  async upload(image, type) {
    try {
      if (["users", "vendors", "products", "app"].includes(type) === -1) {
        throw new Error("Invalid type");
      }
      const response = await this.cloudinary.uploader.upload(image, {
        folder: "redbag/" + type,
      });
      return response.secure_url;
    } catch (error) {
      throw error;
    }
  }

  async destroy(url) {
    try {
      const splitted = url.split("/");
      const public_id = splitted[splitted.length - 1].split(".")[0];
      return await this.cloudinary.uploader.destroy(
        "redbag/users/" + public_id
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Cloudinary();

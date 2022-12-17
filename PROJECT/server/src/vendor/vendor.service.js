const validate = require("../validate");
const Vendor = require("./Vendor");
const Cloudinary = require("../config/cloudinary");

class VendorService {
  Vendor;
  constructor(Vendor) {
    this.Vendor = Vendor;
  }

  async add(name, location, email, phone, avatar) {
    const isValid = await validate(name, location, email, phone);
    if (!isValid) {
      throw new Error("Name, location, email and phone are required");
    }
    const vendor = await new this.Vendor({
      name,
      location,
      email,
      phone,
    });

    if (avatar) {
      const imageURL = await Cloudinary.upload(avatar, "vendors");
      vendor.avatar = imageURL;
    }

    await vendor.save();
    return vendor;
  }

  async fetchAll() {
    const vendors = await this.Vendor.find({});
    return vendors;
  }

  async edit(name, new_name, new_location, new_email, new_phone, new_avatar) {
    if (!(await validate(name))) {
      throw new Error("Name is required");
    }
    const vendor = await this.Vendor.findOne({ name });
    if (!vendor) {
      throw new Error("Vendor not found");
    }
    if (await validate(new_name)) {
      vendor.name = new_name;
    }
    if (await validate(new_location)) {
      vendor.location = new_location;
    }
    if (await validate(new_email)) {
      vendor.email = new_email;
    }
    if (await validate(new_phone)) {
      vendor.phone = new_phone;
    }
    if (await validate(new_avatar)) {
      const oldURL = vendor.avatar;
      if (oldURL && oldURL.length) {
        const response = await Cloudinary.destroy(oldURL);
        if (response.result !== "ok") {
          throw new Error("Problem while replacing image");
        }
      }
      const newURL = await Cloudinary.upload(new_avatar, "vendors");
      vendor.avatar = newURL;
    }
    await vendor.save();
    return vendor;
  }

  async delete(name) {
    if (!(await validate(name))) {
      throw new Error("Name is required");
    }
    const vendor = await this.Vendor.findOne({ name });
    if (!vendor) {
      throw new Error("Vendor not found");
    }
    if (vendor.avatar) {
      await Cloudinary.destroy(vendor.avatar);
    }
    await vendor.remove();
    return true;
  }
}

module.exports = new VendorService(Vendor);

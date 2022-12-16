const validate = require("../validate");
const Vendor = require("./Vendor");

class VendorService {
  Vendor;
  constructor(Vendor) {
    this.Vendor = Vendor;
  }

  async add(name, location, email, phone) {
    const isValid = await validate(name, location, email, phone);
    if (!isValid) {
      throw new Error("Name, location, email and phone are required");
    }
    const vendor = await new this.Vendor({
      name,
      location,
      email,
      phone,
    }).save();
    return vendor;
  }

  async fetchAll() {
    const vendors = await this.Vendor.find({});
    return vendors;
  }

  async edit(name, new_name, new_location, new_email, new_phone) {
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

    await vendor.remove();
    return true;
  }
}

module.exports = new VendorService(Vendor);

const Vendor = require("./Vendor");

class VendorService {
  Vendor;
  constructor(Vendor) {
    this.Vendor = Vendor;
  }
  async add(name, location, email, phone) {
    const vendor = await new this.Vendor({
      name,
      location,
      email,
      phone,
    }).save();
    return vendor;
  }
}

module.exports = new VendorService(Vendor);

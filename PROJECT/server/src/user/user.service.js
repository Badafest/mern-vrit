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
}

module.exports = new UserService(User);

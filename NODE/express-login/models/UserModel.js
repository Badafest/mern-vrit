const Users = [{ username: "admin", password: "admin" }];

const UserModel = {
  register: (user) =>
    new Promise((resolve, reject) => {
      try {
        const uniqueUser = Users.filter(
          (item) => item.username === user.username
        );
        if (uniqueUser.length === 0) {
          Users.push(user);
          resolve(true);
        } else {
          throw new Error("Username is already taken");
        }
      } catch (err) {
        reject(err);
      }
    }),

  login: (user) =>
    new Promise((resolve, reject) => {
      try {
        const matched = Users.filter(
          (item) =>
            item.username === user.username && item.password === user.password
        );
        if (matched.length === 1) {
          resolve(true);
        } else {
          throw new Error(matched.length + " no. of users matched");
        }
      } catch (err) {
        reject(err);
      }
    }),
};

module.exports = UserModel;

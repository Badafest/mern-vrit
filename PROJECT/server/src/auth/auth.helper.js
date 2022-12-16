const bcrypt = require("bcryptjs");
const { SALT_ROUNDS, JWT_SECRET } = require("../config/vars");

const jwt = require("jsonwebtoken");

const AuthHelper = {
  hashPassword: async (password) => await bcrypt.hash(password, SALT_ROUNDS),
  compareHash: async (password, hash) => await bcrypt.compare(password, hash),
  generateToken: async (data, options) =>
    new Promise((resolve, reject) => {
      jwt.sign(data, JWT_SECRET, options, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    }),
  verifyToken: async (token) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    }),
  sendMail: async (to, payload, template) =>
    new Promise((resolve, reject) => {
      console.log(`MAILED ${payload} TO ${to} WITH TEMPLATE ${template}`);
      resolve(true);
    }),
};

module.exports = AuthHelper;

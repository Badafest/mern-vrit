const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, JWT_EXPIRY, JWT_SECRET } = require("../config/vars");

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });

const compareHash = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

const generateToken = (data) =>
  new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRY }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

module.exports = { hashPassword, compareHash, generateToken, verifyToken };

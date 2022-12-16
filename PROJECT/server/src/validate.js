const validate = (...args) =>
  new Promise((resolve, reject) => {
    try {
      resolve(args.every((arg) => arg && arg.length > 0));
    } catch (err) {
      reject(err);
    }
  });

module.exports = validate;

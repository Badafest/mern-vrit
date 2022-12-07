const validate = (username, password, email) => {
  if (email || email === "") {
    console.log("email found");
    return (
      username && username.length && password && password.length && email.length
    );
  }
  return username && username.length && password && password.length;
};

module.exports = validate;

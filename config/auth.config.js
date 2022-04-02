var bcrypt = require("bcryptjs");

const text = "vending-machine-sk";
const secret = bcrypt.hashSync(text, 8);


module.exports = {
  secret: text
};


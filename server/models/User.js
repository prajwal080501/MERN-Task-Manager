const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  profilePhoto: String
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

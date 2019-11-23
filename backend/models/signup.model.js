const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signupSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    loginType: { type: String, required: true },
    date: { type: Date, required: true },
    googleId: { type: String, required: false },
    imageUrl: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;

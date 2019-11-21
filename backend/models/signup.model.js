const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signupSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;

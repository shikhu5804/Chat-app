const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    profilepic: {
      type: String,
      default: "",
    },
    // friends: [
    //   {
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     status: { type: String, enum: ["pending", "accepted", "none"], default: "none" }
    //   }
    // ]
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

const mongoose = require("mongoose");
const nexHomeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    // sold: { type: Array, default: null },
    sold: [
      {
        Type: String,
        to: String,
        name: String,
        Location: String,
        bedrooms: Number,
        bathrooms: Number,
        rooms: Number,
        linkarr: Array,
        mobile: Number,
        mail: String,
        cost: Number,
        info: String,
      },
    ],
  },
  {
    collection: "Login",
  }
);

module.exports = mongoose.model("nexHomeSchema", nexHomeSchema);

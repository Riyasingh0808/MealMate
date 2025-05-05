const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // Add menuId to reference the Menu model
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu", // Reference to the Menu model
      required: true, // Menu must be assigned to a dish
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);

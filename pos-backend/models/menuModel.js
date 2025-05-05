const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    bgColor: {
      type: String,
      default: "#ffffff", // default background color
    },
    icon: {
      type: String,
      default: "🍽️", // default icon
    },
    // Now, items will be an array of objects with full dish data
    items: [
      {
        name: {
          type: String,
          required: [true, "Dish name is required"],
        },
        price: {
          type: Number,
          required: [true, "Dish price is required"],
        },
        category: {
          type: String,
          required: [true, "Dish category is required"],
        },
      },
    ],
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;

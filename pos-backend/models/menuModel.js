const mongoose = require("mongoose");

// Reference to the Dish model
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
    // Now, items will be an array of references to Dish model
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish", // Referencing the Dish model
      },
    ],
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;

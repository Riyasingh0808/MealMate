const express = require("express");
const router = express.Router();
const {
  addMenuCategory,
  getMenuNames,
  getMenuWithItems,
  addMenuItemToCategory,
} = require("../controllers/menuController");

// Add a new menu category (e.g., "Starters")
router.post("/", addMenuCategory);

// Get all menu category names only
router.get("/names", getMenuNames);

// Get a specific menu by category name along with its items
router.get("/:name", getMenuWithItems);

// Add an item to a specific menu category
router.post("/:name/item", addMenuItemToCategory);

module.exports = router;

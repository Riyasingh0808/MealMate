const Menu = require("../models/menuModel");
const Dish = require("../models/dishModel");

// Add a new menu category
exports.addMenuCategory = async (req, res) => {
  try {
    const { name, bgColor, icon } = req.body;

    const existing = await Menu.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newMenu = new Menu({ name, bgColor, icon });
    await newMenu.save();

    res.status(201).json({ message: "Category created", menu: newMenu });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get all menu category names
exports.getMenuNames = async (req, res) => {
  try {
    const menus = await Menu.find({}, "name bgColor icon"); // include icon here
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu names", error });
  }
};
// Get a specific menu by category name with items
exports.getMenuWithItems = async (req, res) => {
  try {
    const { name } = req.params;
    const menu = await Menu.findOne({ name });

    if (!menu) {
      return res.status(404).json({ message: "Menu category not found" });
    }

    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu", error });
  }
};

// Add a menu item to a specific category
exports.addMenuItemToCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const { name: dishName, price, category } = req.body;

    const menu = await Menu.findOne({ name });
    if (!menu) {
      return res.status(404).json({ message: "Menu category not found" });
    }

    // Create new dish object (no need to save it in a separate Dish collection)
    const newDish = { name: dishName, price, category };

    // Add the new dish directly to the menu items
    menu.items.push(newDish);
    await menu.save();

    res
      .status(201)
      .json({ message: "Dish added to menu", dish: newDish, menu });
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ message: "error adding dish", error });
  }
};

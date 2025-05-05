const Dish = require("../models/dishModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

// Add a new dish
const addDish = async (req, res, next) => {
  try {
    console.log("Add dish is being called");
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      const error = createHttpError(400, "Please provide all required fields!");
      return next(error);
    }

    const isDishPresent = await Dish.findOne({ name });

    if (isDishPresent) {
      const error = createHttpError(400, "Dish already exists!");
      return next(error);
    }

    const newDish = new Dish({ name, price, category });
    await newDish.save();

    res.status(201).json({
      success: true,
      message: "Dish added!",
      data: newDish,
    });
  } catch (error) {
    next(error);
  }
};

// Get all dishes
const getDishes = async (req, res, next) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    next(error);
  }
};

// Update a dish
const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid dish ID!");
      return next(error);
    }

    const updatedDish = await Dish.findByIdAndUpdate(
      id,
      { name, price, category },
      { new: true }
    );

    if (!updatedDish) {
      const error = createHttpError(404, "Dish not found!");
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Dish updated!",
      data: updatedDish,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addDish,
  getDishes,
  updateDish,
};

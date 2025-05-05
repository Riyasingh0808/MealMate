const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      const error = createHttpError(400, "Please provide table No!");
      return next(error);
    }
    const isTablePresent = await Table.findOne({ tableNo });

    if (isTablePresent) {
      const error = createHttpError(400, "Table already exist!");
      return next(error);
    }

    const newTable = new Table({ tableNo, seats });
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, "Invalid id!");
      return next(error);
    }

    const table = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!table) {
      const error = createHttpError(404, "Table not found!");
      return error;
    }

    res
      .status(200)
      .json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};

const updateTableStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, "Invalid table ID"));
    }

    // Validate status
    if (!status || (status !== "Booked" && status !== "Available")) {
      return next(createHttpError(400, "Invalid or missing status value"));
    }

    const updatedTable = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTable) {
      return next(createHttpError(404, "Table not found"));
    }

    res.status(200).json({
      success: true,
      message: "Table status updated successfully!",
      data: updatedTable,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable, updateTableStatus };

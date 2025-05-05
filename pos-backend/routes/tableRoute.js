const express = require("express");
const {
  addTable,
  getTables,
  updateTable,
  updateTableStatus,
} = require("../controllers/tableController");
const router = express.Router();
const { isVerifiedUser } = require("../middlewares/tokenVerification");

router.route("/").post(isVerifiedUser, addTable);
router.route("/").get(isVerifiedUser, getTables);
router.route("/:id").put(isVerifiedUser, updateTable);
router.route("/:id").patch(isVerifiedUser, updateTableStatus);

module.exports = router;

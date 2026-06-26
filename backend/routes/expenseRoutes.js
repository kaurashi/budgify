const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/add-expense",verifyToken, addExpense);
router.get("/expense",verifyToken ,getExpenses);
router.delete("/expense/:id",verifyToken , deleteExpense);
router.put("/expense/:id",verifyToken,updateExpense);

module.exports = router;
const express = require("express");
const router = express.Router();

const { setBudget, getBudget, getBudgetAlert } = require("../controllers/budgetController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/budget", verifyToken, setBudget);
router.get("/budget", verifyToken, getBudget);
router.get("/budget-alert", verifyToken, getBudgetAlert);

module.exports = router;

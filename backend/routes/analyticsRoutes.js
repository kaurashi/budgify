const express = require("express");
const router = express.Router();

const { getAnalytics } = require("../controllers/analyticsController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/analytics",verifyToken, getAnalytics);

module.exports = router;
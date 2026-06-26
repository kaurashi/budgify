const express = require("express");
const router = express.Router();

const { getPatterns } = require("../controllers/patternController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/patterns", verifyToken, getPatterns);

module.exports = router;

const express = require("express");
const router = express.Router();

const { getInsights } = require("../controllers/aiController");

router.post("/ai-insights", getInsights);

module.exports = router; 
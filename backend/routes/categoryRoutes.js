const express = require("express");
const router = express.Router();

const { predictCategory } = require("../controllers/categoryController");

router.post("/predict-category", predictCategory);

module.exports = router;

const getCategory = require("../utils/getCategory");

const predictCategory = async (req, res) => {
  const { description } = req.body;

  const category = getCategory(description);

  res.json({ category });
};

module.exports = { predictCategory };

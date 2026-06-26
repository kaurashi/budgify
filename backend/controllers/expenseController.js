const pool = require("../db");

const addExpense = async (req, res) => {
  const { description, amount, category } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO expenses (description, amount, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, amount, category, userId]
    );

    res.json({
      message: "expense added successfully",
      expense: result.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "failed to add expense" });
  }
};

const getExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id=$1 ORDER BY id DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "failed to fetch expenses" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "failed to delete expense" });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, category } = req.body;

  try {
    const result = await pool.query(
      "UPDATE expenses SET description=$1, amount=$2, category=$3 WHERE id=$4 RETURNING *",
      [description, Number(amount), category, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "failed to update expense" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};

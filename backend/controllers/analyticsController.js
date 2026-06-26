const pool = require("../db");

const getAnalytics = async (req, res) => {
  const userId=req.user.id;
  const result = await pool.query("SELECT * FROM expenses WHERE user_id=$1",
    [userId]
  );
  const expenses = result.rows;

  let total = 0;
  let categoryMap = {};

  for (const exp of expenses) {
    const amt = Number(exp.amount);
    total += amt;

    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + amt;
  }

  const transactions = expenses.length;

  const averageExpense =
    transactions > 0 ? (total / transactions).toFixed(2): 0;

  let topCategory = "";
  let maxAmount = 0;

  for (const cat in categoryMap) {
    if (categoryMap[cat] > maxAmount) {
      maxAmount = categoryMap[cat];
      topCategory = cat;
    }
 }

res.json({
  totalExpenses: total,
  categoryBreakdown: categoryMap,
  transactions: expenses.length,
  averageExpense,
  topCategory,
});
};

module.exports = { getAnalytics };
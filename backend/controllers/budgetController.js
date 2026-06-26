const pool = require("../db");

const setBudget = async (req, res) => {
    try {
        const userId = req.user.id;
        const { monthlyBudget } = req.body;

        if (!monthlyBudget) {
            return res.status(400).json({
                error: "monthly budget is required",
            });
        }

        const result = await pool.query(
            `INSERT INTO budgets (user_id, monthly_budget)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, monthlyBudget]
        );

        return res.status(201).json({
            message: "budget saved successfully",
            budget: result.rows[0],
        });

    } catch (error) {
        console.log("set budget error", error);

        return res.status(500).json({
            error: "failed to save budget",
        });
    }
};

const getBudget = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT * FROM budgets
             WHERE user_id = $1
             ORDER BY created_at DESC
             LIMIT 1`,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "budget not found",
            });
        }

        return res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("get budget error", error);

        return res.status(500).json({
            error: "failed to fetch budget",
        });
    }
};

const getBudgetAlert = async (req, res) => {
    try {
        const userId = req.user.id;

        const budgetResults = await pool.query(
            `SELECT monthly_budget
             FROM budgets
             WHERE user_id = $1
             ORDER BY created_at DESC
             LIMIT 1`,
            [userId]
        );

        if (budgetResults.rows.length === 0) {
            return res.status(404).json({
                error: "budget not found",
            });
        }

        const budget = Number(budgetResults.rows[0].monthly_budget);

        const expenseResult = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total
             FROM expenses
             WHERE user_id = $1
             AND DATE_TRUNC('month', created_at) =
                 DATE_TRUNC('month', CURRENT_DATE)`,
            [userId]
        );

        const totalSpent = Number(expenseResult.rows[0].total);

        const percentage = (totalSpent / budget) * 100;

        let message = "Budget is under control";

        if (percentage >= 100) {
            message = "🚨 Budget exceeded!";
        } else if (percentage >= 80) {
            message = "⚠️ You have used 80% of your budget";
        }

        return res.status(200).json({
            budget,
            totalSpent,
            percentage: percentage.toFixed(2),
            message,
        });

    } catch (error) {
        console.error("budget alert error", error);

        return res.status(500).json({
            error: "failed to fetch budget alert",
        });
    }
};

module.exports = {
    setBudget,
    getBudget,
    getBudgetAlert,
};
const pool = require("../db");

const getPatterns = async (req, res) => {
try {
const userId = req.user.id;

const result = await pool.query(
  "SELECT * FROM expenses WHERE user_id = $1",
  [userId]
);

const expenses = result.rows;

let total = 0;
let largestExpense = 0;

let categoryMap = {};
let dayMap = {};

let weekendTotal = 0;
let weekdayTotal = 0;

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

for (const exp of expenses) {
  const amt = Number(exp.amount);

  total += amt;

  if (amt > largestExpense) {
    largestExpense = amt;
  }

  categoryMap[exp.category] =
    (categoryMap[exp.category] || 0) + amt;

  const day = new Date(exp.created_at).getDay();
  const dayName = dayNames[day];

  dayMap[dayName] = (dayMap[dayName] || 0) + amt;

  if (day === 0 || day === 6) {
    weekendTotal += amt;
  } else {
    weekdayTotal += amt;
  }
}

const transactions = expenses.length;

const averageExpense =
  transactions > 0
    ? (total / transactions).toFixed(2)
    : 0;

let topCategory = "";
let maxCategoryAmount = 0;

for (const cat in categoryMap) {
  if (categoryMap[cat] > maxCategoryAmount) {
    maxCategoryAmount = categoryMap[cat];
    topCategory = cat;
  }
}

let highestDay = "";
let maxDayAmount = 0;

for (const day in dayMap) {
  if (dayMap[day] > maxDayAmount) {
    maxDayAmount = dayMap[day];
    highestDay = day;
  }
}

const patterns = [];

patterns.push(
  `You spend the most on ${topCategory}`
);

patterns.push(
  `Highest spending day is ${highestDay}`
);

if (largestExpense > averageExpense * 3) {
  patterns.push(
    "You have unusually large transactions compared to your average spending"
  );
}

if (weekendTotal > weekdayTotal) {
  patterns.push(
    "Weekend spending is higher than weekday spending"
  );
}

res.status(200).json({
  patterns,
});

} catch (error) {
console.error("Pattern Detection Error:", error);

res.status(500).json({
  error: "Failed to fetch patterns",
});

}
};

module.exports = { getPatterns };

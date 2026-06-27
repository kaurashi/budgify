const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const patternRoutes = require("./routes/patternRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", expenseRoutes);
app.use("/", analyticsRoutes);
app.use("/", categoryRoutes);
app.use("/", aiRoutes);
app.use("/", authRoutes);
app.use("/", budgetRoutes);
app.use("/", patternRoutes);

app.get("/", (req, res) => {
  res.send("backend is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});

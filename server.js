const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  // To parse JSON requests
app.use(express.static(path.join(__dirname, "public")));  // Serve static files (HTML, JS)

// Sample data to simulate a database
let expenses = [
  { id: 1, name: "Coffee", amount: 5, category: "Food" },
  { id: 2, name: "Lunch", amount: 12, category: "Food" },
];

// API to get all expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// API to add a new expense
app.post("/api/expenses", (req, res) => {
  const { name, amount, category } = req.body;
  const newExpense = { id: expenses.length + 1, name, amount, category };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// API to delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(exp => exp.id != id);
  res.status(200).json({ message: "Expense deleted" });
});

// Serve the frontend HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

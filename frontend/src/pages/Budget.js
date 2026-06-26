import React, { useState } from "react";
import "./Budget.css";

function Budget() {
  const [monthlyBudget, setMonthlyBudget] = useState("");

  const handleSaveBudget = async () => {
    try {
      const token = localStorage.getItem("token"); 

      const response = await fetch("http://localhost:5000/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthlyBudget: Number(monthlyBudget), 
        }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Budget saved successfully!");
        setMonthlyBudget("");
      } else {
        alert(data.error || "Failed to save budget");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="budget-page">
      <div className="budget-card">
        <h1>💰 Set Monthly Budget</h1>
        <p>Get alerts and track your spending against your budget.</p>


        <input
          className="budget-input"
          type="number"
          placeholder="Enter monthly budget (₹)"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
        />

        <button className="budget-btn" onClick={handleSaveBudget}>
          Save Budget
        </button>
      </div>
    </div>
  );
}

export default Budget;


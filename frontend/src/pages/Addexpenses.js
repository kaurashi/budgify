import { useState } from "react";
import AddExpense from "../components/AddExpense";

function AddExpensePage() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    if (!description || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          description,
          amount: Number(amount),
          category,
        }),
      });

      const data = await response.json();
      console.log("Expense added:", data);

      setDescription("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <AddExpense
      description={description}
      amount={amount}
      setDescription={setDescription}
      setAmount={setAmount}
      category={category}
      setCategory={setCategory}
      handleSubmit={handleSubmit}
    />
  );
}

export default AddExpensePage;


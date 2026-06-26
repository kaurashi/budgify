import { useState } from "react";

function ExpenseItem({ exp, deleteData, updateExpenses }) {
const [IsEditing, setIsEditing]=useState(false);
const [NewDescription, setNewDescription]=useState(exp.description);
const [NewAmount, setNewAmount]=useState(exp.amount);

const handleUpdate = () =>{
   updateExpenses(exp.id, NewDescription, NewAmount, exp.category);
   setIsEditing(false);
}
  return (
  <li className="expense-item">

    {IsEditing ? (
      <div className="edit-container">
        <input
          className="edit-input"
          value={NewDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <input
          className="edit-input"
          type="number"
          value={NewAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />

        <button className="save-btn" onClick={handleUpdate}>
          Save
        </button>
      </div>
    ) : (
      <>
        <div className="expense-info">
          <h3>{exp.description}</h3>
          <p className="expense-category">{exp.category}</p>
        </div>

        <div className="expense-right">
          <div className="expense-amount">
            ₹{exp.amount}
          </div>

          <div className="expense-actions">
            <button
              className="update-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteData(exp.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    )}

  </li>
);
}

export default ExpenseItem;
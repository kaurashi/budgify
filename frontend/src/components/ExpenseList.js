import ExpenseItem from "./ExpenseItems";
import "./ExpenseList.css";

function ExpenseList({ expenses, deleteData, updateExpenses }) {
  return (
    <div className="expense-list-container">
      <h2 className="expense-heading">Recent Transactions</h2>

      <ol className="expense-list">
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            exp={exp}
            deleteData={deleteData}
            updateExpenses={updateExpenses}
          />
        ))}
      </ol>
    </div>
  );
}

export default ExpenseList;
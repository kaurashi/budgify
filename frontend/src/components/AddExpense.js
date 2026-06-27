import "./AddExpense.css";
function AddExpense({ description, amount, setDescription, setAmount, category, setCategory, handleSubmit }) {
  return (
    <div className="expense-form">
      <h2 className="add-expense">Add Expenses</h2>
      <input className="description"
        type="text"
        placeholder="add description"
        value={description}
        onChange={ async (e) => {
          const value=e.target.value
          setDescription(value);

          if(value.trim() === "") return;

          try{
             const res= await fetch("https://budgify-backend-3rko.onrender.com/predict-category", {
             method:"POST",
             headers : { "Content-Type" : "application/json"},
             body: JSON.stringify({description : value})
          });
          const data= await res.json();
          setCategory(data.category);
        }catch(error){
          console.error(error.message);
        }
      }}
      />
      <br /><br />
      <input className="amount"
        type="number"
        placeholder="add amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select className="dropDown"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      >
      <option value="">Select Category</option>
      <option value="Food & Dining">Food & Dining</option>
      <option value="Transportation">Transportation</option>
      <option value="Shopping">Shopping</option>
     <option value="Entertainment">Entertainment</option>
     <option value="Health & Fitness">Health & Fitness</option>
     <option value="Education">Education</option>
     <option value="Bills & Utilities">Bills & Utilities</option>
     <option value="Travel">Travel</option>
    <option value="Personal Care">Personal Care</option>
    <option value="Other">Other</option>
      </select>

      <br /><br />
      <button className="btn" onClick={handleSubmit}>Add expense</button>
    </div>
  );
}

export default AddExpense;
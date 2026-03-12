const express = require("express");
const app = express();

app.use(express.json());

let expense =[];

app.post("/add-expense", (req, res) =>{
    const  {description, amount} = req.body;

 const newExpense ={
    id: expense.length+1,
    description,
    amount
 };

 expense.push(newExpense);
  

res.json({
    message:"successfully expense added!",
    expense:newExpense
  });
});

app.listen(5000, ()=>{
    console.log("successfully expense added!");
});



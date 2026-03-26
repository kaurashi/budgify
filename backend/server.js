const express = require("express");
const cors =require("cors");
const app = express();

console.log("RUNNING THIS FILE NOW");

app.use(cors());
app.use(express.json());

let expense =[];

app.get("/", (req, res)=>{
    res.send("backend is working");
});

app.post("/add-expense", (req, res) =>{
    console.log("API HIT");
    console.log(req.body);

    const  {description, amount} = req.body;

 const newExpense ={
    id: expense.length+1,
    description,
    amount: Number(amount)
 };

 expense.push(newExpense);
  

res.json({
    message:"successfully expense added!",
    expense:newExpense
  });
});

app.get("/expense", (req, res)=>{
    res.json(expense);
})

app.listen(5000, ()=>{
    console.log("server running on port 5000!");
});




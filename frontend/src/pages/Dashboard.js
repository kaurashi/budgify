import React, { useEffect, useState } from "react";
import ExpenseList from "../components/ExpenseList";
import "./Dashboard.css";
import {PieChart, Pie, Tooltip, Cell} from "recharts";
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid } from "recharts";
import "../components/AddExpense.css"
import { Wallet, ListOrdered, TrendingUp, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [data, setData]=useState(null);
  const [aiData, setAiData]=useState("");
  const [loading, setLoading]=useState(false);
  const [budgetAlert, setBudgetAlert]=useState(null);
  const [patterns, setPatterns]=useState([]);
  const navigate=useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  getData();
}, [navigate]);

  async function getData() {
    const url = "http://localhost:5000/expense";
    try {
      const response = await fetch(url, {
        headers : {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) throw new Error(`response status: ${response.status}`);
      const result = await response.json();
      setExpenses(result);
    } catch (error) {
      console.log("error fetching expenses", error.message);
    }
  }

 
  useEffect(()=>{
    const fetchAnalytics = async ()=>{
      try{
        const res = await fetch("http://localhost:5000/analytics",{
         headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
         }
        });
        
        if (!res.ok) {
         const errText = await res.text();
         console.error("Backend error:", errText);
         throw new Error(`res.status : ${res.status}`);
        }
        const data=await res.json();
        setData(data);
      }catch(error){
        console.error(error.message);
      }
    };
    fetchAnalytics();
  }, [expenses]);

  const getInsights = async () => {
  try {
    if (!expenses || expenses.length === 0) {
      alert("no expenses to analyze");
      return;
    }

    setLoading(true);

    const res = await fetch("http://localhost:5000/ai-insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ expenses: [...expenses] }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Backend error:", data);
      throw new Error(data.error);
    }

    setAiData(data.insights);

  } catch (error) {
    console.error(error.message);
  } finally {
    setLoading(false);
  }
};

  const deleteData = async (id) => {
    try {
      const url = `http://localhost:5000/expense/${id}`;
      const response = await fetch(url, { 
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
     });
      
      if (!response.ok) throw new Error("failed to delete");
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.log("delete error detected", error.message);
    }
  };

  const updateExpenses = async (id, description, amount, category) => {
    const url = `http://localhost:5000/expense/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ description : description, amount: Number(amount), category: category }),
    });
    if(!response.ok) throw new Error("update failed");
    const data = await response.json();
    console.log(data);
    getData();
  };

const fetchBudgetAlert = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/budget-alert", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setBudgetAlert(data);
    } else {
      setBudgetAlert(null); 
    }

  } catch (error) {
    setBudgetAlert(null);
  }
};

useEffect(() => {
  fetchBudgetAlert();
}, []);

 
const fetchPatterns = async () => {
  const res = await fetch("http://localhost:5000/patterns", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const data = await res.json();

  if (res.ok) {
    setPatterns(data.patterns || []);
  }
};

 useEffect(() => {
  fetchPatterns();
}, []);


  const chartData=data
  ? Object.entries(data.categoryBreakdown).map(([cat, amt])=>({
        name:cat,
        value:amt
  }))
  : [];

  const COLORS = [
  "#1E3A8A", 
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE"
];


return (
  <div className="dashboard-container">

    <main className="main-content">

      <div className="dashboard-grid">

        {data && (
  <div className="summary-cards">

    <div className="card">
      <div className="card-header">
        <h3>
          <Wallet size={18} />
          Total Expenses
        </h3>
      </div>
      <p>₹{data.totalExpenses}</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>
          <ListOrdered size={18} />
          Transactions
        </h3>
      </div>
      <p>{data.transactions}</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>
          <TrendingUp size={18} />
          Average Expense
        </h3>
      </div>
      <p>₹{data.averageExpense}</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>
          <Tag size={18} />
          Top Category
        </h3>
      </div>
      <p>{data.topCategory}</p>
    </div>

  </div>
)}
        
        {data && (
          <div className="charts-container">

            <div className="chart-card">
              <h2>Expense Distribution</h2>

              <BarChart width={550} height={250} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
                />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />

                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </div>

            <div className="chart-card donut-chart">
              <h2>Expense by Category</h2>

              <PieChart width={300} height={300}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={120}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <div className="donut-center-label">
                ₹{data.totalExpenses}
              </div>
            </div>

          </div>
        )}

       
        <div className="bottom-section">
          <section className="left-column">

             <ExpenseList
              expenses={expenses}
               deleteData={deleteData}
             updateExpenses={updateExpenses}
              />

         </section>

          <section className="right-column">

            <div className="insights-actions">
              <button
                onClick={getInsights}
                disabled={expenses.length === 0}
                className="action-btn"
              >
                {loading ? "Loading..." : "Get AI Insights"}
              </button>

              {aiData && (
                <div className="card">
                  <h2>AI Insights</h2>
                  <pre>{aiData}</pre>
                </div>
              )}
            </div>

            {budgetAlert && (
              <div className="card">
                <h2>Savings Goal</h2>

                <h3>{budgetAlert.message}</h3>

                <p>
                  ₹{budgetAlert.totalSpent} / ₹{budgetAlert.budget}
                </p>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${budgetAlert.percentage}%` }}
                  />
                </div>

                <p>{budgetAlert.percentage}% used</p>
              </div>
            )}

            {patterns.length > 0 && (
              <div className="card">
                <h2>🧠 Spending Patterns</h2>

                {patterns.map((pattern, index) => (
                  <p key={index}>• {pattern}</p>
                ))}
              </div>
            )}

          </section>

        </div>

      </div>
    </main>
  </div>
);
}
export default Dashboard;
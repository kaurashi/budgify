import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { House, ChartNoAxesCombined, CirclePlus} from "lucide-react";

function Navbar() {
  const navigate= useNavigate();

  const handleLogout=()=>{
      localStorage.removeItem("token");
      navigate("/login");
  };
  return (
    <nav className="dashboard-Navbar">
      <h4 className="dashboard-navbar-heading"> BUDGIFY </h4>
      <div className="dashboard-nav-links">
        <span onClick={() => navigate("/dashboard")}>
          <House className="icon"/>
           <p>Home</p> 
          </span>
        <span onClick={() => navigate("/add-expense")}>
          <CirclePlus className="icon" />
          <p>Add Expense</p>
          </span>
        <span onClick={() => navigate("/budget")}>
          <ChartNoAxesCombined className="icon"/>
          <p>Budget</p>
          </span>
        <span on onClick={handleLogout}>Logout</span>
      </div>
    </nav>
  );
}

export default Navbar;

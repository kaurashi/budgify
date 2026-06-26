import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import AddExpensePage from "./pages/Addexpenses";
import Budget from "./pages/Budget";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={
            <LandingPage />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
    path="/signup"
    element={<Signup />}
  />


      <Route
        path="/dashboard"
        element={
          <>
          <Navbar/>
        <Dashboard />
        </>}
      />
      
      <Route
        path="/add-expense"
        element={
          <>
          <Navbar/>
          <AddExpensePage/>
          </>}
          />

          <Route
        path="/budget"
        element={
          <>
          <Navbar/>
          <Budget/>
          </>}
          />
          
    </Routes>

  );
}

export default App;



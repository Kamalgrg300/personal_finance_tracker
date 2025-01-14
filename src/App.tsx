import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Make sure NavBar is imported correctly
import "./styles/global.css";

const Home = lazy(() => import("./pages/home"));
const Income = lazy(() => import("./pages/income"));
const Expense = lazy(() => import("./pages/expense"));
const Savings = lazy(() => import("./pages/accounts"));
const IncomeExpenseTracker = lazy(() => import("./pages/IncomeExpenseTracker"));

const App: React.FC = () => (
  <Router>
    <NavBar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/savings" element={<Savings />} />
        <Route
          path="/income-expense-tracker"
          element={<IncomeExpenseTracker />}
        />{" "}
        {/* Correct path */}
      </Routes>
    </Suspense>
  </Router>
);

export default App;

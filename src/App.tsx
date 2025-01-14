/* src/App.tsx */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import "./styles/global.css";

const Home = lazy(() => import("./pages/home"));
const Income = lazy(() => import("./pages/income"));
const Expense = lazy(() => import("./pages/expense"));
const Savings = lazy(() => import("./pages/accounts"));
const IncomeExpenseTracker = lazy(() => import("./pages/incomeExpenseTracker"));

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/incomeExpenseTracker" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/savings" element={<Savings />} />
        <Route
          path="/incomeExpenseTracker"
          element={<IncomeExpenseTracker />}
        />
      </Routes>
    </Suspense>
  </Router>
);

export default App;

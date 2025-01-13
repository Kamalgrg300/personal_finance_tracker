/* src/App.tsx */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import "./styles/global.css";

const Home = lazy(() => import("./pages/home"));
const Income = lazy(() => import("./pages/income"));
const Expense = lazy(() => import("./pages/expense"));
const Savings = lazy(() => import("./pages/accounts"));

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;

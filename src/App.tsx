// src/App.tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FinanceProvider } from "./context/FinanceContext";

const Home = lazy(() => import("./pages/Home"));
const Income = lazy(() => import("./pages/Income"));
const Expense = lazy(() => import("./pages/Expense"));
const Savings = lazy(() => import("./pages/Savings"));

const App = () => (
  <FinanceProvider>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </Suspense>
    </Router>
  </FinanceProvider>
);

export default App;

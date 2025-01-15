import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar"; // Correct the import to match the NavBar component's filename
import "./styles/global.css";

const Home = lazy(() => import("./pages/home"));
const Income = lazy(() => import("./pages/income"));
const Expense = lazy(() => import("./pages/expense"));
const Savings = lazy(() => import("./pages/savings"));
const Tracker = lazy(() => import("./pages/tracker"));

const App: React.FC = () => (
  <Router>
    <NavBar />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        {/* Set home as the default path */}
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;

// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ backgroundColor: "#4caf50", padding: "10px" }}>
    <Link to="/" style={{ marginRight: "10px", color: "white" }}>
      Home
    </Link>
    <Link to="/income" style={{ marginRight: "10px", color: "white" }}>
      Income
    </Link>
    <Link to="/expense" style={{ marginRight: "10px", color: "white" }}>
      Expense
    </Link>
    <Link to="/savings" style={{ color: "white" }}>
      Savings
    </Link>
  </nav>
);

export default Navbar;

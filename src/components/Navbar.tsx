/* src/components/Navbar.tsx */
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav style={{ backgroundColor: "#4caf50", padding: "10px" }}>
    <Link to="/" style={{ marginRight: "15px", color: "#fff" }}>
      Home
    </Link>
    <Link to="/income" style={{ marginRight: "15px", color: "#fff" }}>
      Income
    </Link>
    <Link to="/expense" style={{ marginRight: "15px", color: "#fff" }}>
      Expense
    </Link>
    <Link to="/savings" style={{ color: "#fff" }}>
      Accounts
    </Link>
  </nav>
);

export default Navbar;

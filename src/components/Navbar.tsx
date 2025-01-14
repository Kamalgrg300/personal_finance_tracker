import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => (
  <nav className="navbar">
    <div className="logo">Personal Finance Tracker</div>
    <div className="nav-links">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <div className="dropdown">
        <Link to="#" className="nav-link dropdown-link">
          Income
        </Link>
        <div className="dropdown-content">
          <Link to="/income" className="nav-link">
            Income Tracker
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <Link to="#" className="nav-link dropdown-link">
          Expense
        </Link>
        <div className="dropdown-content">
          <Link to="/expense" className="nav-link">
            Expense Tracker
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <Link to="#" className="nav-link dropdown-link">
          Accounts
        </Link>
        <div className="dropdown-content">
          <Link to="/savings" className="nav-link">
            Manage Accounts
          </Link>
        </div>
      </div>
      <Link to="/income-expense-tracker" className="nav-link">
        {" "}
        {/* Updated link */}
        Income & Expense Tracker
      </Link>
    </div>
  </nav>
);

export default Navbar;

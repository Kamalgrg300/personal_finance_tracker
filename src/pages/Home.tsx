import React from "react";
import "./Home.css";

const Home: React.FC = () => (
  <div className="container">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUTdxV7t_MkiO3tJ_UZWO_w2lmy_5E0Fb0D-aOQzOW2X_bAZXPy-LK9-mPqb6dcQqPJxk&usqp=CAU"></img>
    <h1>Welcome to Personal Finance Tracker 2025</h1>
    <div className="box">
      <h2>Track Your Finances Efficiently</h2>
      <p>
        This tool helps you monitor your income, expenses, and savings goals
        with ease and clarity.
      </p>
    </div>

    <div className="box">
      <h2>Key Features</h2>
      <ul>
        <li>
          <strong>Expense Tracking:</strong> Easily categorize and track your
          monthly expenses.
        </li>
        <li>
          <strong>Income Management:</strong> Track and manage your salary,
          freelance, and other income sources.
        </li>
        <li>
          <strong>AI-Powered Insights:</strong> Get personalized financial
          recommendations and predictions.
        </li>
      </ul>
    </div>

    <div className="ai-box">
      <h2>AI-Powered Features</h2>
      <p>
        Leverage advanced AI algorithms to help you make informed financial
        decisions and forecast your future goals.
      </p>
    </div>

    <button>Start Tracking Now</button>
  </div>
);

export default Home;

import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Income.css";

// Registering chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Income: React.FC = () => {
  const [month, setMonth] = useState<string>("");
  const [incomeType, setIncomeType] = useState<string>("Salary");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [incomeData, setIncomeData] = useState<any>({
    salary: 0,
    stocks: 0,
    rental: 0,
    freelance: 0,
  });

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeAmount(Number(e.target.value));
  };

  const handleAddIncome = () => {
    setIncomeData((prevData) => ({
      ...prevData,
      [incomeType.toLowerCase()]:
        prevData[incomeType.toLowerCase()] + incomeAmount,
    }));
    setIncomeAmount(0); // Reset input after adding income
  };

  const pieData = {
    labels: ["Salary", "Stocks", "Rental Income", "Freelance"],
    datasets: [
      {
        data: [
          incomeData.salary,
          incomeData.stocks,
          incomeData.rental,
          incomeData.freelance,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const totalIncome = Object.values(incomeData).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="container">
      <h2>Manage Your Income</h2>
      <p>Here you can add and track all your income sources.</p>

      <div className="form-group">
        <label>Choose Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="form-select"
        >
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="form-group">
        <label>Income Type</label>
        <select
          value={incomeType}
          onChange={(e) => setIncomeType(e.target.value)}
          className="form-select"
        >
          <option value="Salary">Salary</option>
          <option value="Stocks">Stocks</option>
          <option value="Rental Income">Rental Income</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Income Amount (in $)</label>
        <input
          type="number"
          value={incomeAmount}
          onChange={handleIncomeChange}
          className="form-input"
        />
      </div>

      <button onClick={handleAddIncome} className="btn">
        Add Income
      </button>

      <h3>Total Income: ${totalIncome.toFixed(2)}</h3>

      <div className="pie-chart-container">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Income;

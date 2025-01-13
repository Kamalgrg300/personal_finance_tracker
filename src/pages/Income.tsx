/* src/pages/Income.tsx */
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./Income.css";
// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Income: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedIncomeType, setSelectedIncomeType] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [income, setIncome] = useState<any>({
    salary: 0,
    stocks: 0,
    rentalIncome: 0,
    freelance: 0,
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleIncomeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncomeType(e.target.value);
  };

  const handleIncomeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeAmount(Number(e.target.value));
  };

  const handleAddIncome = () => {
    if (selectedIncomeType) {
      setIncome((prevIncome: any) => ({
        ...prevIncome,
        [selectedIncomeType]: prevIncome[selectedIncomeType] + incomeAmount,
      }));
    }
  };

  const totalIncome = Object.values(income).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Data for the pie chart
  const pieChartData = {
    labels: ["Salary", "Stocks", "Rental Income", "Freelance"],
    datasets: [
      {
        data: [
          income.salary,
          income.stocks,
          income.rentalIncome,
          income.freelance,
        ],
        backgroundColor: [
          "#33FF57", // Salary
          "#FF5733", // Stocks
          "#3357FF", // Rental Income
          "#FF33A1", // Freelance
        ],
      },
    ],
  };

  return (
    <div className="income-container">
      <h2 className="title">Manage Your Income</h2>
      <p className="subtitle">
        Track your earnings and manage your financial goals.
      </p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
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
          <label htmlFor="incomeType">Select Income Type</label>
          <select
            id="incomeType"
            value={selectedIncomeType}
            onChange={handleIncomeTypeChange}
          >
            <option value="">--Select Income Type--</option>
            <option value="salary">Salary</option>
            <option value="stocks">Stocks</option>
            <option value="rentalIncome">Rental Income</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="incomeAmount">Enter Income Amount ($)</label>
          <input
            type="number"
            id="incomeAmount"
            value={incomeAmount || ""}
            onChange={handleIncomeAmountChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <button onClick={handleAddIncome} className="add-income-btn">
            Add Income
          </button>
        </div>
      </div>

      <div className="summary">
        {selectedMonth && (
          <p>
            Selected Month: <strong>{selectedMonth}</strong>
          </p>
        )}
        {selectedIncomeType && (
          <p>
            Selected Income Type: <strong>{selectedIncomeType}</strong>
          </p>
        )}
        <p>
          Entered Income Amount: <strong>${incomeAmount.toFixed(2)}</strong>
        </p>
      </div>

      <div className="total-income">
        <h3>Total Income: ${totalIncome.toFixed(2)}</h3>
      </div>

      <div className="pie-chart">
        <h3>Income Distribution</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Income;

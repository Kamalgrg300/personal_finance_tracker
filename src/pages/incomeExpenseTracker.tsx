// IncomeExpenseTracker.tsx
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./IncomeExpenseTracker.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const IncomeExpenseTracker: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState(
    Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString("default", { month: "long" }),
      income: 0,
      expense: 0,
      savings: 0,
    }))
  );

  const handleIncomeChange = (monthIndex: number, income: number) => {
    setMonthlyData((prev) => {
      const updated = [...prev];
      updated[monthIndex].income = income;
      updated[monthIndex].savings = income * 0.2;
      return updated;
    });
  };

  const handleExpenseChange = (monthIndex: number, expense: number) => {
    setMonthlyData((prev) => {
      const updated = [...prev];
      if (expense > updated[monthIndex].income) {
        alert("Expense cannot exceed income!");
        return prev;
      }
      updated[monthIndex].expense = expense;
      return updated;
    });
  };

  const chartData = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((data) => data.income),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expense",
        data: monthlyData.map((data) => data.expense),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Savings",
        data: monthlyData.map((data) => data.savings),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const yearlyProgressData = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Yearly Progress",
        data: monthlyData.map(
          (data) => data.income - (data.expense + data.savings)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="tracker-container">
      <h1>Income vs Expense Tracker</h1>

      <div className="year-selector">
        <label htmlFor="year">Select Year:</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <div className="input-section">
        {monthlyData.map((data, index) => (
          <div key={index} className="month-input">
            <h3>{data.month}</h3>
            <label>
              Income:
              <input
                type="number"
                value={data.income}
                onChange={(e) =>
                  handleIncomeChange(index, Number(e.target.value))
                }
              />
            </label>
            <label>
              Expense:
              <input
                type="number"
                value={data.expense}
                onChange={(e) =>
                  handleExpenseChange(index, Number(e.target.value))
                }
              />
            </label>
            <p>Savings: {data.savings.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h2>Monthly Income vs Expense</h2>
        <Bar data={chartData} />
        <h2>Yearly Progress</h2>
        <Bar data={yearlyProgressData} />
      </div>
    </div>
  );
};

export default IncomeExpenseTracker;

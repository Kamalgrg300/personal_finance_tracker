import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { RootState } from "../redux/store";
import "./tracker.css";

// Register ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Tracker: React.FC = () => {
  // Get the current month
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  // Fetch income and expense data for the current month from Redux store
  const incomeData = useSelector(
    (state: RootState) => state.income[currentMonth]
  );
  const expenseData = useSelector(
    (state: RootState) => state.expense[currentMonth]
  );

  // Calculate total income and total expense
  const totalIncome = incomeData
    ? Object.values(incomeData).reduce((sum, value) => sum + value, 0)
    : 0;

  const totalExpense = expenseData
    ? Object.values(expenseData).reduce((sum, value) => sum + value, 0)
    : 0;

  // Define data for the bar chart
  const barChartData = {
    labels: ["Total Income", "Total Expense"],
    datasets: [
      {
        label: "Amount ($)",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4CAF50", "#FF5733"], // Green for income, Red for expense
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="tracker-container">
      <h2>Income vs Expense Tracker</h2>
      <div className="bar-chart">
        <h3>Income vs Expense for {currentMonth}</h3>
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
};

export default Tracker;

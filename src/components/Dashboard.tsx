// src/components/Dashboard.tsx
import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const { state } = useContext(FinanceContext);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [state.totalIncome, state.totalExpenses],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Financial Overview</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;

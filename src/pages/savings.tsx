import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { RootState } from "../redux/store"; // Update with the correct path to your store
import { setSavings } from "../slices/savingsSlice";
import "./savings.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Savings: React.FC = () => {
  const dispatch = useDispatch();
  const savings = useSelector((state: RootState) => state.savings);

  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [amount, setAmount] = useState<number>(0);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSave = () => {
    if (selectedMonth) {
      dispatch(setSavings({ month: selectedMonth, amount }));
      setAmount(0); // Reset the input field
    }
  };

  // Bar chart data
  const barChartData = {
    labels: Object.keys(savings),
    datasets: [
      {
        label: "Savings ($)",
        data: Object.values(savings),
        backgroundColor: "#4CAF50", // Green color
      },
    ],
  };

  return (
    <div className="savings-container">
      <h2 className="title">Monthly Savings Tracker</h2>
      <p className="subtitle">Enter and track your savings for each month.</p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            {Object.keys(savings).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Enter Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount || ""}
            onChange={handleAmountChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </div>

      <div className="summary">
        <p>
          Savings for <strong>{selectedMonth}</strong>: $
          {(savings[selectedMonth] || 0).toFixed(2)}
        </p>
      </div>

      <div className="bar-chart">
        <h3>Monthly Savings Overview</h3>
        <Bar data={barChartData} />
      </div>
    </div>
  );
};

export default Savings;

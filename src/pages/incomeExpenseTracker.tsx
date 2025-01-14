import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./IncomeExpenseTracker.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const IncomeExpenseTracker: React.FC = () => {
  const [data, setData] = useState<any>({
    January: { income: 0, expense: 0 },
    February: { income: 0, expense: 0 },
    March: { income: 0, expense: 0 },
    April: { income: 0, expense: 0 },
    May: { income: 0, expense: 0 },
    June: { income: 0, expense: 0 },
    July: { income: 0, expense: 0 },
    August: { income: 0, expense: 0 },
    September: { income: 0, expense: 0 },
    October: { income: 0, expense: 0 },
    November: { income: 0, expense: 0 },
    December: { income: 0, expense: 0 },
  });
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpense(Number(e.target.value));
  };

  const handleUpdate = () => {
    if (expense > income) {
      alert("Expense cannot exceed Income!");
      return;
    }
    setData((prevData: any) => ({
      ...prevData,
      [selectedMonth]: {
        income,
        expense,
      },
    }));
    setIncome(0);
    setExpense(0);
  };

  const barChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: `Income vs Expense for ${selectedMonth}`,
        data: [data[selectedMonth].income, data[selectedMonth].expense],
        backgroundColor: ["#33FF57", "#FF5733"],
        borderColor: ["#28a745", "#e74c3c"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [data[selectedMonth].income, data[selectedMonth].expense],
        backgroundColor: ["#33FF57", "#FF5733"],
      },
    ],
  };

  return (
    <div className="tracker-container">
      <img
        src="https://previews.123rf.com/images/bobaa22/bobaa221410/bobaa22141000052/33120788-income-and-expenses-concept.jpg"
        alt="Income and Expense"
      />
      <h2 className="title">Income vs Expense Tracker</h2>
      <p className="subtitle">
        Track and compare your income and expenses monthly.
      </p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {Object.keys(data).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="income">Enter Income ($)</label>
          <input
            type="number"
            id="income"
            value={income || ""}
            onChange={handleIncomeChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense">Enter Expense ($)</label>
          <input
            type="number"
            id="expense"
            value={expense || ""}
            onChange={handleExpenseChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <button onClick={handleUpdate} className="update-btn">
            Update
          </button>
        </div>
      </div>

      <div className="summary">
        <p>
          Income for {selectedMonth}:{" "}
          <strong>${data[selectedMonth].income.toFixed(2)}</strong>
        </p>
        <p>
          Expense for {selectedMonth}:{" "}
          <strong>${data[selectedMonth].expense.toFixed(2)}</strong>
        </p>
      </div>

      <div className="chart-container">
        <div className="bar-chart">
          <h3>
            Income vs Expense Distribution for {selectedMonth} (Bar Graph)
          </h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        <div className="pie-chart">
          <h3>
            Income vs Expense Distribution for {selectedMonth} (Pie Chart)
          </h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseTracker;

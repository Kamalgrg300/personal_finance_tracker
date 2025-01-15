import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome } from "../slices/incomeSlice";
import { RootState } from "../redux/store";
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

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Income: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);
  const [selectedIncomeSource, setSelectedIncomeSource] =
    useState<string>("salary");

  const incomeData = useSelector((state: RootState) => state.income);

  useEffect(() => {
    console.log(
      "Income Data for the selected month:",
      incomeData[selectedMonth]
    );
  }, [selectedMonth, incomeData]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleIncomeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeAmount(Number(e.target.value));
  };

  const handleIncomeSourceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedIncomeSource(e.target.value);
  };

  const handleAddIncome = () => {
    if (selectedMonth && incomeAmount > 0) {
      dispatch(
        addIncome({
          month: selectedMonth,
          source: selectedIncomeSource,
          amount: incomeAmount,
        })
      );
      setIncomeAmount(0); // Reset the income amount field
    }
  };

  // Prepare data for Pie chart
  const incomeForSelectedMonth = incomeData[selectedMonth] || {};
  console.log("Income for Selected Month:", incomeForSelectedMonth);

  // Data for pie chart based on selected income source
  const incomeSources = ["salary", "freelance", "rentalIncome", "stocks"];
  const incomeValues = incomeSources.map(
    (source) => incomeForSelectedMonth[source] || 0
  );

  const pieChartData = {
    labels: incomeSources,
    datasets: [
      {
        data: incomeValues,
        backgroundColor: [
          "#33FF57", // Salary
          "#FF5733", // Freelance
          "#3357FF", // Rental Income
          "#FF33A1", // Stocks
        ],
      },
    ],
  };

  return (
    <div className="income-container">
      <h2 className="title">Add Your Income</h2>
      <p className="subtitle">Track your income for each month.</p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="incomeSource">Select Income Source</label>
          <select
            id="incomeSource"
            value={selectedIncomeSource}
            onChange={handleIncomeSourceChange}
          >
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="rentalIncome">Rental Income</option>
            <option value="stocks">Stocks</option>
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

      <div className="pie-chart">
        <h3>Income Distribution for {selectedMonth}</h3>
        {pieChartData.datasets[0].data.some((value) => value > 0) ? (
          <Pie data={pieChartData} />
        ) : (
          <p>No income data for the selected month.</p>
        )}
      </div>
    </div>
  );
};

export default Income;

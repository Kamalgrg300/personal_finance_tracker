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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Income: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedIncomeType, setSelectedIncomeType] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<number>(0);

  // State to store income data for each month and type
  const [incomeData, setIncomeData] = useState<any>({
    January: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    February: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    March: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    April: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    May: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    June: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    July: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    August: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    September: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    October: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    November: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
    December: { salary: 0, stocks: 0, rentalIncome: 0, freelance: 0 },
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
    if (selectedIncomeType && selectedMonth) {
      setIncomeData((prevData: any) => ({
        ...prevData,
        [selectedMonth]: {
          ...prevData[selectedMonth],
          [selectedIncomeType]:
            prevData[selectedMonth][selectedIncomeType] + incomeAmount,
        },
      }));
      setIncomeAmount(0); // Reset the income amount field
    }
  };

  // Total income for the selected month
  const totalIncomeForMonth = Object.values(
    incomeData[selectedMonth] || {}
  ).reduce((acc: number, curr: number) => acc + curr, 0);

  // Data for the pie chart for the selected month
  const pieChartData = {
    labels: ["Salary", "Stocks", "Rental Income", "Freelance"],
    datasets: [
      {
        data: [
          incomeData[selectedMonth]?.salary || 0,
          incomeData[selectedMonth]?.stocks || 0,
          incomeData[selectedMonth]?.rentalIncome || 0,
          incomeData[selectedMonth]?.freelance || 0,
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
      <img
        src="https://thumbs.dreamstime.com/b/income-streams-words-wooden-block-background-stacks-coins-341370764.jpg"
        alt="Income"
      />
      <h2 className="title">Manage Your Income</h2>
      <p className="subtitle">
        Track your earnings and manage your financial goals.
      </p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {Object.keys(incomeData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
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
        <p>
          Total Income for {selectedMonth}: ${totalIncomeForMonth.toFixed(2)}
        </p>
      </div>

      <div className="pie-chart">
        <h3>Income Distribution for {selectedMonth}</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Income;

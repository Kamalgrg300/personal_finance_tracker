/* src/pages/Expense.tsx */
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
import "./Expense.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Expense: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  // State to store expense data for each month and type
  const [expenseData, setExpenseData] = useState<any>({
    January: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    February: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    March: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    April: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    May: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    June: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    July: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    August: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    September: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    October: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    November: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
    December: { groceries: 0, rent: 0, utilities: 0, entertainment: 0 },
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleExpenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExpenseType(e.target.value);
  };

  const handleExpenseAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpenseAmount(Number(e.target.value));
  };

  const handleAddExpense = () => {
    if (selectedExpenseType && selectedMonth) {
      setExpenseData((prevData: any) => ({
        ...prevData,
        [selectedMonth]: {
          ...prevData[selectedMonth],
          [selectedExpenseType]:
            prevData[selectedMonth][selectedExpenseType] + expenseAmount,
        },
      }));
      setExpenseAmount(0); // Reset the expense amount field
    }
  };

  // Total expense for the selected month
  const totalExpenseForMonth = Object.values(
    expenseData[selectedMonth] || {}
  ).reduce((acc: number, curr: number) => acc + curr, 0);

  // Data for the pie chart for the selected month
  const pieChartData = {
    labels: ["Groceries", "Rent", "Utilities", "Entertainment"],
    datasets: [
      {
        data: [
          expenseData[selectedMonth]?.groceries || 0,
          expenseData[selectedMonth]?.rent || 0,
          expenseData[selectedMonth]?.utilities || 0,
          expenseData[selectedMonth]?.entertainment || 0,
        ],
        backgroundColor: [
          "#FF5733", // Groceries
          "#33FF57", // Rent
          "#3357FF", // Utilities
          "#FF33A1", // Entertainment
        ],
      },
    ],
  };

  return (
    <div className="expense-container">
      <img
        src="https://m.media-amazon.com/images/I/61JfO8-6-FL._AC_UF1000,1000_QL80_.jpg"
        alt="Expenses"
      />
      <h2 className="title">Manage Your Expenses</h2>
      <p className="subtitle">
        Track your expenses and manage your financial budget.
      </p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {Object.keys(expenseData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expenseType">Select Expense Type</label>
          <select
            id="expenseType"
            value={selectedExpenseType}
            onChange={handleExpenseTypeChange}
          >
            <option value="">--Select Expense Type--</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expenseAmount">Enter Expense Amount ($)</label>
          <input
            type="number"
            id="expenseAmount"
            value={expenseAmount || ""}
            onChange={handleExpenseAmountChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <button onClick={handleAddExpense} className="add-expense-btn">
            Add Expense
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
          Total Expense for {selectedMonth}: ${totalExpenseForMonth.toFixed(2)}
        </p>
      </div>

      <div className="pie-chart">
        <h3>Expense Distribution for {selectedMonth}</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Expense;

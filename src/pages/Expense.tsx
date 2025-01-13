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
// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Expense: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenses, setExpenses] = useState<any>({
    food: 0,
    rent: 0,
    clothing: 0,
    entertainment: 0,
    miscellaneous: 0,
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
    if (selectedExpenseType) {
      setExpenses((prevExpenses: any) => ({
        ...prevExpenses,
        [selectedExpenseType]:
          prevExpenses[selectedExpenseType] + expenseAmount,
      }));
    }
  };

  const totalExpense = Object.values(expenses).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Data for the pie chart
  const pieChartData = {
    labels: ["Food", "Rent", "Clothing", "Entertainment", "Miscellaneous"],
    datasets: [
      {
        data: [
          expenses.food,
          expenses.rent,
          expenses.clothing,
          expenses.entertainment,
          expenses.miscellaneous,
        ],
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A1",
          "#F0FF33",
        ],
      },
    ],
  };

  return (
    <div className="expense-container">
      <h2 className="title">Manage Your Expenses</h2>
      <p className="subtitle">
        Keep track of your spending here and manage your budget effectively.
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
          <label htmlFor="expenseType">Select Expense Type</label>
          <select
            id="expenseType"
            value={selectedExpenseType}
            onChange={handleExpenseTypeChange}
          >
            <option value="">--Select Expense Type--</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="expenseAmount">Enter Expense Amount ($)</label>
          <input
            type="number"
            id="expenseAmount"
            value={expenseAmount}
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

      <div className="total-expenses">
        <h3>Total Expenses: ${totalExpense.toFixed(2)}</h3>
      </div>

      <div className="pie-chart">
        <h3>Expense Distribution</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Expense;

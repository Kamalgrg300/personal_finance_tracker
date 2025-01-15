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
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../slices/expenseSlice";
import { RootState } from "../redux/store";
import "./Expense.css";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

// Define a union type for months
type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

// Define the valid expense categories
type ExpenseCategory = "groceries" | "rent" | "utilities" | "entertainment";

// Expense component
const Expense: React.FC = () => {
  const dispatch = useDispatch();
  const expenseData = useSelector((state: RootState) => state.expense);
  const [selectedMonth, setSelectedMonth] = useState<Month>("January");
  const [selectedExpenseCategory, setSelectedExpenseCategory] =
    useState<ExpenseCategory>("groceries");
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value as Month); // Typecast to Month
  };

  const handleExpenseCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedExpenseCategory(e.target.value as ExpenseCategory);
  };

  const handleExpenseAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpenseAmount(Number(e.target.value));
  };

  const handleAddExpense = () => {
    if (selectedExpenseCategory && selectedMonth && expenseAmount > 0) {
      dispatch(
        addExpense({
          month: selectedMonth,
          category: selectedExpenseCategory,
          amount: expenseAmount,
        })
      );
      setExpenseAmount(0); // Reset after adding
    }
  };

  // Explicitly define totalExpenseForMonth type as number
  const totalExpenseForMonth = Object.values(expenseData[selectedMonth]).reduce(
    (acc, curr) => acc + curr,
    0
  ); // Type inference will now be correct

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
          <label htmlFor="expenseCategory">Select Expense Category</label>
          <select
            id="expenseCategory"
            value={selectedExpenseCategory}
            onChange={handleExpenseCategoryChange}
          >
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

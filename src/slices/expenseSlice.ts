import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the valid expense categories
type ExpenseCategory = "groceries" | "rent" | "utilities" | "entertainment";

// Define the structure for expense data
interface ExpenseState {
  [month: string]: {
    groceries: number;
    rent: number;
    utilities: number;
    entertainment: number;
  };
}

const initialState: ExpenseState = {
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
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(
      state,
      action: PayloadAction<{
        month: string;
        category: ExpenseCategory;
        amount: number;
      }>
    ) {
      const { month, category, amount } = action.payload;
      if (state[month]) {
        state[month][category] += amount;
      }
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

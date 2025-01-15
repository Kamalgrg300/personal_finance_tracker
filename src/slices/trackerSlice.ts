import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IncomeData {
  salary: number;
  freelance: number;
  investment: number;
  others: number;
}

interface ExpenseData {
  groceries: number;
  rent: number;
  utilities: number;
  entertainment: number;
}

interface TrackerState {
  income: Record<string, IncomeData>;
  expense: Record<string, ExpenseData>;
}

const initialState: TrackerState = {
  income: {
    January: { salary: 0, freelance: 0, investment: 0, others: 0 },
    February: { salary: 0, freelance: 0, investment: 0, others: 0 },
    March: { salary: 0, freelance: 0, investment: 0, others: 0 },
    April: { salary: 0, freelance: 0, investment: 0, others: 0 },
    May: { salary: 0, freelance: 0, investment: 0, others: 0 },
    June: { salary: 0, freelance: 0, investment: 0, others: 0 },
    July: { salary: 0, freelance: 0, investment: 0, others: 0 },
    August: { salary: 0, freelance: 0, investment: 0, others: 0 },
    September: { salary: 0, freelance: 0, investment: 0, others: 0 },
    October: { salary: 0, freelance: 0, investment: 0, others: 0 },
    November: { salary: 0, freelance: 0, investment: 0, others: 0 },
    December: { salary: 0, freelance: 0, investment: 0, others: 0 },
  },
  expense: {
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
  },
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    // Add income for a specific month
    addIncome(
      state,
      action: PayloadAction<{
        month: string;
        source: keyof IncomeData;
        amount: number;
      }>
    ) {
      const { month, source, amount } = action.payload;
      if (state.income[month]) {
        state.income[month][source] += amount;
      }
    },
    // Add expense for a specific month
    addExpense(
      state,
      action: PayloadAction<{
        month: string;
        category: keyof ExpenseData;
        amount: number;
      }>
    ) {
      const { month, category, amount } = action.payload;
      if (state.expense[month]) {
        state.expense[month][category] += amount;
      }
    },
  },
});

// Export actions and reducer
export const { addIncome, addExpense } = trackerSlice.actions;
export default trackerSlice.reducer;

// src/slices/incomeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IncomeData {
  [source: string]: number; // Allow dynamic income sources as keys
}

interface IncomeState {
  [month: string]: IncomeData;
}

const initialState: IncomeState = {
  January: { salary: 0, freelance: 0, rentalIncome: 0, stocks: 0 },
  February: { salary: 0, freelance: 0, rentalIncome: 0, stocks: 0 },
  March: { salary: 0, freelance: 0, rentalIncome: 0, stocks: 0 },
  // Other months...
  December: { salary: 0, freelance: 0, rentalIncome: 0, stocks: 0 },
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (
      state,
      action: PayloadAction<{ month: string; source: string; amount: number }>
    ) => {
      const { month, source, amount } = action.payload;
      if (state[month]) {
        // Add the income to the correct source for the selected month
        state[month][source] = (state[month][source] || 0) + amount;
      }
    },
  },
});

export const { addIncome } = incomeSlice.actions;
export default incomeSlice.reducer;

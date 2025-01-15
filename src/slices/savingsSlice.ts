import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for the savings state
interface SavingsState {
  [month: string]: number;
}

// Initial state with zero savings for each month
const initialState: SavingsState = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0,
};

const savingsSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {
    setSavings(
      state,
      action: PayloadAction<{ month: string; amount: number }>
    ) {
      const { month, amount } = action.payload;
      if (state[month] !== undefined) {
        state[month] = amount; // Set savings for the selected month
      }
    },
  },
});

export const { setSavings } = savingsSlice.actions;
export default savingsSlice.reducer;

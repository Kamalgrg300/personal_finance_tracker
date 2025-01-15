// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../slices/incomeSlice";
import expenseReducer from "../slices/expenseSlice";
import trackerReducer from "../slices/trackerSlice";
import savingsReducer from "../slices/savingsSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    tracker: trackerReducer,
    savings: savingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

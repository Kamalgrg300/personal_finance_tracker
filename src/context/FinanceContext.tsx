// src/context/FinanceContext.tsx
import React, { createContext, useReducer, ReactNode } from "react";

type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
};

type FinanceState = {
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
};

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string };

const initialState: FinanceState = {
  transactions: [],
  totalIncome: 0,
  totalExpenses: 0,
};

const FinanceReducer = (state: FinanceState, action: Action): FinanceState => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const updatedTransactions = [...state.transactions, action.payload];
      const updatedIncome = updatedTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const updatedExpenses = updatedTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...state,
        transactions: updatedTransactions,
        totalIncome: updatedIncome,
        totalExpenses: updatedExpenses,
      };

    case "DELETE_TRANSACTION":
      const filteredTransactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      return {
        ...state,
        transactions: filteredTransactions,
      };

    default:
      return state;
  }
};

export const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FinanceReducer, initialState);
  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

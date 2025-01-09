// src/components/TransactionForm.tsx
import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionForm = () => {
  const { dispatch } = useContext(FinanceContext);
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: Math.random().toString(),
        type,
        category,
        amount,
        date: new Date().toISOString(),
      },
    });
    setCategory("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;

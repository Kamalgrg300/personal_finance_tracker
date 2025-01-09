// src/components/Transactions.tsx
import React from "react";
import { useFetchTransactions } from "../hooks/useFetchTransactions";

const Transactions = () => {
  const { transactions, loading, error } = useFetchTransactions();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date} - {transaction.category}: ${transaction.amount} (
            {transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;

// src/hooks/useFetchTransactions.ts
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
}

export const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const mockData: Transaction[] = [
          {
            id: "1",
            type: "income",
            category: "Salary",
            amount: 5000,
            date: "2025-01-01",
          },
          {
            id: "2",
            type: "expense",
            category: "Groceries",
            amount: 300,
            date: "2025-01-02",
          },
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        setTransactions(mockData);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

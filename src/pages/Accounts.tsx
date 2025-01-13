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
import "./Accounts.css";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Accounts: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [accountAmount, setAccountAmount] = useState<number>(0);
  const [accounts, setAccounts] = useState<any>({
    checking: 0,
    saving: 0,
    fixed: 0,
  });

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountType(e.target.value);
  };

  const handleAccountAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountAmount(Number(e.target.value));
  };

  const handleAddAccount = () => {
    if (selectedAccountType) {
      setAccounts((prevAccounts: any) => ({
        ...prevAccounts,
        [selectedAccountType]:
          prevAccounts[selectedAccountType] + accountAmount,
      }));
    }
  };

  const totalAccounts = Object.values(accounts).reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Data for the pie chart
  const pieChartData = {
    labels: ["Checking", "Saving", "Fixed"],
    datasets: [
      {
        data: [accounts.checking, accounts.saving, accounts.fixed],
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
      },
    ],
  };

  return (
    <div className="accounts-container">
      <h2 className="title">Manage Your Accounts</h2>
      <p className="subtitle">Track and manage your income accounts here.</p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accountType">Select Account Type</label>
          <select
            id="accountType"
            value={selectedAccountType}
            onChange={handleAccountTypeChange}
          >
            <option value="">--Select Account Type--</option>
            <option value="checking">Checking</option>
            <option value="saving">Saving</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accountAmount">Enter Amount ($)</label>
          <input
            type="number"
            id="accountAmount"
            value={accountAmount}
            onChange={handleAccountAmountChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <button onClick={handleAddAccount} className="add-account-btn">
            Add Account
          </button>
        </div>
      </div>

      <div className="total-accounts">
        <h3>Total Accounts: ${totalAccounts.toFixed(2)}</h3>
      </div>

      <div className="pie-chart">
        <h3>Account Distribution</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Accounts;

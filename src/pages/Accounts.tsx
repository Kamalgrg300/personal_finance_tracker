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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const Accounts: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedAccountType, setSelectedAccountType] = useState<string>("");
  const [accountAmount, setAccountAmount] = useState<number>(0);

  // State to store account data for each month and type
  const [accountData, setAccountData] = useState<any>({
    January: { savings: 0, checking: 0, credit: 0, investments: 0 },
    February: { savings: 0, checking: 0, credit: 0, investments: 0 },
    March: { savings: 0, checking: 0, credit: 0, investments: 0 },
    April: { savings: 0, checking: 0, credit: 0, investments: 0 },
    May: { savings: 0, checking: 0, credit: 0, investments: 0 },
    June: { savings: 0, checking: 0, credit: 0, investments: 0 },
    July: { savings: 0, checking: 0, credit: 0, investments: 0 },
    August: { savings: 0, checking: 0, credit: 0, investments: 0 },
    September: { savings: 0, checking: 0, credit: 0, investments: 0 },
    October: { savings: 0, checking: 0, credit: 0, investments: 0 },
    November: { savings: 0, checking: 0, credit: 0, investments: 0 },
    December: { savings: 0, checking: 0, credit: 0, investments: 0 },
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
    if (selectedAccountType && selectedMonth) {
      setAccountData((prevData: any) => ({
        ...prevData,
        [selectedMonth]: {
          ...prevData[selectedMonth],
          [selectedAccountType]:
            prevData[selectedMonth][selectedAccountType] + accountAmount,
        },
      }));
      setAccountAmount(0); // Reset the account amount field
    }
  };

  // Total account balance for the selected month
  const totalAccountsForMonth = Object.values(
    accountData[selectedMonth] || {}
  ).reduce((acc: number, curr: number) => acc + curr, 0);

  // Data for the pie chart for the selected month
  const pieChartData = {
    labels: ["Savings", "Checking", "Credit", "Investments"],
    datasets: [
      {
        data: [
          accountData[selectedMonth]?.savings || 0,
          accountData[selectedMonth]?.checking || 0,
          accountData[selectedMonth]?.credit || 0,
          accountData[selectedMonth]?.investments || 0,
        ],
        backgroundColor: [
          "#33FF57", // Savings
          "#FF5733", // Checking
          "#3357FF", // Credit
          "#FF33A1", // Investments
        ],
      },
    ],
  };

  return (
    <div className="accounts-container">
      <img
        src="https://npscu.ca/wp-content/uploads/2023/09/4.png"
        alt="Accounts"
      />
      <h2 className="title">Manage Your Accounts</h2>
      <p className="subtitle">
        Track your account balances and maintain financial health.
      </p>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="month">Select Month</label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">--Select Month--</option>
            {Object.keys(accountData).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
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
            <option value="savings">Savings</option>
            <option value="checking">Checking</option>
            <option value="credit">Credit</option>
            <option value="investments">Investments</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accountAmount">Enter Account Amount ($)</label>
          <input
            type="number"
            id="accountAmount"
            value={accountAmount || ""}
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

      <div className="summary">
        {selectedMonth && (
          <p>
            Selected Month: <strong>{selectedMonth}</strong>
          </p>
        )}
        <p>
          Total Accounts Balance for {selectedMonth}: $
          {totalAccountsForMonth.toFixed(2)}
        </p>
      </div>

      <div className="pie-chart">
        <h3>Account Distribution for {selectedMonth}</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Accounts;

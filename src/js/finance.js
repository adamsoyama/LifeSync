// 🌟 Import Modules
import { getExchangeRate, getStockData } from "./finData.js";
import { injectHeader, injectFooter, animateCircles } from "./services.js";

// 🌍 DOM Elements
const totalIncomeDisplay = document.getElementById("total-income");
const totalExpensesDisplay = document.getElementById("total-expenses");
const currentBalanceDisplay = document.getElementById("current-balance");
const usdAmountInput = document.getElementById("usd-amount");
const currencySelect = document.getElementById("currency-select");
const convertCurrencyBtn = document.getElementById("convert-currency");
const exchangeRateDisplay = document.getElementById("exchange-rate");
const convertedAmountDisplay = document.getElementById("converted-amount");
const stockSymbolInput = document.getElementById("stock-symbol");
const fetchStockBtn = document.getElementById("fetch-stock");
const stockPriceDisplay = document.getElementById("stock-price");
const marketCapDisplay = document.getElementById("market-cap");
const stockHistoryList = document.getElementById("stock-history");
const transactionList = document.getElementById("transaction-list");
const healthScoreDisplay = document.getElementById("health-score");
const returnDashboardBtn = document.getElementById("return-dashboard");
const monthlyBudgetInput = document.getElementById("monthly-budget");
const saveBudgetBtn = document.getElementById("save-budget");

// ➕ Create and insert income/expense buttons
const addIncomeBtn = document.createElement("button");
const addExpenseBtn = document.createElement("button");
addIncomeBtn.textContent = "Add Income";
addExpenseBtn.textContent = "Add Expense";
document.querySelector(".summary-box").appendChild(addIncomeBtn);
document.querySelector(".summary-box").appendChild(addExpenseBtn);

// 📦 Local Data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let budgetData = JSON.parse(localStorage.getItem("monthlyBudget")) || {
  amount: 0,
  month: new Date().getMonth(),
};

// 📌 Update Dashboard Summary
function updateDashboardSummary() {
  const summary = {
    income: totalIncomeDisplay.innerText,
    expenses: totalExpensesDisplay.innerText,
    balance: currentBalanceDisplay.innerText,
    exchangeRate: exchangeRateDisplay.innerText,
    stockPrice: stockPriceDisplay.innerText,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("financeSummary", JSON.stringify(summary));
}

// 📊 Update Overview Totals
function updateOverview() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;
  totalIncomeDisplay.innerText = `₦${income}`;
  totalExpensesDisplay.innerText = `₦${expenses}`;
  currentBalanceDisplay.innerText = `₦${balance}`;
  updateHealthScore(balance);
  updateDashboardSummary();
}

// 📈 Update Health Score
function updateHealthScore(balance) {
  const { amount } = budgetData;
  if (!amount || amount <= 0) {
    healthScoreDisplay.innerText = "Set a budget to evaluate.";
    return;
  }

  const usagePercent = (balance / amount) * 100;
  let score = "";

  if (usagePercent >= 100) score = "Excellent! You're managing well.";
  else if (usagePercent >= 80) score = "Good. Monitor expenses.";
  else if (usagePercent >= 50) score = "Caution. Approaching limit.";
  else score = "Overspent! Reconsider budget.";

  healthScoreDisplay.innerText = `${score} (${usagePercent.toFixed(
    1
  )}% of budget)`;
}

// 📋 Render Transactions
function renderTransactions() {
  const recent = transactions.slice(-5).reverse();
  transactionList.innerHTML =
    recent
      .map(
        (t) =>
          `<div class="transaction-item">${t.type.toUpperCase()}: ₦${
            t.amount
          } - ${t.note || "No note"}</div>`
      )
      .join("") || "No records found.";
}

// ➕ Prompt Add Transaction
function promptTransaction(type) {
  const amount = parseFloat(prompt(`Enter ${type} amount:`));
  if (!amount || amount <= 0) return;
  const note = prompt("Add a note (optional):");
  transactions.push({ type, amount, note, date: new Date().toISOString() });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateOverview();
}

// 🔄 Currency Conversion
async function handleCurrencyConversion() {
  try {
    exchangeRateDisplay.innerText = "Fetching rates...";
    const target = currencySelect.value;
    const amount = parseFloat(usdAmountInput.value) || 0;
    const rate = await getExchangeRate(target);
    exchangeRateDisplay.innerText = `1 USD = ${rate.toFixed(2)} ${target}`;
    convertedAmountDisplay.innerText = `${(amount * rate).toFixed(
      2
    )} ${target}`;
    updateDashboardSummary();
  } catch {
    exchangeRateDisplay.innerText = "Conversion failed!";
  }
}

// 📈 Fetch Stock Data
async function handleStockFetch() {
  try {
    stockPriceDisplay.innerText = "Fetching...";
    const symbol = stockSymbolInput.value.toUpperCase();
    if (!symbol) return;
    const data = await getStockData(symbol);
    if (!data.price || data.price === "Unavailable") {
      stockPriceDisplay.innerText = "Unavailable";
    } else {
      stockPriceDisplay.innerText = `${symbol}: $${data.price}`;
      stockHistoryList.innerHTML = `<li>${new Date(
        data.date
      ).toLocaleDateString()}: $${data.price}</li>`;
    }
    updateDashboardSummary();
  } catch {
    stockPriceDisplay.innerText = "Fetch failed!";
  }
}

// 💾 Save Monthly Budget
function handleBudgetSave() {
  const now = new Date();
  const thisMonth = now.getMonth();
  if (budgetData.month === thisMonth) {
    alert("You can only update the budget next month.");
    monthlyBudgetInput.value = budgetData.amount;
    return;
  }

  const amount = parseFloat(monthlyBudgetInput.value);
  if (amount > 0) {
    budgetData = { amount, month: thisMonth };
    localStorage.setItem("monthlyBudget", JSON.stringify(budgetData));
    alert("Budget saved!");
    updateHealthScore(
      parseFloat(currentBalanceDisplay.innerText.replace("₦", "")) || 0
    );
  }
}

// 🌟 Initial Setup
convertCurrencyBtn.addEventListener("click", handleCurrencyConversion);
fetchStockBtn.addEventListener("click", handleStockFetch);
saveBudgetBtn.addEventListener("click", handleBudgetSave);
addIncomeBtn.addEventListener("click", () => promptTransaction("income"));
addExpenseBtn.addEventListener("click", () => promptTransaction("expense"));
returnDashboardBtn.addEventListener("click", () => {
  window.location.href = "/src/pages/dashboard.html";
});

// 🏁 Load Page Data
document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  animateCircles();
  renderTransactions();
  updateOverview();
  monthlyBudgetInput.value = budgetData.amount;
});

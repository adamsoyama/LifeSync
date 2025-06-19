// 🌟 Import Modules
import { getExchangeRate, getStockData } from "./finData.js"; // ✅ Use .js extension in Vite
import { injectHeader, injectFooter, animateCircles } from "./services.mjs";

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

const dashboardFinanceSection = document.getElementById(
  "dashboard-finance-summary"
);

// 📌 Function: Generate Financial Summary for Dashboard
function updateDashboardSummary() {
  if (!dashboardFinanceSection) return;

  const financialSummary = {
    income: totalIncomeDisplay.innerText,
    expenses: totalExpensesDisplay.innerText,
    balance: currentBalanceDisplay.innerText,
    exchangeRate: exchangeRateDisplay.innerText,
    stockPrice: stockPriceDisplay.innerText,
  };

  dashboardFinanceSection.innerHTML = `
    <h3>Finance Overview</h3>
    <p><strong>Total Income:</strong> ${financialSummary.income}</p>
    <p><strong>Total Expenses:</strong> ${financialSummary.expenses}</p>
    <p><strong>Current Balance:</strong> ${financialSummary.balance}</p>
    <p><strong>Latest Exchange Rate:</strong> ${financialSummary.exchangeRate}</p>
    <p><strong>Latest Stock Price:</strong> ${financialSummary.stockPrice}</p>
  `;
}

// 📌 Function: Handle Currency Conversion
async function handleCurrencyConversion() {
  try {
    exchangeRateDisplay.innerText = "Fetching rates...";
    const targetCurrency = currencySelect.value;
    const usdAmount = parseFloat(usdAmountInput.value) || 0;

    const rate = await getExchangeRate(targetCurrency);
    if (!rate || isNaN(rate)) {
      exchangeRateDisplay.innerText = "Error fetching data!";
      return;
    }

    exchangeRateDisplay.innerText = `1 USD = ${rate.toFixed(
      2
    )} ${targetCurrency}`;
    convertedAmountDisplay.innerText = `${(usdAmount * rate).toFixed(
      2
    )} ${targetCurrency}`;

    updateDashboardSummary();
  } catch (error) {
    console.error("❌ Currency Conversion Error:", error);
    exchangeRateDisplay.innerText = "Conversion failed!";
  }
}

// 📌 Function: Handle Stock Data Fetch
async function handleStockFetch() {
  try {
    stockPriceDisplay.innerText = "Fetching stock data...";
    const tickerSymbol = stockSymbolInput.value.toUpperCase();

    if (!tickerSymbol) {
      stockPriceDisplay.innerText = "Enter a valid stock symbol!";
      return;
    }

    const stock = await getStockData(tickerSymbol);
    if (stock.fallback || !stock.price) {
      stockPriceDisplay.innerText = "Stock data unavailable!";
      return;
    }

    stockPriceDisplay.innerText = `${tickerSymbol}: $${stock.price}`;
    marketCapDisplay.innerText = "N/A"; // You can integrate this if supported
    stockHistoryList.innerHTML = `
      <li>Date: ${new Date(stock.date).toLocaleDateString()}</li>
      <li>Close Price: $${stock.price}</li>
    `;

    updateDashboardSummary();
  } catch (error) {
    console.error("❌ Stock Fetch Error:", error);
    stockPriceDisplay.innerText = "Stock fetch failed!";
  }
}

// 🌟 Event Listeners
convertCurrencyBtn.addEventListener("click", handleCurrencyConversion);
fetchStockBtn.addEventListener("click", handleStockFetch);

// 🔄 Auto-refresh financial data every 30 minutes
setInterval(() => {
  handleCurrencyConversion();
  handleStockFetch();
  updateDashboardSummary();
}, 1800000);

// 🏗️ Page Setup & Animations
document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  animateCircles();
  updateDashboardSummary();
});

// 🌟 Import Modules
import {
  getExchangeRate,
  getStockData,
} from "../mentalhealth/modules/finData.mjs";
import {
  injectHeader,
  injectFooter,
  animateCircles,
} from "../mentalhealth/modules/services.mjs";

// 🌍 DOM Elements
const financeMain = document.getElementById("finance-main");
const totalIncomeDisplay = document.getElementById("total-income");
const totalExpensesDisplay = document.getElementById("total-expenses");
const currentBalanceDisplay = document.getElementById("current-balance");

const currencySelect = document.getElementById("currency-select");
const convertCurrencyBtn = document.getElementById("convert-currency");
const exchangeRateDisplay = document.getElementById("exchange-rate");

const stockSymbolInput = document.getElementById("stock-symbol");
const fetchStockBtn = document.getElementById("fetch-stock");
const stockPriceDisplay = document.getElementById("stock-price");

const dashboardFinanceSection = document.getElementById(
  "dashboard-finance-summary"
);

// 📌 Function: Generate Financial Summary for Dashboard
function updateDashboardSummary() {
  const financialSummary = {
    income: totalIncomeDisplay.innerText,
    expenses: totalExpensesDisplay.innerText,
    balance: currentBalanceDisplay.innerText,
    latestExchangeRate: exchangeRateDisplay.innerText,
    latestStockPrice: stockPriceDisplay.innerText,
  };

  dashboardFinanceSection.innerHTML = `
    <h3>Finance Overview</h3>
    <p><strong>Total Income:</strong> ${financialSummary.income}</p>
    <p><strong>Total Expenses:</strong> ${financialSummary.expenses}</p>
    <p><strong>Current Balance:</strong> ${financialSummary.balance}</p>
    <p><strong>Latest Exchange Rate:</strong> ${financialSummary.latestExchangeRate}</p>
    <p><strong>Latest Stock Price:</strong> ${financialSummary.latestStockPrice}</p>
  `;
}

// 📌 Function: Handle Currency Conversion
async function handleCurrencyConversion() {
  try {
    exchangeRateDisplay.innerText = "Fetching rates...";

    const targetCurrency = currencySelect.value;
    if (!targetCurrency) {
      exchangeRateDisplay.innerText = "Please select a currency!";
      return;
    }

    const exchangeData = await getExchangeRate(targetCurrency);

    if (exchangeData.error) {
      exchangeRateDisplay.innerText = "Error fetching data!";
      return;
    }

    exchangeRateDisplay.innerText = `1 NGN = ${exchangeData.exchange_rate} ${targetCurrency}`;
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

    const stockData = await getStockData(tickerSymbol);

    if (stockData.error) {
      stockPriceDisplay.innerText = "Stock data unavailable!";
      return;
    }

    stockPriceDisplay.innerText = `Current Price: ${stockData.current_price} USD`;
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

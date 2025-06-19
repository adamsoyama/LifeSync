import { fetchData, CURRENCY_LAYER_KEY, TWELVE_DATA_API_KEY } from "./api.js";

const FIXER_API_URL = "https://api.apilayer.com/fixer/latest";
const TWELVE_DATA_API_URL = "https://api.twelvedata.com/time_series";

// ✅ Get Exchange Rate from USD to target currency (e.g., EUR)
export async function getExchangeRate(targetCurrency) {
  const url = `${FIXER_API_URL}?base=USD&symbols=${targetCurrency}`;
  const headers = {
    apikey: CURRENCY_LAYER_KEY, // 🔐 From Vite .env
  };

  const data = await fetchData(url, { headers });

  if (data?.rates?.[targetCurrency]) {
    return data.rates[targetCurrency];
  } else {
    console.warn("Fallback to 1.0 rate");
    return 1.0; // Fallback
  }
}

// ✅ Get Stock Data for a Ticker Symbol (e.g., AAPL)
export async function getStockData(tickerSymbol) {
  const url = `${TWELVE_DATA_API_URL}?symbol=${tickerSymbol}&interval=1day&outputsize=1&apikey=${TWELVE_DATA_API_KEY}`;
  const data = await fetchData(url);

  console.log("📈 Twelve Data response:", data); // ✅ DEBUG THIS

  if (data?.values?.length > 0) {
    const latest = data.values[0];
    return {
      symbol: tickerSymbol,
      price: latest.close,
      date: latest.datetime,
    };
  }

  return {
    symbol: tickerSymbol,
    price: "Unavailable",
    date: "",
    fallback: true,
  };
}

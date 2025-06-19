const CURRENCY_LAYER_API_URL = "https://api.currencylayer.com/live";
const MARKETSTACK_API_URL = "https://api.marketstack.com/v1/eod";

// 🔐 For local testing only — do NOT use this in production
const API_KEY = "c5d1d5faae1fac11ff73d7be16a7e98c";

// Utility function with retry and fallback logic
async function fetchData(url, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch failed (attempt ${attempt + 1}):`, error.message);
      if (attempt === retries - 1) {
        localStorage.setItem(
          "lastApiError",
          JSON.stringify({ url, error: error.message })
        );
        return null; // Final failure returns null
      }
      await new Promise((res) => setTimeout(res, 1000)); // Retry delay
    }
  }
}

// ✅ Currency Exchange (Base: USD)
export async function getExchangeRate(targetCurrency) {
  const url = `${CURRENCY_LAYER_API_URL}?access_key=${API_KEY}&source=USD&currencies=${targetCurrency}`;
  const data = await fetchData(url);

  return data?.quotes
    ? data.quotes[`USD${targetCurrency}`]
    : { rate: 1.0, fallback: true };
}

// ✅ Stock Market Insights (Real-time Fetch)
export async function getStockData(tickerSymbol) {
  const url = `${MARKETSTACK_API_URL}?access_key=${API_KEY}&symbols=${tickerSymbol}`;
  const data = await fetchData(url);

  return (
    data?.data?.[0] || {
      symbol: tickerSymbol,
      price: "Unavailable",
      fallback: true,
    }
  );
}

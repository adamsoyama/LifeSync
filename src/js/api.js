// 📦 Universal API Fetching Utility
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ API Fetch Error:", error.message);
    return { error: error.message };
  }
}

// 🔐 API Keys pulled from Vite environment
export const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
export const TWELVE_DATA_API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

// 📦 Universal API Fetching Utility
export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, { ...options });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    // Attempt to parse JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ API Fetch Error:", error.message);
    return { error: error.message }; // Provide consistent error object
  }
}

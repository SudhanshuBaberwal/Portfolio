const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchCodingStats(signal) {
  const url = `${API_BASE}/api/coding-stats`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    signal,
  });

  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }

  return await res.json();
}

/** Written by Zoie D, 5/30/26 */

export const fetchQuote = async (category, limit = 1) => {
  const params = new URLSearchParams({ category, limit });
  const res = await fetch(`https://quotesapi.prayushadhikari.com.np/api/quotes?${params}`);
  const { data, meta } = await res.json();
  return { quotes: data, total: meta.total };
};
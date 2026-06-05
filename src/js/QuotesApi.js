export async function fetchQuote() {
    try {
        const res = await fetch('https://quotesapi.prayushadhikari.com.np/api/quotescategories=wisdom,motivation&match_categories=all');
        if (!res.ok) throw new Error ('Quote could not load');
        const { data } = await res.json();
        return data[0];
    } catch (error) {
        console.error('Quote could not load:', error);
        return null;
    }
}
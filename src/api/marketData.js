export const INDEX_CONFIG = [
  { symbol: '^DJI', name: 'DOW JONES', region: 'Americas' },
  { symbol: '^GSPC', name: 'S&P 500', region: 'Americas' },
  { symbol: '^IXIC', name: 'NASDAQ', region: 'Americas' },
  { symbol: '^BVSP', name: 'IBOVESPA', region: 'Americas' },
  { symbol: '^STOXX50E', name: 'Euro Stoxx 50', region: 'EMEA' },
  { symbol: '^FTSE', name: 'FTSE 100', region: 'EMEA' },
  { symbol: '^FCHI', name: 'CAC 40', region: 'EMEA' },
  { symbol: '^GDAXI', name: 'DAX', region: 'EMEA' },
  { symbol: '^N225', name: 'NIKKEI 225', region: 'APAC' },
  { symbol: '^HSI', name: 'HANG SENG', region: 'APAC' },
  { symbol: '^SSEC', name: 'SHANGHAI', region: 'APAC' },
  { symbol: '^AXJO', name: 'S&P/ASX 200', region: 'APAC' }
];

const formatNumber = (num) =>
  num?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export async function fetchGlobalIndices() {
  const symbols = INDEX_CONFIG.map((i) => encodeURIComponent(i.symbol)).join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const quotes = json.quoteResponse?.result || [];

    const data = { Americas: [], EMEA: [], APAC: [] };

    INDEX_CONFIG.forEach((cfg) => {
      const quote = quotes.find((q) => q.symbol === cfg.symbol);
      if (!quote) return;
      const regionData = data[cfg.region];
      regionData.push({
        id: regionData.length + 1,
        name: cfg.name,
        value: formatNumber(quote.regularMarketPrice),
        netChg: `${quote.regularMarketChange >= 0 ? '+' : ''}${formatNumber(quote.regularMarketChange)}`,
        pctChg: `${quote.regularMarketChangePercent >= 0 ? '+' : ''}${formatNumber(quote.regularMarketChangePercent)}%`,
        ytd:
          quote.ytdReturn !== undefined
            ? `${quote.ytdReturn >= 0 ? '+' : ''}${formatNumber(quote.ytdReturn)}%`
            : 'N/A'
      });
    });

    return data;
  } catch (err) {
    console.error('Failed to fetch global indices', err);
    return { Americas: [], EMEA: [], APAC: [] };
  }
}

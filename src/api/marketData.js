const indicesMeta = [
  { id: 11, symbol: '^DJI', name: 'DOW JONES', region: 'Americas' },
  { id: 12, symbol: '^GSPC', name: 'S&P 500', region: 'Americas' },
  { id: 13, symbol: '^IXIC', name: 'NASDAQ', region: 'Americas' },
  { id: 14, symbol: '^GSPTSE', name: 'S&P/TSX Comp', region: 'Americas' },
  { id: 16, symbol: '^BVSP', name: 'IBOVESPA', region: 'Americas' },
  { id: 21, symbol: '^STOXX50E', name: 'Euro Stoxx 50', region: 'EMEA' },
  { id: 22, symbol: '^FTSE', name: 'FTSE 100', region: 'EMEA' },
  { id: 23, symbol: '^FCHI', name: 'CAC 40', region: 'EMEA' },
  { id: 24, symbol: '^GDAXI', name: 'DAX', region: 'EMEA' },
  { id: 31, symbol: '^N225', name: 'NIKKEI 225', region: 'APAC' },
  { id: 32, symbol: '^HSI', name: 'HANG SENG', region: 'APAC' },
  { id: 33, symbol: '000001.SS', name: 'SHANGHAI', region: 'APAC' },
  { id: 34, symbol: '^AXJO', name: 'S&P/ASX 200', region: 'APAC' }
];

export async function fetchGlobalIndices() {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${indicesMeta.map(i => i.symbol).join(',')}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch market data');
  }
  const json = await res.json();
  const quotes = json.quoteResponse.result;
  const grouped = { Americas: [], EMEA: [], APAC: [] };

  indicesMeta.forEach(meta => {
    const quote = quotes.find(q => q.symbol === meta.symbol);
    if (quote) {
      const netChg = quote.regularMarketChange ?? 0;
      const pctChg = quote.regularMarketChangePercent ?? 0;
      const ytd = quote.ytdReturn != null ? quote.ytdReturn * 100 : null;
      const item = {
        id: meta.id,
        name: meta.name,
        value: quote.regularMarketPrice?.toFixed(2) ?? '0.00',
        netChg: `${netChg >= 0 ? '+' : ''}${netChg.toFixed(2)}`,
        pctChg: `${pctChg >= 0 ? '+' : ''}${pctChg.toFixed(2)}%`,
        ytd: ytd != null ? `${ytd >= 0 ? '+' : ''}${ytd.toFixed(2)}%` : 'N/A'
      };
      grouped[meta.region].push(item);
    }
  });

  return grouped;
}

export default fetchGlobalIndices;

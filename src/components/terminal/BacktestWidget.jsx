import React, { useState } from "react";

const computeSMA = (data, period) => {
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(null);
      continue;
    }
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, val) => acc + val, 0);
    sma.push(sum / period);
  }
  return sma;
};

const BacktestWidget = ({ initialTicker = "AAPL" }) => {
  const [ticker, setTicker] = useState(initialTicker);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runBacktest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d`;
      const response = await fetch(url);
      const json = await response.json();
      const closes = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];

      if (!closes.length) {
        throw new Error("No data available");
      }

      const shortPeriod = 20;
      const longPeriod = 50;
      const shortMA = computeSMA(closes, shortPeriod);
      const longMA = computeSMA(closes, longPeriod);

      let position = 0;
      let entry = 0;
      let equity = 1;

      for (let i = 1; i < closes.length; i++) {
        if (shortMA[i - 1] == null || longMA[i - 1] == null) continue;

        const prevShort = shortMA[i - 1];
        const prevLong = longMA[i - 1];
        const currShort = shortMA[i];
        const currLong = longMA[i];

        if (position === 0 && prevShort <= prevLong && currShort > currLong) {
          position = 1;
          entry = closes[i];
        } else if (position === 1 && prevShort >= prevLong && currShort < currLong) {
          equity *= closes[i] / entry;
          position = 0;
        }
      }

      if (position === 1) {
        equity *= closes[closes.length - 1] / entry;
      }

      const returnPct = (equity - 1) * 100;
      setResult(returnPct);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-background text-foreground">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          className="px-2 py-1 border rounded w-32"
        />
        <button
          onClick={runBacktest}
          className="px-4 py-1 bg-primary text-primary-foreground rounded"
        >
          Backtest
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result !== null && (
        <p>
          Return: {result.toFixed(2)}%
        </p>
      )}
    </div>
  );
};

export default BacktestWidget;


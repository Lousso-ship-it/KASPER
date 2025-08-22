import { useState } from 'react';

// Simple backtesting widget using a moving average crossover strategy
const BacktestWidget = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [shortWindow, setShortWindow] = useState(50);
  const [longWindow, setLongWindow] = useState(200);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndBacktest = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.chart?.result?.length) throw new Error('Invalid data');
      const closes = data.chart.result[0].indicators.quote[0].close;
      const smaShort = movingAverage(closes, shortWindow);
      const smaLong = movingAverage(closes, longWindow);

      let position = 0; // 0 = no position, price of entry if >0
      let equity = 1; // start with 1 unit of capital
      for (let i = longWindow; i < closes.length; i++) {
        if (smaShort[i] > smaLong[i] && position === 0) {
          position = closes[i];
        } else if (smaShort[i] < smaLong[i] && position !== 0) {
          equity *= closes[i] / position;
          position = 0;
        }
      }
      if (position !== 0) {
        equity *= closes[closes.length - 1] / position;
      }
      setResult({ equity });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const movingAverage = (arr, window) => {
    const ma = [];
    for (let i = 0; i < arr.length; i++) {
      if (i < window - 1) {
        ma.push(null);
      } else {
        const slice = arr.slice(i - window + 1, i + 1);
        const avg = slice.reduce((sum, val) => sum + val, 0) / window;
        ma.push(avg);
      }
    }
    return ma;
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <h2 className="font-bold">Backtest MA Crossover</h2>
      <div className="flex space-x-2">
        <input
          className="border p-1 flex-1"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Ticker"
        />
        <input
          type="number"
          className="border p-1 w-20"
          value={shortWindow}
          onChange={(e) => setShortWindow(Number(e.target.value))}
          placeholder="Short"
        />
        <input
          type="number"
          className="border p-1 w-20"
          value={longWindow}
          onChange={(e) => setLongWindow(Number(e.target.value))}
          placeholder="Long"
        />
        <button
          className="bg-blue-500 text-white px-2"
          onClick={fetchAndBacktest}
          disabled={loading}
        >
          {loading ? '...':'Run'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <p>
          Return: {((result.equity - 1) * 100).toFixed(2)}%
        </p>
      )}
    </div>
  );
};

export default BacktestWidget;

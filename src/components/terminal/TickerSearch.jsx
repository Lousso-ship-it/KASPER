import { useState, useEffect } from 'react';

const STORAGE_KEY = 'watchedTickers';

const TickerSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse watchlist from localStorage', e);
      }
    }
  }, []);

  // Persist watchlist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch suggestions from Yahoo Finance
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=5&newsCount=0`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();
        setSuggestions(data.quotes || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching ticker suggestions', error);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [query]);

  const addTicker = (symbol) => {
    if (!symbol || watchlist.includes(symbol)) return;
    setWatchlist([...watchlist, symbol]);
  };

  const removeTicker = (symbol) => {
    setWatchlist(watchlist.filter((t) => t !== symbol));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un ticker"
        className="w-full border p-2 rounded"
      />

      {suggestions.length > 0 && (
        <ul className="border rounded divide-y">
          {suggestions.map((s) => (
            <li key={s.symbol} className="p-2 flex justify-between items-center">
              <span>
                {s.symbol} {s.shortname ? `- ${s.shortname}` : ''}
              </span>
              <button
                type="button"
                className="text-blue-500"
                onClick={() => addTicker(s.symbol)}
              >
                Ajouter
              </button>
            </li>
          ))}
        </ul>
      )}

      {watchlist.length > 0 && (
        <div>
          <h3 className="font-bold">Tickers surveillés</h3>
          <ul className="border rounded divide-y mt-2">
            {watchlist.map((t) => (
              <li key={t} className="p-2 flex justify-between items-center">
                <span>{t}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeTicker(t)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TickerSearch;


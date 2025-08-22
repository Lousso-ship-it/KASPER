import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'watchedTickers';

const TickerSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setWatchlist(stored);
  }, []);

  // Persist watchlist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch suggestions from Yahoo Finance
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&lang=en-US`, { signal: controller.signal });
        const data = await res.json();
        setSuggestions(data.quotes?.slice(0, 5) || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching ticker suggestions:', err);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [query]);

  const addTicker = (symbol) => {
    if (!symbol || watchlist.includes(symbol)) return;
    setWatchlist((prev) => [...prev, symbol]);
    setQuery('');
    setSuggestions([]);
  };

  const removeTicker = (symbol) => {
    setWatchlist((prev) => prev.filter((t) => t !== symbol));
  };

  return (
    <Card className="bg-[#171717] border-[#2a2a2a] max-w-md">
      <CardHeader>
        <CardTitle className="text-[#e5e5e5]">Ticker Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un ticker..."
            className="bg-[#2a2a2a] border-none text-[#e5e5e5]"
          />
          {suggestions.length > 0 && (
            <ul className="bg-[#1f1f1f] border border-[#3a3a3a] rounded-md max-h-40 overflow-y-auto">
              {suggestions.map((item) => (
                <li key={item.symbol}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-[#e5e5e5] hover:bg-[#2a2a2a]"
                    onClick={() => addTicker(item.symbol)}
                  >
                    {item.symbol} - {item.shortname || item.longname || 'No name'}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">Tickers surveillés</h3>
          {watchlist.length === 0 ? (
            <p className="text-sm text-[#6b6b6b]">Aucun ticker surveillé.</p>
          ) : (
            <ul className="space-y-2">
              {watchlist.map((symbol) => (
                <li key={symbol} className="flex items-center justify-between bg-[#1f1f1f] px-3 py-2 rounded-md">
                  <span className="text-[#e5e5e5]">{symbol}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeTicker(symbol)}
                  >
                    Supprimer
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TickerSearch;


import { useEffect, useState } from 'react';
import fetchPythPrices from '@/api/pyth';
import { HermesClient } from '@pythnetwork/hermes-client';

export default function PythTickerTable() {
  const [rows, setRows] = useState([]);

  const loadFeeds = async () => {
    try {
      const client = new HermesClient('https://hermes.pyth.network');
      const crypto = await client.getPriceFeeds({ assetType: 'crypto' });
      const equity = await client.getPriceFeeds({ assetType: 'equity' });
      return [
        ...crypto.slice(0, 20),
        ...equity.slice(0, 50)
      ].map(f => ({ id: f.id, name: f.attributes.symbol || f.id }));
    } catch (err) {
      console.error('Failed to load Pyth feed list', err);
      return [];
    }
  };

  const loadPrices = async feeds => {
    if (!feeds.length) return;
    try {
      const data = await fetchPythPrices(feeds.map(f => f.id));
      const merged = feeds.map(f => ({
        ...f,
        ...data.find(d => d.id === f.id)
      }));
      setRows(merged);
    } catch (err) {
      console.error('Failed to load Pyth prices', err);
    }
  };

  useEffect(() => {
    let feedList = [];
    const run = async () => {
      if (!feedList.length) {
        feedList = await loadFeeds();
      }
      await loadPrices(feedList);
    };
    run();
    const i = setInterval(run, 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <table className="w-full text-xs font-mono">
      <thead>
        <tr className="text-left text-[#a0a0a0]">
          <th className="py-1">Actif</th>
          <th className="py-1">Prix</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id} className="border-t border-[#3a3a3a] text-white">
            <td className="py-1">{r.name}</td>
            <td className="py-1">{r.price ? r.price.toFixed(2) : '---'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

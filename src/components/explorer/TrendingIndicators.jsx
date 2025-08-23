import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function TrendingIndicators() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://api.worldbank.org/v2/country/WLD/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=1000');
        const json = await res.json();
        const series = (json[1] || []).map(d => ({
          date: d.date,
          value: d.value
        })).reverse();
        if (isMounted) {
          setData(series);
          setError(null);
        }
      } catch (e) {
        if (isMounted) setError('Failed to load data');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // refresh every 5 minutes
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 h-full">
      <h4 className="text-white font-mono text-sm mb-2">World GDP Growth (Annual %)</h4>
      {loading && <div className="text-[#a0a0a0] text-xs">Chargement...</div>}
      {error && <div className="text-red-400 text-xs">{error}</div>}
      {!loading && !error && (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#a0a0a0" tick={{ fontSize: 10 }} />
            <YAxis dataKey="value" stroke="#a0a0a0" tick={{ fontSize: 10 }} />
            <Tooltip labelStyle={{ fontSize: 10 }} contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }} />
            <Line type="monotone" dataKey="value" stroke="#ff6b35" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

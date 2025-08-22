import React, { useEffect, useState } from 'react';

export default function ToolGDP({ country }) {
  const [gdp, setGdp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    setError(null);

    fetch(`https://api.worldbank.org/v2/country/${country}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`)
      .then(res => res.json())
      .then(data => {
        const value = data?.[1]?.[0]?.value ?? null;
        setGdp(value);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (!country) return null;

  return (
    <div className="text-[#a0a0a0] font-mono">
      {loading && <p>Chargement du PIB...</p>}
      {error && <p>Erreur lors du chargement du PIB.</p>}
      {!loading && !error && (
        <p>PIB: {gdp !== null ? gdp.toLocaleString() : 'N/A'}</p>
      )}
    </div>
  );
}

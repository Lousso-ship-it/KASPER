import React, { useEffect, useState } from 'react';

export default function ToolInflation({ country }) {
  const [inflation, setInflation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    setError(null);

    fetch(`https://api.worldbank.org/v2/country/${country}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=1`)
      .then(res => res.json())
      .then(data => {
        const value = data?.[1]?.[0]?.value ?? null;
        setInflation(value);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (!country) return null;

  return (
    <div className="text-[#a0a0a0] font-mono">
      {loading && <p>Chargement de l'inflation...</p>}
      {error && <p>Erreur lors du chargement de l'inflation.</p>}
      {!loading && !error && (
        <p>Inflation: {inflation !== null ? inflation.toFixed(2) + '%' : 'N/A'}</p>
      )}
    </div>
  );
}

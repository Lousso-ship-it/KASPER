import React, { useState, useMemo } from 'react';
import wbIndicators from '@/data/worldbank_indicators.json';
import imfDataflows from '@/data/imf_dataflows.json';

export default function IndicatorCatalog({ onSelectIndicator }) {
  const [search, setSearch] = useState('');

  const filteredIndicators = useMemo(() => {
    const term = search.toLowerCase();
    return wbIndicators.filter(ind =>
      ind.id.toLowerCase().includes(term) ||
      ind.name.toLowerCase().includes(term)
    ).slice(0, 100);
  }, [search]);

  return (
    <div className="h-[20vh] bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 overflow-y-auto">
      <h3 className="text-white font-mono text-sm mb-2">World Bank Indicators</h3>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher un indicateur..."
        className="mb-2 w-full rounded bg-[#1a1a1a] border border-[#3a3a3a] p-1 text-xs text-white"
      />
      <ul className="text-xs text-[#a0a0a0] space-y-1 mb-4">
        {filteredIndicators.map(ind => (
          <li key={ind.id}>
            <button
              onClick={() => onSelectIndicator && onSelectIndicator(ind)}
              className="hover:text-white"
            >
              {ind.id} - {ind.name}
            </button>
          </li>
        ))}
      </ul>
      <h3 className="text-white font-mono text-sm mb-2">IMF Dataflows</h3>
      <ul className="text-xs text-[#a0a0a0] space-y-1">
        {imfDataflows.slice(0, 20).map(flow => (
          <li key={flow.id}>{flow.id} - {flow.name}</li>
        ))}
      </ul>
    </div>
  );
}

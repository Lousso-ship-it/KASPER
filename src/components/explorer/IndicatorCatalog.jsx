import React from 'react';
import wbIndicators from '@/data/worldbank_indicators.json';
import imfDataflows from '@/data/imf_dataflows.json';

export default function IndicatorCatalog() {
  return (
    <div className="h-[20vh] bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 overflow-y-auto">
      <h3 className="text-white font-mono text-sm mb-2">World Bank Indicators</h3>
      <ul className="text-xs text-[#a0a0a0] space-y-1 mb-4">
        {wbIndicators.slice(0, 20).map(ind => (
          <li key={ind.id}>{ind.id} - {ind.name}</li>
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

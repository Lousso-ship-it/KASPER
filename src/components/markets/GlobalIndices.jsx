
import React, { useEffect, useState } from 'react';
import Sparkline from './Sparkline';
import fetchGlobalIndices from '../../api/marketData';

const generateSparklineData = () => Array.from({ length: 20 }, () => Math.random() * 100);

const DataRow = ({ id, name, value, netChg, pctChg, ytd }) => {
  const isPositive = !netChg.startsWith('-');
  const sparklineData = generateSparklineData();
  const sparklineColor = isPositive ? '#22c55e' : '#ef4444'; // green-500 or red-500

  return (
    <tr className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50 transition-colors duration-200">
      <td className="px-4 py-3 text-[#a0a0a0]">{id})</td>
      <td className="px-3 py-3 text-white font-semibold">{name}</td>
      <td className="px-3 py-3"><Sparkline data={sparklineData} color={sparklineColor} /></td>
      <td className="px-3 py-3 text-right text-white font-semibold">{value}</td>
      <td className={`px-3 py-3 text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{netChg}</td>
      <td className={`px-3 py-3 text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{pctChg}</td>
      <td className={`px-4 py-3 text-right ${ytd.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{ytd}</td>
    </tr>
  );
};

const GlobalIndices = () => {
  const [indices, setIndices] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGlobalIndices();
        setIndices(data);
      } catch (err) {
        console.error('Failed to load market data', err);
      }
    };
    load();
  }, []);

  if (!Object.keys(indices).length) {
    return <div className="text-center py-4 text-[#a0a0a0]">Loading...</div>;
  }

  return (
    <table className="w-full text-sm font-mono border-collapse table-fixed">
      <thead className="sticky top-0 bg-[#1a1a1a] z-10">
        <tr className="text-left text-[#a0a0a0]">
          <th className="px-4 py-3 w-16">#</th>
          <th className="px-3 py-3 w-1/3">Market</th>
          <th className="px-3 py-3 w-[130px]">2Day</th>
          <th className="px-3 py-3 text-right">Value</th>
          <th className="px-3 py-3 text-right">Net Chg</th>
          <th className="px-3 py-3 text-right">%Chg</th>
          <th className="px-4 py-3 text-right">YTD</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(indices).map(([region, items]) => (
          <React.Fragment key={region}>
            <tr className="bg-[#2a2a2a] sticky top-[45px] z-10">
              <td colSpan="7" className="px-4 py-2 text-white font-bold tracking-wider">{region.toUpperCase()}</td>
            </tr>
            {items.map(item => <DataRow key={item.id} {...item} />)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default GlobalIndices;

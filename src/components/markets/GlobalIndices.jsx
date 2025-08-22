
import React from 'react';
import Sparkline from './Sparkline';

const generateSparklineData = () => Array.from({ length: 20 }, () => Math.random() * 100);

const indices = {
  Americas: [
    { id: 11, name: "DOW JONES", value: "34517.73", netChg: "+183.55", pctChg: "+0.53%", ytd: "2.89%" },
    { id: 12, name: "S&P 500", value: "4489.15", netChg: "+37.24", pctChg: "+0.84%", ytd: "16.12%" },
    { id: 13, name: "NASDAQ", value: "15129.50", netChg: "+123.77", pctChg: "+0.82%", ytd: "31.54%" },
    { id: 14, name: "S&P/TSX Comp", value: "20546.12", netChg: "-12.50", pctChg: "-0.06%", ytd: "5.98%" },
    { id: 16, name: "IBOVESPA", value: "118754.00", netChg: "+1201.00", pctChg: "+1.02%", ytd: "8.21%" },
  ],
  EMEA: [
    { id: 21, name: "Euro Stoxx 50", value: "4321.45", netChg: "+45.10", pctChg: "+1.05%", ytd: "13.92%" },
    { id: 22, name: "FTSE 100", value: "7628.10", netChg: "+65.20", pctChg: "+0.86%", ytd: "2.45%" },
    { id: 23, name: "CAC 40", value: "7315.07", netChg: "+88.44", pctChg: "+1.22%", ytd: "12.98%" },
    { id: 24, name: "DAX", value: "16010.32", netChg: "+150.78", pctChg: "+0.95%", ytd: "15.01%" },
  ],
  APAC: [
    { id: 31, name: "NIKKEI 225", value: "32254.56", netChg: "+289.35", pctChg: "+0.90%", ytd: "23.55%" },
    { id: 32, name: "HANG SENG", value: "18484.03", netChg: "-157.62", pctChg: "-0.85%", ytd: "-6.58%" },
    { id: 33, name: "SHANGHAI", value: "3176.18", netChg: "+1.55", pctChg: "+0.05%", ytd: "2.87%" },
    { id: 34, name: "S&P/ASX 200", value: "7307.00", netChg: "+48.90", pctChg: "+0.67%", ytd: "3.71%" },
  ]
};

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

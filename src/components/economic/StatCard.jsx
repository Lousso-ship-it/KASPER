import React from 'react';

const StatCard = ({ label, value, unit, change }) => {
  const isPositive = change && change.startsWith('+');
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-slate-100">{value}</p>
        {unit && <p className="text-slate-400">{unit}</p>}
      </div>
      {change && <p className={`text-sm font-medium ${changeColor}`}>{change}</p>}
    </div>
  );
};

export default StatCard;
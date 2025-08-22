import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IndicatorCard from './IndicatorCard';
import StatCard from './StatCard';
import { Banknote, Repeat, Landmark, ArrowRightLeft } from 'lucide-react';

const exchangeRateData = [
  { name: 'Lun', rate: 1.072 },
  { name: 'Mar', rate: 1.075 },
  { name: 'Mer', rate: 1.071 },
  { name: 'Jeu', rate: 1.078 },
  { name: 'Ven', rate: 1.076 },
];

export default function MonetaryPolicy() {
  return (
    <IndicatorCard 
      title="Politique Monétaire et Financière"
      icon={Landmark}
      sources={['FED', 'BCE', 'BIS']}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Taux Directeur (BCE)" value="4.50" unit="%" />
        <StatCard label="Taux de change EUR/USD" value="1.076" change="+0.37%" />
        <StatCard label="Inflation sous-jacente" value="2.9" unit="%" change="-0.2 pts" />
        <StatCard label="Réserves de change" value="720" unit="Mds €" />
      </div>
      <div className="h-64 w-full">
        <h4 className="font-semibold text-gray-700 mb-2 text-center">Évolution EUR/USD (semaine)</h4>
        <ResponsiveContainer>
          <AreaChart data={exchangeRateData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={['auto', 'auto']} fontSize={12} />
            <Tooltip />
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="rate" stroke="#16a34a" strokeWidth={2} fill="url(#colorRate)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </IndicatorCard>
  );
}
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import IndicatorCard from './IndicatorCard';
import StatCard from './StatCard';
import { Ship, Anchor, Globe2, LandPlot } from 'lucide-react';

const tradeData = [
  { name: 'USA', exports: 120, imports: 150 },
  { name: 'Chine', exports: 80, imports: 200 },
  { name: 'Allemagne', exports: 180, imports: 160 },
  { name: 'Italie', exports: 90, imports: 85 },
];

export default function InternationalTrade() {
  return (
    <IndicatorCard 
      title="Commerce International"
      icon={Ship}
      sources={['OMC', 'Banque Mondiale']}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Balance Commerciale" value="-15.2" unit="Mds €" />
        <StatCard label="Balance des Paiements" value="1.1" unit="% PIB" />
        <StatCard label="IDE Entrants" value="35" unit="Mds €" />
        <StatCard label="Termes de l'échange" value="102.3" unit="pts" />
      </div>
      <div className="h-64 w-full">
        <h4 className="font-semibold text-gray-700 mb-2 text-center">Top 4 Partenaires Commerciaux (Mds €)</h4>
        <ResponsiveContainer>
          <BarChart data={tradeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="exports" fill="#16a34a" name="Exportations" />
            <Bar dataKey="imports" fill="#f87171" name="Importations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </IndicatorCard>
  );
}
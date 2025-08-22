import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import IndicatorCard from './IndicatorCard';
import StatCard from './StatCard';
import { TrendingUp, Percent, UserMinus, Building } from 'lucide-react';

const pibData = [
  { name: 'T1', croissance: 0.2 },
  { name: 'T2', croissance: 0.5 },
  { name: 'T3', croissance: -0.1 },
  { name: 'T4', croissance: 0.3 },
];

export default function MacroIndicators() {
  return (
    <IndicatorCard 
      title="Indicateurs Macroéconomiques"
      icon={TrendingUp}
      sources={['FMI', 'Banque Mondiale', 'OCDE']}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Croissance PIB (T/T)" value="0.3" unit="%" change="+0.4 pts" />
        <StatCard label="Taux d'inflation (annuel)" value="2.1" unit="%" change="-0.2 pts" />
        <StatCard label="Taux de chômage" value="7.5" unit="%" change="-0.1 pts" />
        <StatCard label="Confiance des entreprises" value="102.3" unit="pts" change="+0.8 pts" />
      </div>
      <div className="h-64 w-full">
        <h4 className="font-semibold text-slate-300 mb-4 text-center">Évolution de la croissance trimestrielle du PIB (%)</h4>
        <ResponsiveContainer>
          <LineChart data={pibData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" fontSize={12} stroke="#94a3b8"/>
            <YAxis fontSize={12} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid #475569' }} />
            <Line type="monotone" dataKey="croissance" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </IndicatorCard>
  );
}
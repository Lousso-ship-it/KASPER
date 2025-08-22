import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import IndicatorCard from './IndicatorCard';
import StatCard from './StatCard';
import { Landmark, FileMinus, Receipt, LandmarkIcon } from 'lucide-react';

const spendingData = [
  { name: 'Dépenses Publiques', Santé: 25, Éducation: 20, Défense: 15, Autre: 40 },
];

export default function FiscalBudget() {
  return (
    <IndicatorCard 
      title="Fiscal et Budget"
      icon={FileMinus}
      sources={['Eurostat', 'Trésor Public']}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Dette Publique / PIB" value="98.5" unit="%" />
        <StatCard label="Déficit Budgétaire" value="-3.1" unit="%" />
        <StatCard label="Dépenses Publiques" value="54.2" unit="% PIB" />
        <StatCard label="Recettes Fiscales" value="51.1" unit="% PIB" />
      </div>
      <div className="h-64 w-full">
         <h4 className="font-semibold text-gray-700 mb-2 text-center">Répartition des Dépenses Publiques (%)</h4>
        <ResponsiveContainer>
          <BarChart layout="vertical" data={spendingData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            <Legend />
            <Bar dataKey="Santé" stackId="a" fill="#16a34a" />
            <Bar dataKey="Éducation" stackId="a" fill="#4ade80" />
            <Bar dataKey="Défense" stackId="a" fill="#86efac" />
            <Bar dataKey="Autre" stackId="a" fill="#bbf7d0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </IndicatorCard>
  );
}
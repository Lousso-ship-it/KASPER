import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Baby, UserCheck } from 'lucide-react';

const populationTrends = [
  { year: '2000', monde: 6.1, europe: 0.73, asie: 3.7, afrique: 0.81 },
  { year: '2005', monde: 6.5, europe: 0.73, asie: 3.9, afrique: 0.92 },
  { year: '2010', monde: 6.9, europe: 0.74, asie: 4.2, afrique: 1.04 },
  { year: '2015', monde: 7.3, europe: 0.74, asie: 4.4, afrique: 1.19 },
  { year: '2020', monde: 7.8, europe: 0.75, asie: 4.6, afrique: 1.34 },
  { year: '2024', monde: 8.1, europe: 0.75, asie: 4.8, afrique: 1.49 }
];

const ageStructure = [
  { group: '0-14 ans', pourcentage: 25.1 },
  { group: '15-64 ans', pourcentage: 65.2 },
  { group: '65+ ans', pourcentage: 9.7 }
];

const StatCard = ({ label, value, change, unit, icon: Icon, color = "blue" }) => {
  const colorVariants = {
    blue: "text-blue-400 bg-blue-600/10",
    green: "text-green-400 bg-green-600/10",
    purple: "text-purple-400 bg-purple-600/10",
    orange: "text-orange-400 bg-orange-600/10"
  };

  return (
    <Card className="bg-[#171717] border-[#2a2a2a]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#a3a3a3] mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-[#e5e5e5]">{value}</p>
              {unit && <p className="text-sm font-medium text-[#a3a3a3]">{unit}</p>}
            </div>
            {change && (
              <p className="text-sm text-green-400 font-medium mt-1">{change}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorVariants[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PopulationIndicators() {
  return (
    <div className="space-y-6">
      {/* Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Population Mondiale" 
          value="8.1" 
          unit="Milliards"
          change="+0.9% (2024)"
          icon={Users}
          color="blue"
        />
        <StatCard 
          label="Taux de Croissance" 
          value="0.88" 
          unit="%"
          change="En baisse"
          icon={TrendingUp}
          color="green"
        />
        <StatCard 
          label="Taux de Natalité" 
          value="17.6" 
          unit="‰"
          change="-0.4 pts"
          icon={Baby}
          color="purple"
        />
        <StatCard 
          label="Espérance de Vie" 
          value="72.8" 
          unit="ans"
          change="+0.3 ans"
          icon={UserCheck}
          color="orange"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution de la population par région */}
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-[#e5e5e5] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Évolution Population par Région (Milliards)
            </CardTitle>
            <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] w-fit mt-2">Source: ONU Population Division</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <LineChart data={populationTrends} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="year" fontSize={12} stroke="#a3a3a3" />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Legend wrapperStyle={{fontSize: "12px", color: "#a3a3a3"}}/>
                  <Line type="monotone" dataKey="monde" stroke="#3b82f6" strokeWidth={2} name="Monde" />
                  <Line type="monotone" dataKey="asie" stroke="#22c55e" strokeWidth={2} name="Asie" />
                  <Line type="monotone" dataKey="afrique" stroke="#ef4444" strokeWidth={2} name="Afrique" />
                  <Line type="monotone" dataKey="europe" stroke="#a855f7" strokeWidth={2} name="Europe" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Structure par âge */}
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
              <Users className="w-5 h-5 text-purple-400" />
              Structure par Âge - Monde (%)
            </CardTitle>
             <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] w-fit mt-2">Source: Banque Mondiale</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={ageStructure} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="group" fontSize={12} stroke="#a3a3a3" />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="pourcentage" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
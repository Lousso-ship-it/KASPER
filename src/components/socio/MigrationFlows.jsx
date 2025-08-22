import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Users, Plane } from 'lucide-react';

const migrationData = [
  { country: 'États-Unis', immigrants: 50.6, emigrants: 2.8, refugees: 0.3 },
  { country: 'Allemagne', immigrants: 15.8, emigrants: 4.0, refugees: 1.1 },
  { country: 'Arabie Saoudite', immigrants: 13.5, emigrants: 0.3, refugees: 0.0 },
  { country: 'Russie', immigrants: 11.6, emigrants: 10.8, refugees: 0.1 },
  { country: 'Royaume-Uni', immigrants: 9.4, emigrants: 4.9, refugees: 0.1 },
  { country: 'Émirats Arabes Unis', immigrants: 8.7, emigrants: 0.1, refugees: 0.0 },
  { country: 'France', immigrants: 8.5, emigrants: 2.4, refugees: 0.4 },
  { country: 'Canada', immigrants: 8.0, emigrants: 1.3, refugees: 0.1 }
];

const refugeeOrigins = [
  { country: 'Syrie', refugees: 6.8 },
  { country: 'Venezuela', refugees: 5.6 },
  { country: 'Afghanistan', refugees: 2.6 },
  { country: 'Soudan du Sud', refugees: 2.4 },
  { country: 'Myanmar', refugees: 1.2 },
  { country: 'RD Congo', refugees: 0.9 }
];

const StatCard = ({ label, value, unit, icon: Icon, color = "blue" }) => {
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
              <p className="text-2xl font-bold text-[#e5e5e5]">{value}</p>
              {unit && <p className="text-sm font-medium text-[#a3a3a3]">{unit}</p>}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorVariants[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MigrationFlows() {
  return (
    <div className="space-y-6">
      {/* Stats migration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Migrants Internationaux" 
          value="281" 
          unit="Millions"
          icon={ArrowUpDown}
          color="blue"
        />
        <StatCard 
          label="Réfugiés dans le Monde" 
          value="35.3" 
          unit="Millions"
          icon={Users}
          color="orange"
        />
        <StatCard 
          label="Déplacés Internes" 
          value="71.1" 
          unit="Millions"
          icon={Plane}
          color="purple"
        />
        <StatCard 
          label="Demandeurs d'Asile" 
          value="5.4" 
          unit="Millions"
          icon={Users}
          color="green"
        />
      </div>

      {/* Graphiques migration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
              <ArrowUpDown className="w-5 h-5 text-blue-400" />
              Flux Migratoires par Pays (Millions)
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3]">Source: ONU Migration, UNHCR</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={migrationData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="immigrants" fill="#2563eb" name="Immigrants" />
                  <Bar dataKey="emigrants" fill="#dc2626" name="Émigrants" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
              <Users className="w-5 h-5 text-orange-400" />
              Principales Origines de Réfugiés (Millions)
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3]">Source: UNHCR</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={refugeeOrigins} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="refugees" fill="#ea580c" name="Réfugiés (millions)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
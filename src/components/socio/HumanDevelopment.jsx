import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, Star, Award } from 'lucide-react';

const hdiData = [
  { country: 'Norvège', hdi: 0.957, revenu: 75420, esperance: 82.3, education: 18.1 },
  { country: 'Suisse', hdi: 0.955, revenu: 81867, esperance: 83.8, education: 16.3 },
  { country: 'Irlande', hdi: 0.945, revenu: 76169, esperance: 82.6, education: 18.9 },
  { country: 'Allemagne', hdi: 0.942, revenu: 54534, esperance: 81.3, education: 17.0 },
  { country: 'Hong Kong', hdi: 0.952, revenu: 62985, esperance: 85.2, education: 17.3 },
  { country: 'Australie', hdi: 0.951, revenu: 49238, esperance: 83.2, education: 21.1 },
  { country: 'Islande', hdi: 0.949, revenu: 54682, esperance: 83.0, education: 19.2 },
  { country: 'Suède', hdi: 0.947, revenu: 51925, esperance: 82.7, education: 19.4 },
  { country: 'Singapour', hdi: 0.939, revenu: 90919, esperance: 83.1, education: 16.4 },
  { country: 'Pays-Bas', hdi: 0.941, revenu: 52877, esperance: 82.1, education: 18.7 }
];

const inequalityData = [
  { country: 'Slovénie', gini: 24.4, category: 'Très faible' },
  { country: 'République tchèque', gini: 25.0, category: 'Très faible' },
  { country: 'Slovaquie', gini: 25.2, category: 'Très faible' },
  { country: 'Belgique', gini: 27.2, category: 'Faible' },
  { country: 'Finlande', gini: 27.3, category: 'Faible' },
  { country: 'Autriche', gini: 29.7, category: 'Faible' },
  { country: 'Allemagne', gini: 31.9, category: 'Modérée' },
  { country: 'France', gini: 32.4, category: 'Modérée' },
  { country: 'Espagne', gini: 34.7, category: 'Modérée' },
  { country: 'États-Unis', gini: 41.4, category: 'Élevée' }
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

export default function HumanDevelopment() {
  return (
    <div className="space-y-6">
      {/* Stats développement humain */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="IDH Moyen Mondial" 
          value="0.732" 
          icon={Globe}
          color="blue"
        />
        <StatCard 
          label="Pays Dév. Très Élevé" 
          value="66" 
          unit="pays"
          icon={Star}
          color="green"
        />
        <StatCard 
          label="Inégalité Moyenne (Gini)" 
          value="38.5" 
          icon={TrendingUp}
          color="orange"
        />
        <StatCard 
          label="Progrès IDH 2000-2021" 
          value="+18.6" 
          unit="%"
          icon={Award}
          color="purple"
        />
      </div>

      {/* Graphiques développement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
              <Globe className="w-5 h-5 text-blue-400" />
              IDH vs Revenu par Habitant
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3]">Source: PNUD</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <ScatterChart margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis 
                    type="number" 
                    dataKey="revenu" 
                    domain={['dataMin', 'dataMax']}
                    fontSize={12}
                    stroke="#a3a3a3"
                    name="Revenu"
                  />
                  <YAxis 
                    type="number" 
                    dataKey="hdi" 
                    domain={[0.93, 0.96]}
                    fontSize={12}
                    stroke="#a3a3a3"
                    name="IDH"
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }}
                    formatter={(value, name) => [
                      name === 'revenu' ? `$${value.toLocaleString()}` : value,
                      name === 'revenu' ? 'Revenu/hab' : 'IDH'
                    ]}
                  />
                  <Scatter name="Pays" data={hdiData} fill="#2563eb" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              Inégalités (Indice de Gini)
            </CardTitle>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3]">Source: Banque Mondiale</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={inequalityData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="gini" fill="#ea580c" name="Indice de Gini" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
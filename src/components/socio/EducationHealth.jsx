import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, BookOpen, Activity } from 'lucide-react';

const educationData = [
  { country: 'Finlande', taux_alphabetisation: 100, scolarisation_primaire: 99.7, scolarisation_secondaire: 95.3 },
  { country: 'Japon', taux_alphabetisation: 99, scolarisation_primaire: 99.8, scolarisation_secondaire: 98.8 },  
  { country: 'Allemagne', taux_alphabetisation: 99, scolarisation_primaire: 99.9, scolarisation_secondaire: 96.1 },
  { country: 'France', taux_alphabetisation: 99, scolarisation_primaire: 99.8, scolarisation_secondaire: 95.7 },
  { country: 'Brésil', taux_alphabetisation: 93.2, scolarisation_primaire: 98.2, scolarisation_secondaire: 87.2 },
  { country: 'Inde', taux_alphabetisation: 74.4, scolarisation_primaire: 94.1, scolarisation_secondaire: 78.1 },
  { country: 'Nigeria', taux_alphabetisation: 62.0, scolarisation_primaire: 85.4, scolarisation_secondaire: 44.3 }
];

const healthData = [
  { country: 'Japon', esperance_vie: 84.3, mortalite_infantile: 2.0, acces_eau: 97.8 },
  { country: 'Suisse', esperance_vie: 83.8, mortalite_infantile: 3.9, acces_eau: 99.9 },
  { country: 'Singapour', esperance_vie: 83.1, mortalite_infantile: 2.3, acces_eau: 100.0 },
  { country: 'France', esperance_vie: 82.7, mortalite_infantile: 3.3, acces_eau: 99.9 },
  { country: 'Allemagne', esperance_vie: 81.3, mortalite_infantile: 3.4, acces_eau: 99.9 },
  { country: 'Brésil', esperance_vie: 75.9, mortalite_infantile: 13.4, acces_eau: 98.1 },
  { country: 'Inde', esperance_vie: 69.7, mortalite_infantile: 28.3, acces_eau: 91.0 },
  { country: 'Nigeria', esperance_vie: 54.7, mortalite_infantile: 61.8, acces_eau: 71.0 }
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
              <p className="text-2xl font-semibold text-[#e5e5e5]">{value}</p>
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

export default function EducationHealth({ type }) {
  if (type === 'education') {
    return (
      <div className="space-y-6">
        {/* Stats éducation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Taux d'Alphabétisation Mondial" 
            value="86.3" 
            unit="%"
            icon={BookOpen}
            color="blue"
          />
          <StatCard 
            label="Scolarisation Primaire" 
            value="91.0" 
            unit="%"
            icon={GraduationCap}
            color="green"
          />
          <StatCard 
            label="Scolarisation Secondaire" 
            value="76.3" 
            unit="%"
            icon={GraduationCap}
            color="purple"
          />
          <StatCard 
            label="Enfants Non Scolarisés" 
            value="244" 
            unit="Millions"
            icon={Activity}
            color="orange"
          />
        </div>

        {/* Graphiques éducation */}
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-[#e5e5e5] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              Indicateurs d'Éducation par Pays
            </CardTitle>
             <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] w-fit mt-2">Source: UNESCO, Banque Mondiale</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer>
                <BarChart data={educationData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Legend wrapperStyle={{fontSize: "12px", color: "#a3a3a3"}}/>
                  <Bar dataKey="taux_alphabetisation" fill="#3b82f6" name="Alphabétisation (%)" />
                  <Bar dataKey="scolarisation_primaire" fill="#22c55e" name="Scolarisation Primaire (%)" />
                  <Bar dataKey="scolarisation_secondaire" fill="#a855f7" name="Scolarisation Secondaire (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats santé */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Espérance de Vie Mondiale" 
          value="72.8" 
          unit="ans"
          icon={Heart}
          color="blue"
        />
        <StatCard 
          label="Mortalité Infantile" 
          value="28.2" 
          unit="‰"
          icon={Activity}
          color="orange"
        />
        <StatCard 
          label="Accès à l'Eau Potable" 
          value="90.0" 
          unit="%"
          icon={Heart}
          color="green"
        />
        <StatCard 
          label="Dépenses de Santé / PIB" 
          value="10.1" 
          unit="%"
          icon={Activity}
          color="purple"
        />
      </div>

      {/* Graphiques santé */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-[#e5e5e5] flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Espérance de Vie par Pays
            </CardTitle>
            <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] w-fit mt-2">Source: OMS, Banque Mondiale</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={healthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="esperance_vie" fill="#ef4444" name="Espérance de vie (ans)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#171717] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-[#e5e5e5] flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Mortalité Infantile (‰)
            </CardTitle>
            <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] w-fit mt-2">Source: UNICEF</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer>
                <BarChart data={healthData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
                  <XAxis dataKey="country" fontSize={12} stroke="#a3a3a3" angle={-45} textAnchor="end" height={80} />
                  <YAxis fontSize={12} stroke="#a3a3a3" />
                  <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
                  <Bar dataKey="mortalite_infantile" fill="#f97316" name="Mortalité infantile (‰)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
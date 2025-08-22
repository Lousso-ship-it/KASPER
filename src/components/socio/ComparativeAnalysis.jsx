import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp } from 'lucide-react';

const comparisonData = {
  'France': [
    { year: 2000, population: 60.9, pib_hab: 23234, esperance_vie: 79.2, hdi: 0.803 },
    { year: 2005, population: 62.8, pib_hab: 27270, esperance_vie: 80.2, hdi: 0.820 },
    { year: 2010, population: 64.7, pib_hab: 31049, esperance_vie: 81.0, hdi: 0.840 },
    { year: 2015, population: 66.4, pib_hab: 32676, esperance_vie: 82.0, hdi: 0.860 },
    { year: 2020, population: 67.4, pib_hab: 33950, esperance_vie: 82.7, hdi: 0.901 }
  ],
  'Allemagne': [
    { year: 2000, population: 82.2, pib_hab: 25794, esperance_vie: 78.0, hdi: 0.825 },
    { year: 2005, population: 82.4, pib_hab: 30290, esperance_vie: 78.9, hdi: 0.845 },
    { year: 2010, population: 81.8, pib_hab: 35308, esperance_vie: 79.8, hdi: 0.868 },
    { year: 2015, population: 81.2, pib_hab: 40239, esperance_vie: 80.7, hdi: 0.890 },
    { year: 2020, population: 83.1, pib_hab: 43259, esperance_vie: 81.3, hdi: 0.942 }
  ],
  'Royaume-Uni': [
    { year: 2000, population: 58.9, pib_hab: 26389, esperance_vie: 77.9, hdi: 0.820 },
    { year: 2005, population: 60.2, pib_hab: 32244, esperance_vie: 78.9, hdi: 0.840 },
    { year: 2010, population: 62.3, pib_hab: 36173, esperance_vie: 80.2, hdi: 0.860 },
    { year: 2015, population: 64.9, pib_hab: 39720, esperance_vie: 81.0, hdi: 0.880 },
    { year: 2020, population: 67.1, pib_hab: 40284, esperance_vie: 81.4, hdi: 0.932 }
  ]
};

export default function ComparativeAnalysis({ selectedCountries: initialCountries }) {
  const [selectedCountries, setSelectedCountries] = useState(initialCountries || ['France', 'Allemagne']);
  const [indicator, setIndicator] = useState('population');

  const availableCountries = Object.keys(comparisonData);
  
  const handleCountryChange = (index, newCountry) => {
    const newSelection = [...selectedCountries];
    newSelection[index] = newCountry;
    setSelectedCountries(newSelection);
  };

  const getChartData = () => {
    const years = comparisonData[selectedCountries[0]]?.map(d => d.year) || [];
    return years.map(year => {
      const point = { year };
      selectedCountries.forEach(country => {
        const countryData = comparisonData[country]?.find(d => d.year === year);
        if (countryData) {
          point[country] = countryData[indicator];
        }
      });
      return point;
    });
  };

  const getIndicatorLabel = () => {
    switch (indicator) {
      case 'population': return 'Population (Millions)';
      case 'pib_hab': return 'PIB par habitant ($)';
      case 'esperance_vie': return 'Espérance de vie (années)';
      case 'hdi': return 'Indice de développement humain';
      default: return '';
    }
  };

  const colors = ['#2563eb', '#dc2626', '#059669', '#7c3aed'];

  return (
    <Card className="bg-[#171717] border-[#2a2a2a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#e5e5e5]">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Analyse Comparative
        </CardTitle>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#a3a3a3]">Pays 1:</span>
            <Select value={selectedCountries[0]} onValueChange={(value) => handleCountryChange(0, value)}>
              <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#2a2a2a] text-[#e5e5e5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2a2a2a]">
                {availableCountries.map(country => (
                  <SelectItem key={country} value={country} className="text-[#e5e5e5] hover:bg-[#222222]">{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#a3a3a3]">Pays 2:</span>
            <Select value={selectedCountries[1]} onValueChange={(value) => handleCountryChange(1, value)}>
              <SelectTrigger className="w-40 bg-[#0D0D0D] border-[#2a2a2a] text-[#e5e5e5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2a2a2a]">
                {availableCountries.map(country => (
                  <SelectItem key={country} value={country} className="text-[#e5e5e5] hover:bg-[#222222]">{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#a3a3a3]">Indicateur:</span>
            <Select value={indicator} onValueChange={setIndicator}>
              <SelectTrigger className="w-48 bg-[#0D0D0D] border-[#2a2a2a] text-[#e5e5e5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2a2a2a]">
                <SelectItem value="population" className="text-[#e5e5e5] hover:bg-[#222222]">Population</SelectItem>
                <SelectItem value="pib_hab" className="text-[#e5e5e5] hover:bg-[#222222]">PIB par habitant</SelectItem>
                <SelectItem value="esperance_vie" className="text-[#e5e5e5] hover:bg-[#222222]">Espérance de vie</SelectItem>
                <SelectItem value="hdi" className="text-[#e5e5e5] hover:bg-[#222222]">IDH</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="outline" className="border-[#2a2a2a] text-[#a3a3a3]">Sources: Banque Mondiale, PNUD</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer>
            <LineChart data={getChartData()} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
              <XAxis dataKey="year" fontSize={12} stroke="#a3a3a3" />
              <YAxis fontSize={12} stroke="#a3a3a3" />
              <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #2a2a2a', color: '#e5e5e5' }} />
              <Legend wrapperStyle={{fontSize: "12px", color: "#a3a3a3"}} />
              {selectedCountries.map((country, index) => (
                <Line 
                  key={country}
                  type="monotone" 
                  dataKey={country} 
                  stroke={colors[index]} 
                  strokeWidth={2}
                  name={country}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-[#a3a3a3] font-medium">{getIndicatorLabel()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
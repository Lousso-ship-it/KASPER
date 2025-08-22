import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Globe3D from '../common/Globe3D';

const worldEconomicData = [
  { 
    country: 'États-Unis', 
    region: 'Amérique du Nord',
    gdpGrowth: 2.1, 
    inflation: 3.2, 
    unemployment: 3.7,
    trend: 'up',
    lat: 37.0,
    lon: -95.0
  },
  { 
    country: 'Chine', 
    region: 'Asie',
    gdpGrowth: 5.2, 
    inflation: 0.8, 
    unemployment: 5.2,
    trend: 'up',
    lat: 35.0,
    lon: 104.0
  },
  { 
    country: 'Allemagne', 
    region: 'Europe',
    gdpGrowth: 0.1, 
    inflation: 2.9, 
    unemployment: 3.1,
    trend: 'stable',
    lat: 51.2,
    lon: 10.5
  },
  { 
    country: 'Japon', 
    region: 'Asie',
    gdpGrowth: 0.8, 
    inflation: 3.1, 
    unemployment: 2.4,
    trend: 'up',
    lat: 36.2,
    lon: 138.3
  },
  { 
    country: 'Royaume-Uni', 
    region: 'Europe',
    gdpGrowth: 0.4, 
    inflation: 4.0, 
    unemployment: 3.9,
    trend: 'stable',
    lat: 55.4,
    lon: -3.4
  },
  { 
    country: 'France', 
    region: 'Europe',
    gdpGrowth: 0.3, 
    inflation: 2.9, 
    unemployment: 7.3,
    trend: 'stable',
    lat: 46.6,
    lon: 2.2
  },
  { 
    country: 'Brésil', 
    region: 'Amérique du Sud',
    gdpGrowth: 2.9, 
    inflation: 4.6, 
    unemployment: 8.7,
    trend: 'up',
    lat: -14.2,
    lon: -51.9
  },
  { 
    country: 'Inde', 
    region: 'Asie',
    gdpGrowth: 6.1, 
    inflation: 5.7, 
    unemployment: 7.1,
    trend: 'up',
    lat: 20.0,
    lon: 77.0
  },
  {
    country: 'Canada',
    region: 'Amérique du Nord',
    gdpGrowth: 1.5,
    inflation: 3.8,
    unemployment: 5.2,
    trend: 'stable',
    lat: 56.1,
    lon: -106.3
  },
  {
    country: 'Australie',
    region: 'Océanie',
    gdpGrowth: 2.0,
    inflation: 4.1,
    unemployment: 3.5,
    trend: 'up',
    lat: -25.3,
    lon: 133.8
  }
];

export default function WorldEconomicMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [indicator, setIndicator] = useState('gdpGrowth');

  const getColorScale = (indicator) => {
    switch (indicator) {
      case 'gdpGrowth':
        return (value) => {
          if (value > 4) return '#10b981';
          if (value > 2) return '#f59e0b';
          if (value > 0) return '#3b82f6';
          return '#ef4444';
        };
      case 'inflation':
        return (value) => {
          if (value > 5) return '#ef4444';
          if (value > 3) return '#f59e0b';
          return '#10b981';
        };
      case 'unemployment':
        return (value) => {
          if (value > 7) return '#ef4444';
          if (value > 4) return '#f59e0b';
          return '#10b981';
        };
      default:
        return () => '#3b82f6';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getIndicatorLabel = () => {
    switch (indicator) {
      case 'gdpGrowth': return 'Croissance du PIB';
      case 'inflation': return 'Taux d\'inflation';
      case 'unemployment': return 'Taux de chômage';
      default: return '';
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            Globe Économique Mondial - Temps Réel
          </CardTitle>
          <Select value={indicator} onValueChange={setIndicator}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gdpGrowth">Croissance du PIB</SelectItem>
              <SelectItem value="inflation">Taux d'inflation</SelectItem>
              <SelectItem value="unemployment">Taux de chômage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Globe3D
            data={worldEconomicData}
            selectedMetric={indicator}
            colorScale={getColorScale(indicator)}
            onCountryClick={handleCountryClick}
            height={500}
          />

          {/* Légende dynamique */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {indicator === 'gdpGrowth' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 4% croissance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">2% - 4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">0% - 2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Récession</span>
                </div>
              </>
            )}
            {indicator === 'inflation' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 5% inflation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">3% - 5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&lt; 3%</span>
                </div>
              </>
            )}
            {indicator === 'unemployment' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 7% chômage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">4% - 7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&lt; 4%</span>
                </div>
              </>
            )}
          </div>

          {/* Panel d'information pour le pays sélectionné */}
          {selectedCountry && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border w-72">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">{selectedCountry.country}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCountry(null)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
              <Badge variant="secondary" className="mb-3">{selectedCountry.region}</Badge>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Croissance PIB:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{selectedCountry.gdpGrowth}%</span>
                    {getTrendIcon(selectedCountry.trend)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Inflation:</span>
                  <span className="font-medium">{selectedCountry.inflation}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Chômage:</span>
                  <span className="font-medium">{selectedCountry.unemployment}%</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">
                  Actuellement affiché: {getIndicatorLabel()}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Globe interactif 3D • Faites glisser pour explorer • Cliquez sur les pays pour les détails
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
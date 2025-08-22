import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Users, TrendingUp, TrendingDown } from 'lucide-react';
import Globe3D from '../common/Globe3D';

const demographicData = [
  { 
    country: 'Chine', 
    population: 1412000000,
    growthRate: 0.39,
    medianAge: 38.4,
    urbanization: 63.0,
    lat: 35.0,
    lon: 104.0,
    trend: 'down'
  },
  { 
    country: 'Inde', 
    population: 1380000000,
    growthRate: 0.99,
    medianAge: 28.4,
    urbanization: 35.0,
    lat: 20.0,
    lon: 77.0,
    trend: 'up'
  },
  { 
    country: 'États-Unis', 
    population: 331000000,
    growthRate: 0.59,
    medianAge: 38.3,
    urbanization: 82.7,
    lat: 37.0,
    lon: -95.0,
    trend: 'up'
  },
  { 
    country: 'Indonésie', 
    population: 273500000,
    growthRate: 1.07,
    medianAge: 30.2,
    urbanization: 56.0,
    lat: -0.8,
    lon: 113.9,
    trend: 'up'
  },
  { 
    country: 'Pakistan', 
    population: 225200000,
    growthRate: 2.00,
    medianAge: 23.5,
    urbanization: 37.0,
    lat: 30.4,
    lon: 69.3,
    trend: 'up'
  },
  { 
    country: 'Brésil', 
    population: 215300000,
    growthRate: 0.72,
    medianAge: 33.5,
    urbanization: 87.1,
    lat: -14.2,
    lon: -51.9,
    trend: 'up'
  },
  { 
    country: 'Bangladesh', 
    population: 166300000,
    growthRate: 1.01,
    medianAge: 27.6,
    urbanization: 38.0,
    lat: 23.7,
    lon: 90.4,
    trend: 'up'
  },
  { 
    country: 'Nigeria', 
    population: 218500000,
    growthRate: 2.58,
    medianAge: 18.1,
    urbanization: 52.0,
    lat: 9.1,
    lon: 8.7,
    trend: 'up'
  },
  {
    country: 'Russie',
    population: 145900000,
    growthRate: -0.15,
    medianAge: 39.6,
    urbanization: 74.4,
    lat: 61.5,
    lon: 105.3,
    trend: 'down'
  },
  {
    country: 'Japon',
    population: 125800000,
    growthRate: -0.53,
    medianAge: 48.4,
    urbanization: 91.8,
    lat: 36.2,
    lon: 138.3,
    trend: 'down'
  }
];

export default function DemographicMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [indicator, setIndicator] = useState('population');

  const getColorScale = (indicator) => {
    switch (indicator) {
      case 'population':
        return (value) => {
          if (value > 1000000000) return '#dc2626';
          if (value > 100000000) return '#ea580c';
          return '#059669';
        };
      case 'growthRate':
        return (value) => {
          if (value > 2) return '#dc2626';
          if (value > 1) return '#ea580c';
          if (value > 0) return '#059669';
          return '#6b7280';
        };
      case 'medianAge':
        return (value) => {
          if (value > 40) return '#6366f1';
          if (value > 30) return '#8b5cf6';
          return '#ec4899';
        };
      case 'urbanization':
        return (value) => {
          if (value > 80) return '#059669';
          if (value > 50) return '#ea580c';
          return '#dc2626';
        };
      default:
        return () => '#059669';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'Mds';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M';
    return num.toLocaleString();
  };

  const getIndicatorLabel = () => {
    switch (indicator) {
      case 'population': return 'Population totale';
      case 'growthRate': return 'Taux de croissance';
      case 'medianAge': return 'Âge médian';
      case 'urbanization': return 'Taux d\'urbanisation';
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
            Globe Démographique Interactif
          </CardTitle>
          <Select value={indicator} onValueChange={setIndicator}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="population">Population totale</SelectItem>
              <SelectItem value="growthRate">Taux de croissance</SelectItem>
              <SelectItem value="medianAge">Âge médian</SelectItem>
              <SelectItem value="urbanization">Urbanisation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Globe3D
            data={demographicData}
            selectedMetric={indicator}
            colorScale={getColorScale(indicator)}
            onCountryClick={handleCountryClick}
            height={500}
          />

          {/* Légende dynamique */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {indicator === 'population' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 1Md habitants</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">100M - 1Md</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">&lt; 100M</span>
                </div>
              </>
            )}
            {indicator === 'growthRate' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 2% croissance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">1% - 2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">0% - 1%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Déclin</span>
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
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Population:</span>
                  <span className="font-medium">{formatNumber(selectedCountry.population)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Croissance:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{selectedCountry.growthRate}%</span>
                    {selectedCountry.trend === 'up' ? 
                      <TrendingUp className="w-4 h-4 text-green-500" /> : 
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    }
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Âge médian:</span>
                  <span className="font-medium">{selectedCountry.medianAge} ans</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Urbanisation:</span>
                  <span className="font-medium">{selectedCountry.urbanization}%</span>
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
            Faites glisser pour faire tourner le globe • Cliquez sur les points pour plus de détails
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
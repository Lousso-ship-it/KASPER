import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Globe, AlertTriangle } from 'lucide-react';
import Globe3D from '../common/Globe3D';

const countryFinancialData = [
  { 
    country: 'États-Unis', 
    debt: 129, 
    interestRate: 5.5, 
    reserves: 243.1, 
    budgetBalance: -5.8,
    lat: 37.0,
    lon: -95.0
  },
  { 
    country: 'Canada', 
    debt: 105, 
    interestRate: 5.0, 
    reserves: 107.0, 
    budgetBalance: -1.5,
    lat: 56.1,
    lon: -106.3
  },
  { 
    country: 'Allemagne', 
    debt: 66, 
    interestRate: 4.5, 
    reserves: 281.3, 
    budgetBalance: -2.5,
    lat: 51.2,
    lon: 10.5
  },
  { 
    country: 'France', 
    debt: 112, 
    interestRate: 4.5, 
    reserves: 243.1, 
    budgetBalance: -4.9,
    lat: 46.6,
    lon: 2.2
  },
  { 
    country: 'Chine', 
    debt: 77, 
    interestRate: 3.45, 
    reserves: 3173.3, 
    budgetBalance: -2.8,
    lat: 35.0,
    lon: 104.0
  },
  { 
    country: 'Brésil', 
    debt: 73, 
    interestRate: 10.5, 
    reserves: 356.9, 
    budgetBalance: -6.4,
    lat: -14.2,
    lon: -51.9
  },
  { 
    country: 'Japon', 
    debt: 264, 
    interestRate: -0.1, 
    reserves: 1332.2, 
    budgetBalance: -6.4,
    lat: 36.2,
    lon: 138.3
  },
  { 
    country: 'Royaume-Uni', 
    debt: 101, 
    interestRate: 5.25, 
    reserves: 182.4, 
    budgetBalance: -5.5,
    lat: 55.4,
    lon: -3.4
  },
  {
    country: 'Inde',
    debt: 89,
    interestRate: 6.5,
    reserves: 648.0,
    budgetBalance: -6.4,
    lat: 20.0,
    lon: 77.0
  },
  {
    country: 'Australie',
    debt: 45,
    interestRate: 4.35,
    reserves: 65.0,
    budgetBalance: -1.1,
    lat: -25.3,
    lon: 133.8
  }
];

export default function FinancialWorldMap() {
  const [indicator, setIndicator] = useState('debt');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const getColorScale = (indicator) => {
    switch (indicator) {
      case 'debt':
        return (value) => {
          if (value > 120) return '#dc2626';
          if (value > 80) return '#f59e0b';
          if (value > 60) return '#eab308';
          return '#10b981';
        };
      case 'interestRate':
        return (value) => {
          if (value > 7) return '#dc2626';
          if (value > 4) return '#f59e0b';
          if (value > 2) return '#eab308';
          if (value >= 0) return '#10b981';
          return '#6366f1';
        };
      case 'reserves':
        return (value) => {
          if (value > 1000) return '#10b981';
          if (value > 500) return '#eab308';
          if (value > 200) return '#f59e0b';
          return '#dc2626';
        };
      case 'budgetBalance':
        return (value) => {
          if (value > -2) return '#10b981';
          if (value > -4) return '#eab308';
          if (value > -6) return '#f59e0b';
          return '#dc2626';
        };
      default:
        return () => '#3b82f6';
    }
  };

  const getIndicatorLabel = () => {
    switch (indicator) {
      case 'debt': return 'Dette Publique (% PIB)';
      case 'interestRate': return 'Taux d\'Intérêt (%)';
      case 'reserves': return 'Réserves de Change (Mds $)';
      case 'budgetBalance': return 'Balance Budgétaire (% PIB)';
      default: return '';
    }
  };

  const getIndicatorUnit = () => {
    switch (indicator) {
      case 'debt': return '%';
      case 'interestRate': return '%';
      case 'reserves': return 'Mds $';
      case 'budgetBalance': return '%';
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
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5 text-blue-600" />
            Globe Financier Mondial
          </CardTitle>
          <Select value={indicator} onValueChange={setIndicator}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debt">Dette Publique (% PIB)</SelectItem>
              <SelectItem value="interestRate">Taux d'Intérêt (%)</SelectItem>
              <SelectItem value="reserves">Réserves de Change</SelectItem>
              <SelectItem value="budgetBalance">Balance Budgétaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Globe3D
            data={countryFinancialData}
            selectedMetric={indicator}
            colorScale={getColorScale(indicator)}
            onCountryClick={handleCountryClick}
            height={500}
          />

          {/* Légende dynamique */}
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            {indicator === 'debt' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 120% PIB</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">80% - 120%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">60% - 80%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">&lt; 60%</span>
                </div>
              </>
            )}
            {indicator === 'interestRate' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">&gt; 7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">4% - 7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">2% - 4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">0% - 2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Négatif</span>
                </div>
              </>
            )}
          </div>

          {/* Panel d'information détaillé */}
          {selectedCountry && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border w-80">
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
                  <span className="text-sm text-gray-600">Dette Publique:</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{selectedCountry.debt}% PIB</span>
                    {selectedCountry.debt > 100 && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux Directeur:</span>
                  <span className="font-medium">{selectedCountry.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Réserves de Change:</span>
                  <span className="font-medium">{selectedCountry.reserves} Mds $</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Balance Budgétaire:</span>
                  <span className="font-medium">{selectedCountry.budgetBalance}% PIB</span>
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
            Globe financier interactif 3D • Rotation libre • Cliquez sur les pays pour analyser
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
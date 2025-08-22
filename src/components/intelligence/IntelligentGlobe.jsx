import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Globe, Filter, Search, Download, Share2, Eye, EyeOff } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Globe3D from '../common/Globe3D';

// Données consolidées de toutes les sections
const globalData = [
  // Données démographiques
  { 
    country: 'Chine', 
    region: 'Asie',
    // Démographique
    population: 1412000000,
    growthRate: 0.39,
    medianAge: 38.4,
    urbanization: 63.0,
    // Économique
    gdpGrowth: 5.2,
    inflation: 0.8,
    unemployment: 5.2,
    // Financier
    debt: 77,
    interestRate: 3.45,
    reserves: 3173.3,
    budgetBalance: -2.8,
    lat: 35.0,
    lon: 104.0
  },
  { 
    country: 'États-Unis', 
    region: 'Amérique du Nord',
    population: 331000000,
    growthRate: 0.59,
    medianAge: 38.3,
    urbanization: 82.7,
    gdpGrowth: 2.1,
    inflation: 3.2,
    unemployment: 3.7,
    debt: 129,
    interestRate: 5.5,
    reserves: 243.1,
    budgetBalance: -5.8,
    lat: 37.0,
    lon: -95.0
  },
  { 
    country: 'Inde', 
    region: 'Asie',
    population: 1380000000,
    growthRate: 0.99,
    medianAge: 28.4,
    urbanization: 35.0,
    gdpGrowth: 6.1,
    inflation: 5.7,
    unemployment: 7.1,
    debt: 89,
    interestRate: 6.5,
    reserves: 648.0,
    budgetBalance: -6.4,
    lat: 20.0,
    lon: 77.0
  },
  { 
    country: 'Allemagne', 
    region: 'Europe',
    population: 83200000,
    growthRate: -0.14,
    medianAge: 47.1,
    urbanization: 77.5,
    gdpGrowth: 0.1,
    inflation: 2.9,
    unemployment: 3.1,
    debt: 66,
    interestRate: 4.5,
    reserves: 281.3,
    budgetBalance: -2.5,
    lat: 51.2,
    lon: 10.5
  },
  { 
    country: 'France', 
    region: 'Europe',
    population: 67800000,
    growthRate: 0.22,
    medianAge: 42.3,
    urbanization: 81.0,
    gdpGrowth: 0.3,
    inflation: 2.9,
    unemployment: 7.3,
    debt: 112,
    interestRate: 4.5,
    reserves: 243.1,
    budgetBalance: -4.9,
    lat: 46.6,
    lon: 2.2
  },
  { 
    country: 'Brésil', 
    region: 'Amérique du Sud',
    population: 215300000,
    growthRate: 0.72,
    medianAge: 33.5,
    urbanization: 87.1,
    gdpGrowth: 2.9,
    inflation: 4.6,
    unemployment: 8.7,
    debt: 73,
    interestRate: 10.5,
    reserves: 356.9,
    budgetBalance: -6.4,
    lat: -14.2,
    lon: -51.9
  },
  { 
    country: 'Japon', 
    region: 'Asie',
    population: 125800000,
    growthRate: -0.53,
    medianAge: 48.4,
    urbanization: 91.8,
    gdpGrowth: 0.8,
    inflation: 3.1,
    unemployment: 2.4,
    debt: 264,
    interestRate: -0.1,
    reserves: 1332.2,
    budgetBalance: -6.4,
    lat: 36.2,
    lon: 138.3
  },
  { 
    country: 'Royaume-Uni', 
    region: 'Europe',
    population: 67500000,
    growthRate: 0.53,
    medianAge: 40.5,
    urbanization: 84.0,
    gdpGrowth: 0.4,
    inflation: 4.0,
    unemployment: 3.9,
    debt: 101,
    interestRate: 5.25,
    reserves: 182.4,
    budgetBalance: -5.5,
    lat: 55.4,
    lon: -3.4
  },
  { 
    country: 'Canada', 
    region: 'Amérique du Nord',
    population: 38200000,
    growthRate: 1.05,
    medianAge: 41.6,
    urbanization: 81.6,
    gdpGrowth: 1.5,
    inflation: 3.8,
    unemployment: 5.2,
    debt: 105,
    interestRate: 5.0,
    reserves: 107.0,
    budgetBalance: -1.5,
    lat: 56.1,
    lon: -106.3
  },
  { 
    country: 'Australie', 
    region: 'Océanie',
    population: 25700000,
    growthRate: 1.18,
    medianAge: 37.9,
    urbanization: 86.2,
    gdpGrowth: 2.0,
    inflation: 4.1,
    unemployment: 3.5,
    debt: 45,
    interestRate: 4.35,
    reserves: 65.0,
    budgetBalance: -1.1,
    lat: -25.3,
    lon: 133.8
  }
];

const dataCategories = {
  demographic: {
    label: 'Démographique',
    color: '#31A354',
    indicators: {
      population: { label: 'Population', unit: '' },
      growthRate: { label: 'Taux de croissance', unit: '%' },
      medianAge: { label: 'Âge médian', unit: ' ans' },
      urbanization: { label: 'Urbanisation', unit: '%' }
    }
  },
  economic: {
    label: 'Économique',
    color: '#3182BD',
    indicators: {
      gdpGrowth: { label: 'Croissance PIB', unit: '%' },
      inflation: { label: 'Inflation', unit: '%' },
      unemployment: { label: 'Chômage', unit: '%' }
    }
  },
  financial: {
    label: 'Financier',
    color: '#E69F00',
    indicators: {
      debt: { label: 'Dette publique', unit: '% PIB' },
      interestRate: { label: 'Taux directeur', unit: '%' },
      reserves: { label: 'Réserves', unit: ' Mds $' },
      budgetBalance: { label: 'Balance budgétaire', unit: '% PIB' }
    }
  }
};

export default function IntelligentGlobe() {
  const [activeCategory, setActiveCategory] = useState('economic');
  const [activeIndicator, setActiveIndicator] = useState('gdpGrowth');
  const [activeLayers, setActiveLayers] = useState(['countries']);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState([2024]);

  const getColorScale = (category, indicator) => {
    if (category === 'demographic') {
      switch (indicator) {
        case 'population':
          return (value) => {
            if (value > 1000000000) return '#dc2626';
            if (value > 100000000) return '#ea580c';
            return '#059669';
          };
        case 'growthRate':
          return (value) => {
            if (value > 2) return '#10b981';
            if (value > 0) return '#3b82f6';
            return '#ef4444';
          };
        default:
          return () => '#31A354';
      }
    } else if (category === 'economic') {
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
          return () => '#3182BD';
      }
    } else if (category === 'financial') {
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
            if (value >= 0) return '#10b981';
            return '#6366f1';
          };
        default:
          return () => '#E69F00';
      }
    }
    return () => '#6b7280';
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredData = globalData.filter(country => 
    country.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLayer = (layer) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  return (
    <div className="space-y-6">
      {/* Contrôles principaux */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-purple-600" />
              Globe Intelligence Mondiale
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un pays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={activeCategory} onValueChange={(value) => {
              setActiveCategory(value);
              const firstIndicator = Object.keys(dataCategories[value].indicators)[0];
              setActiveIndicator(firstIndicator);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(dataCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={activeIndicator} onValueChange={setActiveIndicator}>
              <SelectTrigger className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(dataCategories[activeCategory].indicators).map(([key, indicator]) => (
                  <SelectItem key={key} value={key}>{indicator.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contrôles des couches */}
          <div className="flex gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="font-medium text-sm">Couches:</span>
            </div>
            {[
              { key: 'countries', label: 'Pays' },
              { key: 'events', label: 'Événements' },
              { key: 'flows', label: 'Flux' }
            ].map(layer => (
              <Button
                key={layer.key}
                variant={activeLayers.includes(layer.key) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLayer(layer.key)}
                className="flex items-center gap-1"
              >
                {activeLayers.includes(layer.key) ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                {layer.label}
              </Button>
            ))}
          </div>

          {/* Slider temporel */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm font-medium">Année:</span>
              <span className="text-sm text-slate-600">{yearFilter[0]}</span>
            </div>
            <Slider
              value={yearFilter}
              onValueChange={setYearFilter}
              min={2020}
              max={2025}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Globe 3D */}
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div className="relative">
            <Globe3D
              data={filteredData}
              selectedMetric={activeIndicator}
              colorScale={getColorScale(activeCategory, activeIndicator)}
              onCountryClick={handleCountryClick}
              height={600}
            />

            {/* Légende dynamique */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: dataCategories[activeCategory].color }}
                />
                {dataCategories[activeCategory].indicators[activeIndicator].label}
              </h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Favorable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Modéré</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Défavorable</span>
                </div>
              </div>
            </div>

            {/* Panel d'information détaillé */}
            {selectedCountry && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border w-80 max-h-96 overflow-y-auto">
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
                
                {/* Onglets des données */}
                <div className="space-y-3">
                  {Object.entries(dataCategories).map(([catKey, category]) => (
                    <div key={catKey}>
                      <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.label}
                      </h4>
                      <div className="grid grid-cols-1 gap-1 text-xs">
                        {Object.entries(category.indicators).map(([indKey, indicator]) => (
                          <div key={indKey} className="flex justify-between">
                            <span className="text-gray-600">{indicator.label}:</span>
                            <span className="font-medium">
                              {selectedCountry[indKey]?.toLocaleString?.() || selectedCountry[indKey]}
                              {indicator.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 text-center border-t">
            <p className="text-sm text-gray-500">
              Globe intelligent multi-sources • Rotation libre • Recherche avancée • Analyse comparative
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
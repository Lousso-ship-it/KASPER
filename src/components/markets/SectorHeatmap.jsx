import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from 'lucide-react';

const sectors = [
  { name: 'Technologie', change: 1.8 },
  { name: 'Santé', change: -0.5 },
  { name: 'Finance', change: 0.9 },
  { name: 'Consommation discrétionnaire', change: 1.2 },
  { name: 'Industrie', change: -1.1 },
  { name: 'Énergie', change: 2.5 },
  { name: 'Services Publics', change: 0.1 },
  { name: 'Matériaux', change: -0.8 },
  { name: 'Immobilier', change: 0.3 },
];

const getHeatmapColor = (change) => {
  if (change > 1.5) return 'bg-green-700 hover:bg-green-600';
  if (change > 0.5) return 'bg-green-600 hover:bg-green-500';
  if (change > 0) return 'bg-green-500 hover:bg-green-400';
  if (change > -0.5) return 'bg-red-500 hover:bg-red-400';
  if (change > -1.5) return 'bg-red-600 hover:bg-red-500';
  return 'bg-red-700 hover:bg-red-600';
};

export default function SectorHeatmap() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-orange-600" />
          <span>Performance des Secteurs</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center">
          {sectors.map(sector => (
            <div 
              key={sector.name}
              className={`p-3 rounded-lg text-white font-semibold flex flex-col justify-center items-center h-24 transition-colors duration-300 ${getHeatmapColor(sector.change)}`}
            >
              <span className="text-sm leading-tight">{sector.name}</span>
              <span className="text-lg mt-1">{sector.change > 0 ? '+' : ''}{sector.change.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
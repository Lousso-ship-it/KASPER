import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from 'lucide-react';

const sectors = [
  { name: 'Technologie', change: 2.1, health: 85 },
  { name: 'Santé', change: -0.2, health: 75 },
  { name: 'Finance', change: 1.5, health: 65 },
  { name: 'Consommation', change: 0.8, health: 80 },
  { name: 'Industrie', change: -1.5, health: 55 },
  { name: 'Énergie', change: 3.2, health: 70 },
];

const getHeatmapColor = (change) => {
  if (change > 1.5) return 'bg-green-600 hover:bg-green-500';
  if (change >= 0) return 'bg-green-500 hover:bg-green-400';
  if (change > -1) return 'bg-red-500 hover:bg-red-400';
  return 'bg-red-600 hover:bg-red-500';
};

export default function SectoralHeatmap() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="w-5 h-5 text-blue-600" /> Performance Sectorielle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center">
          {sectors.map(sector => (
            <div key={sector.name} className={`p-4 rounded-lg text-white transition-all cursor-pointer ${getHeatmapColor(sector.change)}`}>
              <div className="font-bold">{sector.name}</div>
              <div className="text-xl">{sector.change > 0 ? '+' : ''}{sector.change}%</div>
              <div className="text-xs opacity-80">Santé: {sector.health}/100</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
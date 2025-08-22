import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketAssetCard from './MarketAssetCard';
import { Flame, Gem, Wheat } from 'lucide-react';

const commodities = [
  { name: 'Pétrole Brent', price: '90.50 USD', changePercent: 1.25, icon: Flame },
  { name: 'Or', price: '2,350.70 USD', changePercent: -0.20, icon: Gem },
  { name: 'Blé', price: '215.30 EUR', changePercent: 0.80, icon: Wheat },
];

export default function CommoditiesSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-600" />
          <span>Matières Premières</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {commodities.map(item => (
          <MarketAssetCard key={item.name} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}
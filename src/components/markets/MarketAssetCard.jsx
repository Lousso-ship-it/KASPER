import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketAssetCard({ name, price, changePercent, icon }) {
  const isPositive = changePercent >= 0;
  const Icon = icon;

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-6 h-6 text-slate-500" />}
        <div>
          <p className="font-semibold text-slate-800">{name}</p>
          <p className="font-bold text-lg text-slate-900">{price}</p>
        </div>
      </div>
      <div className={`flex items-center gap-1 font-semibold text-md ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
        {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function InsightCard({ icon: Icon, title, value, trend, summary, variant = 'default' }) {
  
  const trendInfo = {
    up: { icon: TrendingUp, color: 'text-green-600' },
    down: { icon: TrendingDown, color: 'text-red-600' },
    stable: { icon: Minus, color: 'text-gray-600' },
  };

  const TrendIcon = trendInfo[trend]?.icon || Minus;
  const trendColor = trendInfo[trend]?.color || 'text-gray-600';
  
  const cardVariants = {
    default: "bg-white",
    warning: "bg-amber-50 border-amber-300",
  }

  return (
    <Card className={`shadow-md ${cardVariants[variant]}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {Icon && <Icon className={`w-6 h-6 mt-1 ${trendColor}`} />}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <TrendIcon className={`w-5 h-5 ${trendColor}`} />
            </div>
            <p className="text-sm text-gray-500 mt-1">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
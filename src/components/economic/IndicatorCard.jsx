import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IndicatorCard = ({ title, icon: Icon, sources, children }) => {
  return (
    <Card className="professional-card">
      <CardHeader>
        <CardTitle className="text-slate-200 text-xl flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-blue-400" />}
          {title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 pt-2">
          {sources.map((source, index) => (
            <Badge key={index} variant="outline" className="text-xs border-slate-700 text-slate-400 bg-slate-800/50">
              {source}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default IndicatorCard;
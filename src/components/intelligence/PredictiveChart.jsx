import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PredictiveChart({ data, title, dataKey, unit = '', strokeColor = '#2563eb' }) {
  const forecastStartYear = data.forecast[0].year;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" data={data.historical.concat(data.forecast.slice(1))} fontSize={12} />
              <YAxis fontSize={12} unit={unit} />
              <Tooltip formatter={(value) => `${value}${unit}`} />
              <Legend verticalAlign="top" height={36} />
              
              <ReferenceLine x={forecastStartYear} stroke="red" strokeDasharray="3 3" />

              <Line 
                type="monotone" 
                dataKey={dataKey}
                data={data.historical}
                stroke={strokeColor}
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Historique"
              />
              <Line 
                type="monotone" 
                dataKey={dataKey}
                data={data.forecast}
                stroke={strokeColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Prévision"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
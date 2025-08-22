import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { year: '2021', USA: 0.25, CAN: 0.25, EU: 0.00 },
  { year: '2022', USA: 4.50, CAN: 4.25, EU: 2.50 },
  { year: '2023', USA: 5.50, CAN: 5.00, EU: 4.50 },
  { year: '2024', USA: 5.50, CAN: 5.00, EU: 4.50 },
  { year: '2025 (P)', USA: 4.75, CAN: 4.50, EU: 4.00 },
];

export default function InterestRateChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Évolution des Taux d'Intérêt Directeurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Line type="monotone" dataKey="USA" stroke="#ef4444" strokeWidth={2} name="États-Unis" />
              <Line type="monotone" dataKey="CAN" stroke="#22c55e" strokeWidth={2} name="Canada" />
              <Line type="monotone" dataKey="EU" stroke="#3b82f6" strokeWidth={2} name="Zone Euro" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
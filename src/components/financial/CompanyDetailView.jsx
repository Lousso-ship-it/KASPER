import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { X } from 'lucide-react';

const revenueData = [
  { year: '2021', revenue: 8.5 },
  { year: '2022', revenue: 11.2 },
  { year: '2023', revenue: 14.4 },
];

export default function CompanyDetailView({ company, onClose }) {
  return (
    <Card className="shadow-lg border-2 border-primary mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Détail : {company.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5" /></Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Informations Clés</h4>
          <p><strong>Secteur :</strong> <Badge variant="secondary">{company.sector}</Badge></p>
          <p><strong>Statut :</strong> <Badge variant={company.status === 'active' ? 'default' : 'destructive'}>{company.status}</Badge></p>
          <p><strong>Revenus (dernier) :</strong> {company.revenue}</p>
          <p><strong>Endettement :</strong> {company.debt}</p>
          <p><strong>Score de Vitalité :</strong> {company.vitality}/100</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Évolution des Revenus (B$)</h4>
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis dataKey="year" />
                <YAxis unit="B$" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-slate-500">Sources: OpenCorporates, Crunchbase. Données simulées.</p>
      </CardFooter>
    </Card>
  );
}
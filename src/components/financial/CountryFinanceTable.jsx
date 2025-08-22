import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gauge, AlertTriangle, ShieldCheck } from 'lucide-react';

const healthScoreStyle = (score) => {
  if (score > 75) return 'text-green-600';
  if (score > 50) return 'text-yellow-600';
  return 'text-red-600';
};

const data = [
  { country: 'USA', debt: 129, budgetGrowth: -5.8, lastUpdate: '2024-05-01', healthScore: 65 },
  { country: 'Canada', debt: 105, budgetGrowth: -1.5, lastUpdate: '2024-04-20', healthScore: 78 },
  { country: 'Allemagne', debt: 66, budgetGrowth: -2.5, lastUpdate: '2024-05-10', healthScore: 85 },
  { country: 'France', debt: 112, budgetGrowth: -4.9, lastUpdate: '2023-10-15', healthScore: 58 },
  { country: 'Japon', debt: 264, budgetGrowth: -6.4, lastUpdate: '2024-03-30', healthScore: 45 },
];

export default function CountryFinanceTable() {
  const isOutdated = (dateStr) => new Date(dateStr) < new Date(new Date().setMonth(new Date().getMonth() - 6));
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="w-5 h-5 text-blue-600" /> Indicateurs Clés par Pays
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pays</TableHead>
              <TableHead>Dette/PIB (%)</TableHead>
              <TableHead>Déficit Budgétaire (%)</TableHead>
              <TableHead>Dernière MAJ</TableHead>
              <TableHead>Score de Santé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.country}>
                <TableCell className="font-bold">{d.country}</TableCell>
                <TableCell>{d.debt}</TableCell>
                <TableCell>{d.budgetGrowth}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {isOutdated(d.lastUpdate) && <AlertTriangle className="w-4 h-4 text-orange-500" title="Données anciennes" />}
                  {d.lastUpdate}
                </TableCell>
                <TableCell className={`font-bold flex items-center gap-2 ${healthScoreStyle(d.healthScore)}`}>
                  <Gauge className="w-4 h-4" /> {d.healthScore}/100
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
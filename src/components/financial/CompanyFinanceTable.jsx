import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, BarChart, Donut } from 'lucide-react';

const data = [
  { id: 1, name: 'Stripe', sector: 'Technologie', revenue: '14.4B $', debt: '2.1B $', status: 'active', vitality: 88 },
  { id: 2, name: 'Sanofi', sector: 'Santé', revenue: '43.1B €', debt: '27.5B €', status: 'active', vitality: 72 },
  { id: 3, name: 'TotalEnergies', sector: 'Énergie', revenue: '237.1B $', debt: '62.7B $', status: 'active', vitality: 78 },
  { id: 4, name: 'Made.com', sector: 'Consommation', revenue: 'N/A', debt: 'N/A', status: 'insolvent', vitality: 5 },
];

export default function CompanyFinanceTable({ onSelectCompany }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building className="w-5 h-5 text-blue-600" /> Données d'Entreprises
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Secteur</TableHead>
              <TableHead>Revenus</TableHead>
              <TableHead>Endettement</TableHead>
              <TableHead>Score Vitalité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.id} onClick={() => onSelectCompany(d)} className="cursor-pointer hover:bg-slate-50">
                <TableCell className="font-bold">{d.name}</TableCell>
                <TableCell>{d.sector}</TableCell>
                <TableCell>{d.revenue}</TableCell>
                <TableCell>{d.debt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Donut className="w-4 h-4" /> {d.vitality}/100
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
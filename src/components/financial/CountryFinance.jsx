import React from 'react';
import FinancialWorldMap from './FinancialWorldMap';
import InterestRateChart from './InterestRateChart';
import CountryFinanceTable from './CountryFinanceTable';
import AutomatedInsights from './AutomatedInsights';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

// Simule un calendrier financier
const FinancialCalendar = () => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg"><Calendar className="w-5 h-5 text-blue-600" /> Calendrier Financier</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3 text-sm">
        <li className="flex justify-between"><span>Publication Dette USA</span> <span className="font-semibold">05/08/2025</span></li>
        <li className="flex justify-between"><span>Budget National - France</span> <span className="font-semibold">15/09/2025</span></li>
        <li className="flex justify-between"><span>Annonce Taux - BCE</span> <span className="font-semibold">28/09/2025</span></li>
      </ul>
    </CardContent>
  </Card>
);

export default function CountryFinance() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FinancialWorldMap />
        </div>
        <div className="space-y-8">
          <AutomatedInsights />
          <FinancialCalendar />
        </div>
      </div>
      <InterestRateChart />
      <CountryFinanceTable />
    </div>
  );
}
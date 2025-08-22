import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

export default function AutomatedInsights() {
  return (
    <Card className="shadow-lg bg-slate-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-yellow-500" /> Insights Automatisés
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-sm list-disc pl-4 text-slate-700">
          <li>La dette des pays du G7 a augmenté de 5% en moyenne depuis 2023.</li>
          <li>Les taux d'intérêt de la BCE et de la FED convergent, réduisant les écarts.</li>
          <li>Alerte : Les données pour la France n'ont pas été mises à jour depuis plus de 6 mois.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

export default function Portfolio({ connections }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
          PORTFOLIO GLOBAL
        </h2>
        <p className="text-[#a0a0a0] font-mono">
          Vue consolidée de vos actifs sur tous les brokers connectés.
        </p>
      </div>
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-white font-mono text-lg">Résumé du Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-8 text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-[#a0a0a0]" />
                <h3 className="text-xl font-bold text-white mb-2 font-mono">DONNÉES DE PORTFOLIO INDISPONIBLES</h3>
                <p className="text-[#a0a0a0] font-mono">Connectez un broker pour voir votre portfolio.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
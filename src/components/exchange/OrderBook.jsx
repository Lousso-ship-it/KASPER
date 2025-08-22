import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from 'lucide-react';

export default function OrderBook({ connections }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
          CARNETS D'ORDRES
        </h2>
        <p className="text-[#a0a0a0] font-mono">
          Visualisez la profondeur de marché en temps réel pour les paires sélectionnées.
        </p>
      </div>
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-white font-mono text-lg">Profondeur du Marché</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="p-8 text-center">
                <Activity className="w-16 h-16 mx-auto mb-4 text-[#a0a0a0]" />
                <h3 className="text-xl font-bold text-white mb-2 font-mono">CARNET D'ORDRES INDISPONIBLE</h3>
                <p className="text-[#a0a0a0] font-mono">Sélectionnez une connexion et une paire de trading.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bot, Link } from "lucide-react";

export default function TradingDashboard({ connections, bots }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
          TABLEAU DE BORD OPÉRATIONNEL
        </h2>
        <p className="text-[#a0a0a0] font-mono">
          Vue d'ensemble de vos activités de trading et de vos connexions.
        </p>
      </div>
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-white font-mono text-lg">Statut Actuel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8 text-white font-mono">
            <div className="flex items-center gap-2">
              <Link className="w-5 h-5 text-[#ff6b35]" />
              <span>{connections.length} Connexion{connections.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#ff6b35]" />
              <span>{bots.length} Bot{bots.length > 1 ? 's' : ''} de Trading</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="tactical-card">
         <CardContent className="p-8 text-center">
            <h3 className="text-xl text-white font-mono">Plus de widgets de tableau de bord à venir...</h3>
         </CardContent>
      </Card>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";

export default function BotManager({ bots, connections, onUpdate }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
            GESTIONNAIRE DE BOTS
          </h2>
          <p className="text-[#a0a0a0] font-mono">
            Créez, configurez et déployez vos stratégies de trading automatisées.
          </p>
        </div>
        <Button className="tactical-button">
          <Plus className="w-5 h-5 mr-2" />
          CRÉER UN BOT
        </Button>
      </div>
      <Card className="tactical-card">
        <CardHeader>
          <CardTitle className="text-white font-mono text-lg">Bots Déployés</CardTitle>
        </CardHeader>
        <CardContent>
            {bots && bots.length > 0 ? (
                 <p className="text-[#a0a0a0] font-mono">{bots.length} bot(s) trouvé(s).</p>
            ) : (
                <div className="p-8 text-center">
                    <Bot className="w-16 h-16 mx-auto mb-4 text-[#a0a0a0]" />
                    <h3 className="text-xl font-bold text-white mb-2 font-mono">AUCUN BOT DÉPLOYÉ</h3>
                    <p className="text-[#a0a0a0] font-mono">Créez votre premier bot pour commencer.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
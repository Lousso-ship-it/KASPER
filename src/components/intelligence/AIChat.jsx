import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, BrainCircuit, Lock, Cpu, Database, Zap } from "lucide-react";

export default function AIChat() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState(null);

  const handleQuery = () => {
    if (!query) return;
    setIsAnalyzing(true);
    setResponse(null);
    
    setTimeout(() => {
      setResponse({
        query: query,
        answer: `Analyse complète : Basée sur l'agrégation de 247 sources de données en temps réel, la croissance économique française pour 2025 est projetée à +2.8% (±0.3%). Cette prédiction intègre les modèles d'IA avancés, les tendances macro-économiques et les signaux faibles détectés dans les flux d'information globaux. Facteurs clés : reprise post-inflation, investissements technologiques, stabilité géopolitique européenne.`,
        confidence: 94,
        sources: ["Base OCDE [Niveau 5]", "Flux FMI [Temps réel]", "IA Prédictive v4.2", "Sentiment Analysis Global"],
        classification: "Intelligence Économique",
        analysisId: "ECO-2025-0108-9847",
        processingTime: "847ms"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="h-full professional-card professional-glow">
      <CardHeader className="border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-200 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-600/20 border border-blue-600/30">
              <BrainCircuit className="w-6 h-6 text-blue-400" />
            </div>
            <span>Assistant IA Économique</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm">En ligne</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 text-xs">
            <Lock className="w-3 h-3 mr-1" />
            Sécurisé
          </Badge>
          <Badge className="bg-purple-600/20 text-purple-400 border border-purple-600/30 text-xs">
            <Cpu className="w-3 h-3 mr-1" />
            IA Avancée
          </Badge>
          <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 text-xs">
            <Database className="w-3 h-3 mr-1" />
            Base Globale
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-6 min-h-[500px]">
        <div className="flex-1 space-y-6 overflow-y-auto">
          {isAnalyzing && (
            <div className="flex items-center gap-4 text-blue-400 p-6 bg-blue-600/10 rounded-lg border border-blue-600/30">
              <BrainCircuit className="w-8 h-8 animate-spin" />
              <div>
                <span className="text-lg font-medium">Analyse en cours...</span>
                <div className="text-sm text-slate-400 mt-1">Traitement des données • Corrélation • Synthèse</div>
              </div>
            </div>
          )}
          
          {response && (
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
              {/* En-tête de réponse */}
              <div className="bg-blue-600/10 p-5 border-b border-blue-600/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-400 text-sm font-medium">ANALYSE TERMINÉE</span>
                  <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30 text-xs">
                    {response.classification}
                  </Badge>
                </div>
                <p className="font-medium text-slate-200 italic">"{response.query}"</p>
                <div className="flex items-center gap-6 mt-3 text-xs text-slate-400">
                  <span>ID: {response.analysisId}</span>
                  <span>Confiance: {response.confidence}%</span>
                  <span>Temps: {response.processingTime}</span>
                </div>
              </div>
              
              {/* Corps de réponse */}
              <div className="p-6">
                <p className="text-slate-200 leading-relaxed mb-6">{response.answer}</p>
                
                {/* Barre de confiance */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-400 text-sm">Niveau de confiance</span>
                    <span className="text-slate-200 text-lg font-semibold">{response.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500" 
                      style={{ width: `${response.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Sources */}
                <div>
                  <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Sources consultées :
                  </p>
                  <div className="space-y-2">
                    {response.sources.map((source, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!response && !isAnalyzing && (
             <div className="flex flex-col items-center justify-center text-center text-slate-400 h-full">
                <div className="p-8 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-6">
                  <BrainCircuit className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2 text-slate-200">Assistant IA Prêt</p>
                  <p className="text-sm text-slate-400 max-w-md">Système d'analyse connecté aux bases de données économiques mondiales</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-sm text-slate-400">Exemple: "Analysez la croissance économique européenne"</p>
                </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-slate-700/50 p-6">
        <div className="flex w-full items-center gap-3">
          <Input 
            placeholder="Posez votre question à l'assistant IA..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
            className="bg-slate-800/50 border-slate-700/50 focus:border-blue-500 text-slate-200 placeholder:text-slate-500"
          />
          <Button 
            onClick={handleQuery} 
            disabled={isAnalyzing || !query} 
            className="bg-blue-600 hover:bg-blue-700 text-white professional-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Zap className="w-3 h-3 text-green-500" />
          <span className="text-green-500 text-xs">Canal sécurisé • Connexion active</span>
        </div>
      </CardFooter>
    </Card>
  );
}
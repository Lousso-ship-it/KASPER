import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Target,
  Zap,
  Globe,
  BarChart3,
  Layers,
  Wifi
} from 'lucide-react';

const StrategicDashboard = () => {
  // Indicateurs stratégiques professionnels
  const strategicIndicators = [
    {
      id: 'global_stability',
      name: 'Stabilité Globale',
      value: 78,
      trend: 'up',
      change: '+5.2%',
      status: 'good',
      components: ['PIB Mondial', 'Inflation', 'Emploi', 'Commerce'],
      description: 'Indice composite de stabilité économique mondiale'
    },
    {
      id: 'market_volatility',
      name: 'Volatilité Marchés',
      value: 45,
      trend: 'down',
      change: '-12.8%',
      status: 'stable',
      components: ['VIX', 'Spreads', 'Crypto', 'Matières Premières'],
      description: 'Mesure de l\'instabilité des marchés financiers'
    },
    {
      id: 'innovation_index',
      name: 'Innovation Technologique',
      value: 92,
      trend: 'up',
      change: '+18.3%',
      status: 'excellent',
      components: ['R&D', 'Brevets', 'Startups', 'IA'],
      description: 'Évaluation de l\'innovation technologique mondiale'
    },
    {
      id: 'sentiment_analysis',
      name: 'Sentiment Économique',
      value: 73,
      trend: 'up',
      change: '+7.1%',
      status: 'good',
      components: ['Médias', 'Marchés', 'Enquêtes', 'Social'],
      description: 'Analyse des sentiments économiques globaux'
    }
  ];

  const regionalData = [
    { region: 'Amérique du Nord', score: 85, trend: 'stable', status: 'excellent' },
    { region: 'Europe', score: 78, trend: 'improving', status: 'good' },
    { region: 'Asie-Pacifique', score: 82, trend: 'improving', status: 'excellent' },
    { region: 'Amérique Latine', score: 65, trend: 'stable', status: 'moderate' },
    { region: 'Moyen-Orient', score: 48, trend: 'deteriorating', status: 'alert' },
    { region: 'Afrique', score: 58, trend: 'improving', status: 'moderate' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-400/20 border-green-400/40';
      case 'good': return 'text-blue-400 bg-blue-400/20 border-blue-400/40';
      case 'stable': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/40';
      case 'moderate': return 'text-orange-400 bg-orange-400/20 border-orange-400/40';
      case 'alert': return 'text-red-400 bg-red-400/20 border-red-400/40';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/40';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Colonne principale - Indicateurs */}
      <div className="xl:col-span-3 space-y-8">
        {/* Indicateurs composites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {strategicIndicators.map((indicator) => (
            <Card key={indicator.id} className="professional-card hover:professional-glow transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <CardTitle className="text-slate-200 text-lg flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-400" />
                    {indicator.name}
                  </CardTitle>
                  <Badge className={`${getStatusColor(indicator.status)} text-xs border`}>
                    {indicator.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-semibold text-slate-100">
                    {indicator.value}
                    <span className="text-xl text-slate-400">/100</span>
                  </div>
                  <div className={`flex items-center gap-2 ${indicator.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {indicator.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    <span className="text-lg font-medium">{indicator.change}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Progress value={indicator.value} className="h-2 bg-slate-700" />
                  <p className="text-sm text-slate-400 leading-relaxed">{indicator.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {indicator.components.map((comp, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-slate-600 text-slate-400 bg-slate-800/50">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analyse régionale */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-slate-200 flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-400" />
              Analyse Régionale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalData.map((region, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-slate-200 font-medium text-sm">{region.region}</div>
                    <div className={`w-3 h-3 rounded-full ${
                      region.status === 'excellent' ? 'bg-green-400' :
                      region.status === 'good' ? 'bg-blue-400' :
                      region.status === 'moderate' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                  </div>
                  <div className={`text-3xl font-semibold mb-2 ${getScoreColor(region.score)}`}>{region.score}</div>
                  <div className="text-xs text-slate-400 uppercase mb-3">{region.trend}</div>
                  <Progress value={region.score} className="h-2 bg-slate-700" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Colonne latérale - Contrôles et alertes */}
      <div className="space-y-6">
        {/* Alertes système */}
        <Card className="professional-card border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5" />
              Alertes Active
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <div className="text-red-400 text-xs mb-2 font-medium">CRITIQUE</div>
              <div className="text-slate-200 text-sm">Anomalie détectée crypto</div>
              <div className="text-red-400 text-xs mt-1">16:23 UTC</div>
            </div>
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
              <div className="text-orange-400 text-xs mb-2 font-medium">ATTENTION</div>
              <div className="text-slate-200 text-sm">Volatilité marchés émergents</div>
              <div className="text-orange-400 text-xs mt-1">15:45 UTC</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="text-blue-400 text-xs mb-2 font-medium">INFO</div>
              <div className="text-slate-200 text-sm">Mise à jour modèles terminée</div>
              <div className="text-blue-400 text-xs mt-1">14:12 UTC</div>
            </div>
          </CardContent>
        </Card>

        {/* Contrôles système */}
        <Card className="professional-card">
          <CardHeader>
            <CardTitle className="text-slate-200 text-lg flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400" />
              Actions Rapides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white professional-button">
              <Zap className="w-4 h-4 mr-2" />
              Synchroniser
            </Button>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800/30 professional-button">
              <BarChart3 className="w-4 h-4 mr-2" />
              Rapport
            </Button>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800/30 professional-button">
              <Layers className="w-4 h-4 mr-2" />
              Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Statut système */}
        <Card className="professional-card border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg flex items-center gap-3">
              <Activity className="w-5 h-5" />
              Statut Système
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">Flux de données</span>
              <span className="text-green-400 text-sm font-medium">ACTIF</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">IA</span>
              <span className="text-green-400 text-sm font-medium">OPTIMAL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">Prédictions</span>
              <span className="text-blue-400 text-sm font-medium">EN COURS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">Sécurité</span>
              <span className="text-green-400 text-sm font-medium">SÉCURISÉ</span>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="text-slate-400 text-xs mb-2">Dernière synchronisation</div>
              <div className="text-slate-200 text-sm">2025-01-08 16:47:32 UTC</div>
              <div className="text-green-400 text-xs mt-1">• Temps réel</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategicDashboard;
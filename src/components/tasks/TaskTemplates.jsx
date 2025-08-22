import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Users, 
  Newspaper,
  Activity,
  AlertTriangle,
  FileText
} from "lucide-react";

const taskTemplates = [
  {
    title: "Recevoir les prévisions météo quotidiennes",
    description: "Fournir les prévisions météo du jour pour (Pays ou Ville), notamment la température, les précipitations...",
    category: "daily",
    type: "reporting",
    icon: TrendingUp,
    color: "border-blue-500/30 hover:bg-blue-500/5"
  },
  {
    title: "Recevoir un résumé technologique quotidien", 
    description: "Résume les développements les plus importants en IA et en technologie des dernières 24 heures...",
    category: "daily",
    type: "reporting", 
    icon: Activity,
    color: "border-green-500/30 hover:bg-green-500/5"
  },
  {
    title: "Surveillance des taux d'intérêt",
    description: "Surveille les annonces et modifications des taux directeurs des principales banques centrales.",
    category: "financial",
    type: "monitoring",
    icon: DollarSign,
    color: "border-yellow-500/30 hover:bg-yellow-500/5"
  },
  {
    title: "Analyse sectorielle des marchés",
    description: "Analyse de la performance des différents secteurs du marché, identifiant leaders et retardataires.",
    category: "markets",
    type: "analysis",
    icon: BarChart3,
    color: "border-purple-500/30 hover:bg-purple-500/5"
  },
  {
    title: "Alerte inflation critique",
    description: "Déclenche une alerte si le taux d'inflation annuel dans un pays dépasse un seuil critique.",
    category: "economic",
    type: "alert",
    icon: AlertTriangle,
    color: "border-red-500/30 hover:bg-red-500/5"
  },
  {
    title: "Rapport démographique mensuel",
    description: "Génère un rapport sur les évolutions démographiques et les tendances migratoires.",
    category: "socio_demographic", 
    type: "reporting",
    icon: Users,
    color: "border-indigo-500/30 hover:bg-indigo-500/5"
  }
];

export default function TaskTemplates({ onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {taskTemplates.map((template, index) => {
        const Icon = template.icon;
        return (
          <Card 
            key={index}
            className={`bg-[#2a2a2a] border ${template.color} cursor-pointer transition-all duration-200 hover:scale-105`}
            onClick={() => onSelect(template)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#3a3a3a] border border-[#4a4a4a]">
                  <Icon className="w-5 h-5 text-[#ff6b35]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-mono font-semibold text-base mb-2">
                    {template.title}
                  </h3>
                  <p className="text-[#a0a0a0] font-mono text-sm leading-relaxed">
                    {template.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 rounded bg-[#3a3a3a] text-[#a0a0a0] font-mono">
                      {template.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
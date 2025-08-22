import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Users, 
  Newspaper,
  Play,
  Clock,
  FileText,
  AlertTriangle,
  Activity
} from "lucide-react";

const categoryIcons = {
  economic: TrendingUp,
  financial: DollarSign,
  markets: BarChart3,
  socio_demographic: Users,
  news: Newspaper
};

const typeIcons = {
  analysis: Activity,
  monitoring: Play,
  reporting: FileText,
  alert: AlertTriangle
};

const typeColors = {
  analysis: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  monitoring: "bg-green-600/20 text-green-400 border-green-500/30",
  reporting: "bg-purple-600/20 text-purple-400 border-purple-500/30",
  alert: "bg-red-600/20 text-red-400 border-red-500/30"
};

const frequencyLabels = {
  daily: "Quotidien",
  weekly: "Hebdomadaire",
  monthly: "Mensuel",
  quarterly: "Trimestriel",
  yearly: "Annuel",
  realtime: "Temps réel"
};

const taskExamples = [
  // ÉCONOMIQUE
  {
    category: "economic",
    type: "analysis",
    title: "Analyse trimestrielle du PIB (G7)",
    description: "Fournit une analyse comparative de la croissance du Produit Intérieur Brut pour les pays du G7, incluant les projections et les facteurs d'influence.",
    frequency: "quarterly",
    parameters: ["PIB_croissance", "PIB_nominal", "G7"]
  },
  {
    category: "economic",
    type: "monitoring",
    title: "Surveillance des indicateurs de confiance",
    description: "Surveille les indices de confiance des entreprises et des consommateurs en France et en Allemagne.",
    frequency: "weekly",
    parameters: ["confiance_entreprises", "confiance_consommateurs"]
  },
  {
    category: "economic",
    type: "alert",
    title: "Alerte d'inflation critique",
    description: "Déclenche une alerte si le taux d'inflation annuel dans un pays du G20 dépasse un seuil de 3.5%.",
    frequency: "daily",
    parameters: ["seuil: 3.5%", "G20"]
  },
  {
    category: "economic",
    type: "reporting",
    title: "Rapport mensuel macroéconomique",
    description: "Génère un rapport concis des principales statistiques macroéconomiques mondiales.",
    frequency: "monthly",
    parameters: ["PIB", "inflation", "chômage", "taux_directeurs"]
  },

  // FINANCIER
  {
    category: "financial",
    type: "analysis",
    title: "Analyse des rendements obligataires",
    description: "Analyse la courbe des rendements des obligations d'État pour les principales économies mondiales.",
    frequency: "weekly",
    parameters: ["obligations_souveraines", "10_ans", "30_ans"]
  },
  {
    category: "financial",
    type: "monitoring",
    title: "Surveillance des taux directeurs",
    description: "Surveille les annonces et modifications des taux directeurs des principales banques centrales.",
    frequency: "daily",
    parameters: ["FED", "BCE", "BoJ", "BoE"]
  },
  {
    category: "financial",
    type: "alert",
    title: "Alerte de baisse de notation souveraine",
    description: "Alerte si une agence de notation abaisse la notation de crédit d'un pays du G20.",
    frequency: "daily",
    parameters: ["S&P", "Moody's", "Fitch"]
  },
  {
    category: "financial",
    type: "reporting",
    title: "Rapport de stabilité financière",
    description: "Compile un rapport sur les signes de stress dans le système financier global.",
    frequency: "weekly",
    parameters: ["crédit", "devises", "taux"]
  },

  // MARCHÉS
  {
    category: "markets",
    type: "analysis",
    title: "Analyse sectorielle S&P 500",
    description: "Analyse de la performance des différents secteurs du S&P 500, identifiant leaders et retardataires.",
    frequency: "monthly",
    parameters: ["S&P_500", "performance_sectorielle"]
  },
  {
    category: "markets",
    type: "monitoring",
    title: "Surveillance volatilité crypto",
    description: "Surveille la volatilité de Bitcoin et Ethereum, signalant les pics anormaux.",
    frequency: "daily",
    parameters: ["Bitcoin", "Ethereum", "volatilité_haute"]
  },
  {
    category: "markets",
    type: "alert",
    title: "Alerte mouvement majeur indice",
    description: "Alerte si le CAC 40 ou le DAX chute/monte de plus de 2% en une séance.",
    frequency: "daily",
    parameters: ["CAC_40", "DAX", "seuil: 2%"]
  },
  {
    category: "markets",
    type: "reporting",
    title: "Rapport marchés asiatiques",
    description: "Résumé des mouvements majeurs des indices boursiers asiatiques.",
    frequency: "daily",
    parameters: ["Nikkei", "Shanghai", "Hang_Seng"]
  },

  // SOCIO-DÉMOGRAPHIQUE
  {
    category: "socio_demographic",
    type: "analysis",
    title: "Analyse des tendances migratoires UE",
    description: "Analyse les flux migratoires vers l'Union Européenne et leur impact démographique.",
    frequency: "yearly",
    parameters: ["Union_Européenne", "démographie", "marché_travail"]
  },
  {
    category: "socio_demographic",
    type: "monitoring",
    title: "Suivi indicateurs développement humain",
    description: "Surveille les indicateurs de développement humain pour les pays en développement.",
    frequency: "yearly",
    parameters: ["PNUD", "IDH", "pays_développement"]
  },
  {
    category: "socio_demographic",
    type: "alert",
    title: "Alerte crise humanitaire potentielle",
    description: "Alerte en cas de hausse significative des déplacements internes ou flux de réfugiés.",
    frequency: "monthly",
    parameters: ["déplacements", "réfugiés", "seuil: 20%"]
  },
  {
    category: "socio_demographic",
    type: "reporting",
    title: "Rapport population mondiale",
    description: "Rapport sur la croissance démographique mondiale et les projections.",
    frequency: "quarterly",
    parameters: ["croissance_démographique", "projections_2050"]
  },

  // ACTUALITÉS
  {
    category: "news",
    type: "analysis",
    title: "Analyse sentiment médiatique Tech",
    description: "Analyse le sentiment des articles de presse concernant les grandes entreprises technologiques.",
    frequency: "daily",
    parameters: ["GAFAM", "Big_Tech", "sentiment"]
  },
  {
    category: "news",
    type: "monitoring",
    title: "Veille actualités économiques France",
    description: "Surveille les actualités économiques clés pour la France à partir de sources sélectionnées.",
    frequency: "daily",
    parameters: ["France", "Les_Echos", "Le_Monde"]
  },
  {
    category: "news",
    type: "alert",
    title: "Alerte fusion/acquisition sectorielle",
    description: "Alerte en cas de fusion ou acquisition majeure dans les secteurs technologie/bancaire.",
    frequency: "realtime",
    parameters: ["fusion", "acquisition", "technologie", "bancaire"]
  },
  {
    category: "news",
    type: "reporting",
    title: "Résumé titres géopolitiques",
    description: "Génère un résumé des 5 principaux titres de l'actualité géopolitique mondiale.",
    frequency: "daily",
    parameters: ["géopolitique", "top_5_headlines"]
  }
];

const TaskExampleCard = ({ task, onUseTemplate }) => {
  const CategoryIcon = categoryIcons[task.category];
  const TypeIcon = typeIcons[task.type];

  return (
    <Card className="tactical-card w-80 flex-shrink-0 h-80 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[#ff6b35]/20 border border-[#ff6b35]/30">
              <CategoryIcon className="w-4 h-4 text-[#ff6b35]" />
            </div>
            <Badge className={typeColors[task.type]}>
              <TypeIcon className="w-3 h-3 mr-1" />
              {task.type.toUpperCase()}
            </Badge>
          </div>
          <Badge variant="outline" className="border-[#3a3a3a] text-[#a0a0a0] text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {frequencyLabels[task.frequency]}
          </Badge>
        </div>
        <CardTitle className="text-white font-mono text-sm leading-tight">
          {task.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-between">
        <p className="text-[#a0a0a0] font-mono text-xs leading-relaxed mb-4">
          {task.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {task.parameters.slice(0, 3).map((param, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded bg-[#3a3a3a] text-[#a0a0a0] font-mono"
              >
                {param}
              </span>
            ))}
            {task.parameters.length > 3 && (
              <span className="text-xs px-2 py-1 rounded bg-[#3a3a3a] text-[#a0a0a0] font-mono">
                +{task.parameters.length - 3}
              </span>
            )}
          </div>
          
          <Button 
            onClick={() => onUseTemplate(task)}
            className="w-full tactical-button text-xs h-8"
          >
            UTILISER CE MODÈLE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TaskExamplesCarousel({ onUseTemplate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTasks = selectedCategory === "all" 
    ? taskExamples 
    : taskExamples.filter(task => task.category === selectedCategory);

  const visibleTasks = 4;
  const maxIndex = Math.max(0, filteredTasks.length - visibleTasks);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const categories = [
    { id: "all", label: "TOUTES", icon: BarChart3 },
    { id: "economic", label: "ÉCONOMIQUE", icon: TrendingUp },
    { id: "financial", label: "FINANCIER", icon: DollarSign },
    { id: "markets", label: "MARCHÉS", icon: BarChart3 },
    { id: "socio_demographic", label: "SOCIO-DÉMO", icon: Users },
    { id: "news", label: "ACTUALITÉS", icon: Newspaper }
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentIndex(0);
              }}
              className={`flex items-center gap-2 whitespace-nowrap text-xs h-8 px-3 ${
                selectedCategory === category.id 
                  ? "tactical-button" 
                  : "text-[#a0a0a0] hover:text-white border border-[#3a3a3a] hover:bg-[#3a3a3a]"
              }`}
            >
              <Icon className="w-3 h-3" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="flex-shrink-0 text-[#a0a0a0] hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="overflow-hidden flex-1">
            <div 
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (320 + 16)}px)` }}
            >
              {filteredTasks.map((task, index) => (
                <TaskExampleCard 
                  key={`${task.category}-${task.type}-${index}`}
                  task={task} 
                  onUseTemplate={onUseTemplate}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="flex-shrink-0 text-[#a0a0a0] hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-1 rounded-full transition-colors ${
                index === currentIndex ? "bg-[#ff6b35]" : "bg-[#3a3a3a]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const timelineEvents = [
  {
    date: new Date(),
    time: "14:30",
    title: "Décision de la BCE sur les taux directeurs",
    description: "Maintien des taux à 4.50%, Christine Lagarde souligne la vigilance face à l'inflation",
    category: "monetary_policy",
    impact: "high",
    icon: DollarSign
  },
  {
    date: subDays(new Date(), 1),
    time: "16:00",
    title: "Publication des chiffres de l'emploi américain",
    description: "Taux de chômage stable à 3.7%, créations d'emplois supérieures aux attentes",
    category: "employment",
    impact: "medium",
    icon: TrendingUp
  },
  {
    date: subDays(new Date(), 2),
    time: "09:00",
    title: "Crise énergétique européenne",
    description: "Flambée des prix du gaz naturel, impact sur l'industrie manufacturière",
    category: "energy",
    impact: "high",
    icon: AlertCircle
  },
  {
    date: subDays(new Date(), 3),
    time: "11:45",
    title: "Résultats trimestriels des GAFAM",
    description: "Apple et Microsoft dépassent les attentes, boost pour le secteur tech",
    category: "earnings",
    impact: "medium",
    icon: TrendingUp
  },
  {
    date: subDays(new Date(), 5),
    time: "08:30",
    title: "Assouplissement des restrictions en Chine",
    description: "Pékin annonce la fin de la politique zéro-COVID, implications économiques mondiales",
    category: "policy",
    impact: "high",
    icon: AlertCircle
  }
];

const getImpactColor = (impact) => {
  switch (impact) {
    case 'high': return 'text-red-600 bg-red-100';
    case 'medium': return 'text-orange-600 bg-orange-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const getCategoryColor = (category) => {
  const colors = {
    monetary_policy: 'bg-blue-100 text-blue-800',
    employment: 'bg-green-100 text-green-800',
    energy: 'bg-red-100 text-red-800',
    earnings: 'bg-purple-100 text-purple-800',
    policy: 'bg-yellow-100 text-yellow-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getCategoryLabel = (category) => {
  const labels = {
    monetary_policy: 'Politique Monétaire',
    employment: 'Emploi',
    energy: 'Énergie',
    earnings: 'Résultats',
    policy: 'Politique'
  };
  return labels[category] || category;
};

export default function EventsTimeline() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Timeline des Événements Économiques
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Ligne de temps */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Icône et point sur la timeline */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white border-4 border-slate-200 rounded-full shadow-sm">
                    <IconComponent className="w-6 h-6 text-slate-600" />
                  </div>
                  
                  {/* Contenu de l'événement */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {format(event.date, 'EEEE d MMMM', { locale: fr })}
                      </span>
                      <span className="text-sm text-slate-500">{event.time}</span>
                      <Badge variant="outline" className={getImpactColor(event.impact)}>
                        Impact {event.impact === 'high' ? 'Élevé' : event.impact === 'medium' ? 'Moyen' : 'Faible'}
                      </Badge>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">
                      {event.title}
                    </h4>
                    
                    <p className="text-slate-600 mb-3">
                      {event.description}
                    </p>
                    
                    <Badge variant="secondary" className={getCategoryColor(event.category)}>
                      {getCategoryLabel(event.category)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
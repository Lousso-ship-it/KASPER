import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertCircle, Star, TrendingUp } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

const economicEvents = [
  {
    date: new Date(),
    time: '14:30',
    event: 'Publication PIB trimestriel USA',
    country: 'États-Unis',
    importance: 'high',
    previous: '2.1%',
    forecast: '2.3%',
    category: 'croissance'
  },
  {
    date: addDays(new Date(), 1),
    time: '13:45',
    event: 'Décision taux directeur BCE',
    country: 'Zone Euro',
    importance: 'high',
    previous: '4.50%',
    forecast: '4.50%',
    category: 'monétaire'
  },
  {
    date: addDays(new Date(), 2),
    time: '08:30',
    event: 'Inflation IPC France',
    country: 'France',
    importance: 'medium',
    previous: '2.9%',
    forecast: '3.1%',
    category: 'inflation'
  },
];

const importanceColors = {
  high: 'bg-red-600/20 text-red-400 border-red-500/30',
  medium: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
  low: 'bg-gray-600/20 text-gray-400 border-gray-500/30'
};

const categoryColors = {
  croissance: 'bg-green-600/20 text-green-400',
  monétaire: 'bg-blue-600/20 text-blue-400',
  inflation: 'bg-purple-600/20 text-purple-400',
  emploi: 'bg-indigo-600/20 text-indigo-400',
  industrie: 'bg-yellow-600/20 text-yellow-400',
  consommation: 'bg-pink-600/20 text-pink-400'
};

export default function EconomicCalendar() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredEvents = selectedFilter === 'all' 
    ? economicEvents 
    : economicEvents.filter(event => event.importance === selectedFilter);

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'medium': return <Star className="w-4 h-4 text-orange-400" />;
      default: return <Clock className="w-4 h-4 text-[#a3a3a3]" />;
    }
  };

  return (
    <Card className="bg-[#171717] border-[#2a2a2a]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-3 text-[#e5e5e5]">
            <Calendar className="w-6 h-6 text-blue-400" />
            Calendrier Économique
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
              className={`${selectedFilter === 'all' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]'}`}
            >
              Tous
            </Button>
            <Button
              variant={selectedFilter === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('high')}
              className={`${selectedFilter === 'high' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]'}`}
            >
              Important
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 border border-[#2a2a2a] rounded-lg hover:bg-[#222222] transition-colors"
            >
              <div className="flex flex-col items-center text-center min-w-[60px]">
                <span className="text-lg font-semibold text-[#e5e5e5]">
                  {format(event.date, 'dd')}
                </span>
                <span className="text-xs text-[#a3a3a3] uppercase">
                  {format(event.date, 'MMM', { locale: fr })}
                </span>
                <span className="text-xs font-medium text-blue-400 mt-1">
                  {event.time}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getImportanceIcon(event.importance)}
                  <h4 className="font-semibold text-[#e5e5e5]">{event.event}</h4>
                </div>
                <p className="text-sm text-[#a3a3a3] mb-2">{event.country}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className={importanceColors[event.importance]}
                  >
                    {event.importance === 'high' ? 'Impact Élevé' : 
                     event.importance === 'medium' ? 'Impact Modéré' : 'Faible Impact'}
                  </Badge>
                  <Badge 
                    className={`${categoryColors[event.category]} border-none`}
                  >
                    {event.category}
                  </Badge>
                </div>

                <div className="flex gap-4 text-xs">
                  <span className="text-[#a3a3a3]">
                    Précédent: <span className="font-medium text-[#e5e5e5]">{event.previous}</span>
                  </span>
                  <span className="text-[#a3a3a3]">
                    Prévision: <span className="font-medium text-[#e5e5e5]">{event.forecast}</span>
                  </span>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-[#a3a3a3]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
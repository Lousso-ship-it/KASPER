import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hash, TrendingUp, Clock } from 'lucide-react';

const trendingTopics = [
  { name: 'Politique Monétaire', count: 156, trend: 'up', change: '+23%' },
  { name: 'Inflation', count: 142, trend: 'up', change: '+18%' },
  { name: 'Taux d\'intérêt', count: 128, trend: 'stable', change: '+2%' },
  { name: 'Marchés Boursiers', count: 95, trend: 'up', change: '+45%' },
  { name: 'Pétrole', count: 87, trend: 'down', change: '-12%' },
  { name: 'Zone Euro', count: 76, trend: 'up', change: '+8%' },
  { name: 'Fed', count: 65, trend: 'stable', change: '+3%' },
  { name: 'Chômage', count: 54, trend: 'down', change: '-15%' },
  { name: 'PIB', count: 43, trend: 'up', change: '+21%' },
  { name: 'Cryptomonnaies', count: 38, trend: 'up', change: '+67%' },
  { name: 'Chine', count: 35, trend: 'up', change: '+34%' },
  { name: 'Commerce', count: 29, trend: 'stable', change: '+1%' },
];

const emergingTopics = [
  { name: 'IA Générative', count: 12, isNew: true },
  { name: 'Transition Énergétique', count: 18, isNew: false },
  { name: 'Métavers Économique', count: 8, isNew: true },
  { name: 'Blockchain Finance', count: 15, isNew: false },
  { name: 'ESG Investing', count: 22, isNew: false },
];

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
    case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
    default: return <Clock className="w-3 h-3 text-gray-500" />;
  }
};

const getTopicSize = (count) => {
  if (count > 100) return 'text-2xl';
  if (count > 50) return 'text-xl';
  if (count > 25) return 'text-lg';
  return 'text-base';
};

const getTopicColor = (count) => {
  if (count > 100) return 'bg-blue-600 hover:bg-blue-700';
  if (count > 50) return 'bg-blue-500 hover:bg-blue-600';
  if (count > 25) return 'bg-blue-400 hover:bg-blue-500';
  return 'bg-blue-300 hover:bg-blue-400';
};

export default function TopicsCloud() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="space-y-8">
      {/* Nuage de mots-clés */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-6 h-6 text-purple-600" />
            Sujets Tendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 justify-center items-center p-6">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                className={`${getTopicSize(topic.count)} ${getTopicColor(topic.count)} text-white border-none transition-all duration-300 hover:scale-105`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic.name}
                <span className="ml-2 text-xs opacity-80">({topic.count})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste détaillée des sujets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sujets les Plus Mentionnés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingTopics.slice(0, 8).map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700 text-sm w-6">#{index + 1}</span>
                    <span className="font-medium text-slate-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{topic.count} mentions</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(topic.trend)}
                      <span className={`text-xs font-medium ${
                        topic.trend === 'up' ? 'text-green-600' : 
                        topic.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {topic.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sujets Émergents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-800">{topic.name}</span>
                    {topic.isNew && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{topic.count} mentions</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détail du sujet sélectionné */}
      {selectedTopic && (
        <Card className="shadow-lg border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Analyse détaillée : {selectedTopic.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)}>
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{selectedTopic.count}</p>
                <p className="text-sm text-slate-600">Mentions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{selectedTopic.change}</p>
                <p className="text-sm text-slate-600">Évolution</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">4.2</p>
                <p className="text-sm text-slate-600">Score d'influence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
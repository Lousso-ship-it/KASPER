import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MessageSquare, AlertTriangle, Globe } from 'lucide-react';

const dailyActivity = [
  { time: '00h', articles: 45 },
  { time: '04h', articles: 32 },
  { time: '08h', articles: 78 },
  { time: '12h', articles: 95 },
  { time: '16h', articles: 87 },
  { time: '20h', articles: 65 },
];

const sentimentData = [
  { name: 'Positif', value: 45, color: '#10b981' },
  { name: 'Neutre', value: 35, color: '#6b7280' },
  { name: 'Négatif', value: 20, color: '#ef4444' },
];

export default function NewsAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Métriques principales */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Articles Aujourd'hui</p>
              <p className="text-3xl font-bold text-gray-900">247</p>
              <p className="text-sm text-green-600 font-medium">+12% vs hier</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sentiment Moyen</p>
              <p className="text-3xl font-bold text-green-600">+0.23</p>
              <p className="text-sm text-gray-500">Légèrement positif</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Alertes Actives</p>
              <p className="text-3xl font-bold text-orange-600">8</p>
              <p className="text-sm text-gray-500">3 critiques</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sources Actives</p>
              <p className="text-3xl font-bold text-purple-600">42</p>
              <p className="text-sm text-gray-500">18 pays</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique d'activité */}
      <Card className="shadow-lg md:col-span-2">
        <CardHeader>
          <CardTitle>Activité des Publications (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="articles" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Répartition des sentiments */}
      <Card className="shadow-lg md:col-span-2">
        <CardHeader>
          <CardTitle>Analyse des Sentiments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
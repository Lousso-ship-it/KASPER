import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Smile, Frown, Minus } from 'lucide-react';

const sentimentHistory = [
  { date: '01/01', positive: 45, negative: 25, neutral: 30 },
  { date: '02/01', positive: 50, negative: 20, neutral: 30 },
  { date: '03/01', positive: 35, negative: 35, neutral: 30 },
  { date: '04/01', positive: 40, negative: 30, neutral: 30 },
  { date: '05/01', positive: 55, negative: 15, neutral: 30 },
  { date: '06/01', positive: 45, negative: 25, neutral: 30 },
  { date: '07/01', positive: 60, negative: 10, neutral: 30 },
];

const topicSentiments = [
  { topic: 'Politique Monétaire', positive: 35, negative: 45, neutral: 20 },
  { topic: 'Marchés Boursiers', positive: 65, negative: 15, neutral: 20 },
  { topic: 'Énergie', positive: 20, negative: 60, neutral: 20 },
  { topic: 'Emploi', positive: 55, negative: 25, neutral: 20 },
  { topic: 'Commerce International', positive: 40, negative: 40, neutral: 20 },
];

export default function SentimentAnalysis() {
  return (
    <div className="space-y-8">
      {/* Métriques de sentiment globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Sentiment Positif</p>
                <p className="text-3xl font-bold text-green-600">60%</p>
                <p className="text-sm text-green-600 font-medium">+5% cette semaine</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Smile className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Sentiment Négatif</p>
                <p className="text-3xl font-bold text-red-600">10%</p>
                <p className="text-sm text-red-600 font-medium">-3% cette semaine</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <Frown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Sentiment Neutre</p>
                <p className="text-3xl font-bold text-gray-600">30%</p>
                <p className="text-sm text-gray-600 font-medium">-2% cette semaine</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Minus className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Évolution du sentiment dans le temps */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Évolution du Sentiment (7 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} name="Positif" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Négatif" />
                <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} name="Neutre" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment par sujet */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Sentiment par Sujet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicSentiments} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="topic" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positif" />
                <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutre" />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Négatif" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, ExternalLink, Newspaper, TrendingUp, Globe, Filter, Rss } from "lucide-react";
import NewsAnalytics from "../components/news/NewsAnalytics";
import NewsFeed from "../components/news/NewsFeed";
import EventsTimeline from "../components/news/EventsTimeline";
import SentimentAnalysis from "../components/news/SentimentAnalysis";
import TopicsCloud from "../components/news/TopicsCloud";

const categoryInfo = {
  title: "Veille Informationnelle",
  icon: Newspaper,
  description: "Agrégation et analyse de l'actualité mondiale en temps réel."
};

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
    sentiment: "all",
    timeframe: "24h"
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête avec recherche et filtres */}
      <Card className="bg-[#171717] border-[#2a2a2a]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-600/30">
                <categoryInfo.icon className="w-7 h-7 text-blue-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-[#e5e5e5]">{categoryInfo.title}</h1>
                <p className="text-[#a3a3a3]">{categoryInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                </Button>
                 <Button variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]">
                    <Rss className="w-4 h-4 mr-2" />
                    Exporter RSS
                </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] w-5 h-5" />
            <Input
              placeholder="Rechercher dans l'actualité économique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 bg-[#0D0D0D] border-[#2a2a2a] focus:border-blue-500 text-[#e5e5e5]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analytiques et métriques globales */}
      <NewsAnalytics />

      {/* Navigation par onglets */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#171717] border border-[#2a2a2a]">
          <TabsTrigger value="feed" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Newspaper className="w-4 h-4" />
            Fil d'actualité
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Clock className="w-4 h-4" />
            Chronologie
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <TrendingUp className="w-4 h-4" />
            Sentiments
          </TabsTrigger>
          <TabsTrigger value="topics" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Globe className="w-4 h-4" />
            Sujets
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <ExternalLink className="w-4 h-4" />
            Alertes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6 mt-6">
          <NewsFeed searchQuery={searchQuery} filters={selectedFilters} />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6 mt-6">
          <EventsTimeline />
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6 mt-6">
          <SentimentAnalysis />
        </TabsContent>

        <TabsContent value="topics" className="space-y-6 mt-6">
          <TopicsCloud />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-6">
          <Card className="bg-[#171717] border-[#2a2a2a]">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-[#e5e5e5] mb-2">Alertes Personnalisées</h3>
              <p className="text-[#a3a3a3]">Configurez des alertes pour être notifié des événements importants.</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Créer une Alerte</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

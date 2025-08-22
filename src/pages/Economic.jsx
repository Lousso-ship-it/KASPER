
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ExternalLink, TrendingUp, Download, Share2 } from "lucide-react";
import MacroIndicators from "../components/economic/MacroIndicators";
import MonetaryPolicy from "../components/economic/MonetaryPolicy";
import FiscalBudget from "../components/economic/FiscalBudget";
import InternationalTrade from "../components/economic/InternationalTrade";
import EconomicCalendar from "../components/economic/EconomicCalendar";
import { useWorldBankIndicator } from "@/hooks/use-world-bank-indicator";
import { useIMFSeries } from "@/hooks/use-imf-series";

const categoryInfo = {
  title: "Analyse Économique",
  icon: TrendingUp,
  description: "PIB, inflation, emploi et indicateurs macro-économiques."
};

const newsItems = [
  {
    title: "La BCE maintient ses taux directeurs, l'inflation en ligne de mire",
    source: "Les Echos",
    time: "Il y a 2 heures",
    snippet: "La Banque Centrale Européenne a décidé de ne pas modifier ses taux d'intérêt...",
    tags: ["Taux d'intérêt", "Inflation", "BCE"]
  },
  {
    title: "Le PIB de la zone euro en légère hausse au dernier trimestre",
    source: "Reuters",
    time: "Il y a 8 heures",
    snippet: "Eurostat a publié des chiffres de croissance montrant une modeste augmentation de 0,3%...",
    tags: ["PIB", "Croissance", "Eurostat"]
  }
];

const NewsFeedCard = ({ item }) => (
  <Card className="bg-[#171717] border-[#2a2a2a] hover:border-blue-500/50 transition-colors duration-300">
    <CardHeader>
      <CardTitle className="flex justify-between items-start">
        <span className="text-lg text-[#e5e5e5] leading-tight pr-4">{item.title}</span>
        <Button variant="ghost" size="icon" className="shrink-0 text-[#a3a3a3] hover:text-blue-400">
          <ExternalLink className="w-5 h-5" />
        </Button>
      </CardTitle>
      <p className="text-sm text-blue-400 font-medium">{item.source}</p>
    </CardHeader>
    <CardContent>
      <p className="text-[#a3a3a3] leading-relaxed">{item.snippet}</p>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <div className="flex gap-2 flex-wrap">
        {item.tags.map(tag => <Badge key={tag} variant="outline" className="border-[#2a2a2a] bg-[#0D0D0D] text-[#a3a3a3]">{tag}</Badge>)}
      </div>
      <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
        <Clock className="w-4 h-4" />
        <span>{item.time}</span>
      </div>
    </CardFooter>
  </Card>
);

export default function EconomicPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: wbData, loading: wbLoading, error: wbError } = useWorldBankIndicator("FRA", "NY.GDP.MKTP.KD");
  const { data: imfData, loading: imfLoading, error: imfError } = useIMFSeries("IFS/FRA.NGDP_RPCH.A", { startPeriod: "2020", endPeriod: "2024" });

  return (
    <div className="space-y-8 animate-fade-in">
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
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                </Button>
                 <Button variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] w-5 h-5" />
            <Input
              placeholder={`Rechercher dans ${categoryInfo.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 bg-[#0D0D0D] border-[#2a2a2a] focus:border-blue-500 text-[#e5e5e5]"
            />
          </div>
        </CardContent>
      </Card>
      
      <EconomicCalendar />

      <Card className="bg-[#171717] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-lg text-[#e5e5e5]">Exemples d'API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-[#a3a3a3]">
          <div>
            <p className="font-medium mb-2">World Bank GDP (France)</p>
            {wbLoading ? (
              <p>Chargement...</p>
            ) : (
              <pre className="overflow-x-auto">{JSON.stringify(wbData?.[0], null, 2)}</pre>
            )}
            {wbError && <p className="text-red-500">{wbError.message}</p>}
          </div>
          <div>
            <p className="font-medium mb-2">IMF GDP Growth (France)</p>
            {imfLoading ? (
              <p>Chargement...</p>
            ) : (
              <pre className="overflow-x-auto">{JSON.stringify(imfData?.CompactData?.DataSet?.Series?.[0], null, 2)}</pre>
            )}
            {imfError && <p className="text-red-500">{imfError.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#e5e5e5]">Fil d'actualité économique</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((item, index) => <NewsFeedCard key={index} item={item} />)}
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="text-left">
          <h2 className="text-3xl font-semibold text-[#e5e5e5] mb-2">Analyses Détaillées</h2>
          <p className="text-[#a3a3a3]">Explorez les données économiques par catégorie</p>
        </div>
        <MacroIndicators />
        <MonetaryPolicy />
        <FiscalBudget />
        <InternationalTrade />
      </div>
    </div>
  );
}

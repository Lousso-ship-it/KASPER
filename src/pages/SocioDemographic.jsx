
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Users, GraduationCap, Heart, ArrowUpDown, Download, Share2 } from "lucide-react";
import PopulationIndicators from "../components/socio/PopulationIndicators";
import EducationHealth from "../components/socio/EducationHealth";
import MigrationFlows from "../components/socio/MigrationFlows";
import HumanDevelopment from "../components/socio/HumanDevelopment";
import ComparativeAnalysis from "../components/socio/ComparativeAnalysis";

const categoryInfo = {
  title: "Analyse Socio-Démographique",
  icon: Globe,
  description: "Population, migration, éducation, santé et développement humain."
};

export default function SocioDemographicPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState(['France', 'Allemagne']);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête */}
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
              placeholder="Rechercher des indicateurs, pays ou régions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 bg-[#0D0D0D] border-[#2a2a2a] focus:border-blue-500 text-[#e5e5e5]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Onglets pour les différentes analyses */}
      <Tabs defaultValue="population" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#171717] border border-[#2a2a2a]">
          <TabsTrigger value="population" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Users className="w-4 h-4" />
            Population
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <GraduationCap className="w-4 h-4" />
            Éducation
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Heart className="w-4 h-4" />
            Santé
          </TabsTrigger>
          <TabsTrigger value="migration" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <ArrowUpDown className="w-4 h-4" />
            Migration
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Globe className="w-4 h-4" />
            Développement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="population" className="space-y-6 mt-6">
          <PopulationIndicators />
        </TabsContent>

        <TabsContent value="education" className="space-y-6 mt-6">
          <EducationHealth type="education" />
        </TabsContent>

        <TabsContent value="health" className="space-y-6 mt-6">
          <EducationHealth type="health" />
        </TabsContent>

        <TabsContent value="migration" className="space-y-6 mt-6">
          <MigrationFlows />
        </TabsContent>

        <TabsContent value="development" className="space-y-6 mt-6">
          <HumanDevelopment />
        </TabsContent>
      </Tabs>

      {/* Analyse comparative */}
      <ComparativeAnalysis selectedCountries={selectedCountries} />
    </div>
  );
}

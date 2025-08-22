
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Building, Globe, Download, Share2, Filter } from "lucide-react";
import CountryFinance from "../components/financial/CountryFinance";
import CorporateFinance from "../components/financial/CorporateFinance";

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState("countries");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête et Filtres Globaux */}
      <Card className="bg-[#171717] border-[#2a2a2a]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-600/30">
                <DollarSign className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#e5e5e5]">Analyse Financière</h1>
                <p className="text-[#a3a3a3]">Explorez les finances des pays et des entreprises.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]"><Download className="w-4 h-4 mr-2" /> Exporter</Button>
              <Button variant="outline" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]"><Share2 className="w-4 h-4 mr-2" /> Partager</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 p-4 border border-[#2a2a2a] rounded-lg bg-[#0D0D0D]">
            <Filter className="w-5 h-5 text-[#a3a3a3]" />
            <span className="font-semibold text-sm text-[#e5e5e5]">Filtres:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]"><SelectValue placeholder="Pays/Région" /></SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2a2a2a]">
                <SelectItem value="all" className="text-[#e5e5e5] hover:bg-[#222222]">Tous les Pays</SelectItem>
                <SelectItem value="usa" className="text-[#e5e5e5] hover:bg-[#222222]">États-Unis</SelectItem>
                <SelectItem value="eu" className="text-[#e5e5e5] hover:bg-[#222222]">Union Européenne</SelectItem>
                <SelectItem value="asia" className="text-[#e5e5e5] hover:bg-[#222222]">Asie</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]"><SelectValue placeholder="Secteur" /></SelectTrigger>
              <SelectContent className="bg-[#171717] border-[#2a2a2a]">
                <SelectItem value="all" className="text-[#e5e5e5] hover:bg-[#222222]">Tous les Secteurs</SelectItem>
                <SelectItem value="tech" className="text-[#e5e5e5] hover:bg-[#222222]">Technologie</SelectItem>
                <SelectItem value="health" className="text-[#e5e5e5] hover:bg-[#222222]">Santé</SelectItem>
                <SelectItem value="energy" className="text-[#e5e5e5] hover:bg-[#222222]">Énergie</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input type="date" className="w-40 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]" />
              <span className="text-[#a3a3a3]">-</span>
              <Input type="date" className="w-40 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation par Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#171717] border border-[#2a2a2a]">
          <TabsTrigger value="countries" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Globe className="w-4 h-4" /> Finance des Pays
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#a3a3a3]">
            <Building className="w-4 h-4" /> Finance des Entreprises
          </TabsTrigger>
        </TabsList>
        <TabsContent value="countries" className="mt-6">
          <CountryFinance />
        </TabsContent>
        <TabsContent value="companies" className="mt-6">
          <CorporateFinance />
        </TabsContent>
      </Tabs>
    </div>
  );
}

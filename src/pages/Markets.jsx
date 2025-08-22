
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalIndices from '../components/markets/GlobalIndices';
import TradingWorkspace from '../components/markets/TradingWorkspace';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, CheckSquare, Square, Activity } from 'lucide-react';

const TerminalSection = ({ children }) => (
  <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md overflow-hidden h-[calc(100vh-200px)]">
    <div className="overflow-y-auto h-full">
      {children}
    </div>
  </div>
);

const Toolbar = () => (
  <div className="flex items-center gap-4 text-sm font-mono p-3 border-b border-[#3a3a3a]">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 h-auto text-[#ff6b35] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a]">
          Standard <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
        <DropdownMenuItem>Standard</DropdownMenuItem>
        <DropdownMenuItem>Extended</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <div className="flex items-center gap-2 text-white">
      <CheckSquare className="w-4 h-4 text-[#ff6b35]" />
      <span>Movers</span>
    </div>
    <div className="flex items-center gap-2 text-[#a0a0a0]">
      <Square className="w-4 h-4" />
      <span>Volatility</span>
    </div>
    <div className="flex items-center gap-2 text-[#a0a0a0]">
      <Square className="w-4 h-4" />
      <span>Ratios</span>
    </div>
  </div>
);

export default function MarketsPage() {
  return (
    <div className="font-mono text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-wider text-[#ff6b35]">SURVEILLANCE MARCHÉS</h1>
        <p className="text-[#a0a0a0] mt-1">Flux de données de marché mondial en temps réel avec des capacités de trading avancées.</p>
      </div>

      <div className="tactical-card p-2">
        <Tabs defaultValue="indices" className="w-full">
          <TabsList className="bg-[#2a2a2a] p-1 rounded-md mb-2">
            <TabsTrigger value="indices" className="data-[state=active]:bg-[#3a3a3a] px-4 py-1.5 rounded-sm">Global Indices</TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-[#3a3a3a] px-4 py-1.5 rounded-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Trading Terminal
            </TabsTrigger>
            <TabsTrigger value="currencies" className="data-[state=active]:bg-[#3a3a3a] px-4 py-1.5 rounded-sm">Currencies</TabsTrigger>
            <TabsTrigger value="commodities" className="data-[state=active]:bg-[#3a3a3a] px-4 py-1.5 rounded-sm">Commodities</TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-[#3a3a3a] px-4 py-1.5 rounded-sm">Crypto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="indices">
            <Toolbar />
            <TerminalSection>
              <GlobalIndices />
            </TerminalSection>
          </TabsContent>

          <TabsContent value="trading">
            <TradingWorkspace />
          </TabsContent>

          <TabsContent value="currencies">
             <TerminalSection>
                <div className="p-8 text-center text-[#a0a0a0]">Currency data feed coming soon.</div>
            </TerminalSection>
          </TabsContent>
          <TabsContent value="commodities">
             <TerminalSection>
                <div className="p-8 text-center text-[#a0a0a0]">Commodities data feed coming soon.</div>
            </TerminalSection>
          </TabsContent>
          <TabsContent value="crypto">
             <TerminalSection>
                <div className="p-8 text-center text-[#a0a0a0]">Crypto data feed coming soon.</div>
            </TerminalSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

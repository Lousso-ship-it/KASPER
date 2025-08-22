import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Settings,
  Maximize2,
  BarChart3,
  TrendingUp,
  Globe,
  Calendar,
  Newspaper,
  Search,
  Eye,
  Target
} from "lucide-react";

// Import des widgets TradingView
import TradingViewChart from './TradingViewChart';
import TradingViewTicker from './TradingViewTicker';
import TradingViewWatchlist from './TradingViewWatchlist';
import TradingViewSymbolOverview from './TradingViewSymbolOverview';
import TradingViewMiniChart from './TradingViewMiniChart';
import TradingViewMarketOverview from './TradingViewMarketOverview';
import TradingViewStockHeatmap from './TradingViewStockHeatmap';
import TradingViewForexHeatmap from './TradingViewForexHeatmap';
import TradingViewCryptoHeatmap from './TradingViewCryptoHeatmap';
import TradingViewScreener from './TradingViewScreener';
import TradingViewTechnicalAnalysis from './TradingViewTechnicalAnalysis';
import TradingViewEconomicCalendar from './TradingViewEconomicCalendar';
import TradingViewTopStories from './TradingViewTopStories';
import TradingViewSymbolInfo from './TradingViewSymbolInfo';

export default function TradingWorkspace() {
  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL");
  const [selectedInterval, setSelectedInterval] = useState("1D");

  return (
    <div className="h-full bg-[#1a1a1a] space-y-4">
      {/* Ticker at the top */}
      <TradingViewTicker />
      
      {/* Header with controls */}
      <div className="flex items-center justify-between bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-4 mx-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff6b35]" />
            <h3 className="text-white font-mono font-bold tracking-wider">TRADING TERMINAL</h3>
          </div>
          <Badge className="bg-[#ff6b35]/20 text-[#ff6b35] border-[#ff6b35]/30">LIVE ANALYSIS</Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
            <SelectTrigger className="w-40 bg-[#1a1a1a] border-[#3a3a3a] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
              <SelectItem value="NASDAQ:AAPL">AAPL</SelectItem>
              <SelectItem value="NASDAQ:GOOGL">GOOGL</SelectItem>
              <SelectItem value="NASDAQ:MSFT">MSFT</SelectItem>
              <SelectItem value="NASDAQ:TSLA">TSLA</SelectItem>
              <SelectItem value="NASDAQ:NVDA">NVDA</SelectItem>
              <SelectItem value="NASDAQ:AMZN">AMZN</SelectItem>
              <SelectItem value="NASDAQ:META">META</SelectItem>
              <SelectItem value="NYSE:JPM">JPM</SelectItem>
              <SelectItem value="NYSE:V">V</SelectItem>
              <SelectItem value="BINANCE:BTCUSDT">BTCUSDT</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedInterval} onValueChange={setSelectedInterval}>
            <SelectTrigger className="w-24 bg-[#1a1a1a] border-[#3a3a3a] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1H">1H</SelectItem>
              <SelectItem value="1D">1D</SelectItem>
              <SelectItem value="1W">1W</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-[#ff6b35]">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main workspace with tabs */}
      <div className="px-4">
        <Tabs defaultValue="charts" className="w-full">
          <TabsList className="bg-[#2a2a2a] p-1 rounded-md mb-4">
            <TabsTrigger value="charts" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="watchlists" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Watchlists
            </TabsTrigger>
            <TabsTrigger value="heatmaps" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Heatmaps
            </TabsTrigger>
            <TabsTrigger value="screeners" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <Search className="w-4 h-4" />
              Screeners
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2 rounded-sm flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              News
            </TabsTrigger>
          </TabsList>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-12 gap-4 h-[calc(100vh-350px)]">
              {/* Main Chart */}
              <div className="col-span-8">
                <Card className="tactical-card h-full">
                  <CardContent className="p-0 h-full">
                    <TradingViewChart symbol={selectedSymbol} interval={selectedInterval} />
                  </CardContent>
                </Card>
              </div>
              
              {/* Side Panel */}
              <div className="col-span-4 space-y-4">
                {/* Symbol Overview */}
                <Card className="tactical-card h-1/3">
                  <CardHeader className="p-3 border-b border-[#3a3a3a]">
                    <CardTitle className="text-[#a0a0a0] font-mono text-sm">SYMBOL OVERVIEW</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-50px)]">
                    <TradingViewSymbolOverview symbol={selectedSymbol} />
                  </CardContent>
                </Card>
                
                {/* Mini Charts */}
                <Card className="tactical-card h-1/3">
                  <CardHeader className="p-3 border-b border-[#3a3a3a]">
                    <CardTitle className="text-[#a0a0a0] font-mono text-sm">MINI CHARTS</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 h-[calc(100%-50px)] space-y-2">
                    <TradingViewMiniChart symbol="NASDAQ:AAPL" />
                    <TradingViewMiniChart symbol="NASDAQ:GOOGL" />
                  </CardContent>
                </Card>
                
                {/* Technical Analysis */}
                <Card className="tactical-card h-1/3">
                  <CardHeader className="p-3 border-b border-[#3a3a3a]">
                    <CardTitle className="text-[#a0a0a0] font-mono text-sm">TECHNICAL ANALYSIS</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-50px)]">
                    <TradingViewTechnicalAnalysis symbol={selectedSymbol} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Watchlists Tab */}
          <TabsContent value="watchlists" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-350px)]">
              <Card className="tactical-card">
                <CardHeader className="p-3 border-b border-[#3a3a3a]">
                  <CardTitle className="text-[#a0a0a0] font-mono text-sm">MARKET OVERVIEW</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-50px)]">
                  <TradingViewMarketOverview />
                </CardContent>
              </Card>
              
              <Card className="tactical-card">
                <CardHeader className="p-3 border-b border-[#3a3a3a]">
                  <CardTitle className="text-[#a0a0a0] font-mono text-sm">WATCHLIST</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-50px)]">
                  <TradingViewWatchlist />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Heatmaps Tab */}
          <TabsContent value="heatmaps" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Tabs defaultValue="stocks" className="w-full">
                <TabsList className="bg-[#2a2a2a] p-1 rounded-md mb-4">
                  <TabsTrigger value="stocks" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2">Stocks</TabsTrigger>
                  <TabsTrigger value="forex" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2">Forex</TabsTrigger>
                  <TabsTrigger value="crypto" className="data-[state=active]:bg-[#3a3a3a] px-4 py-2">Crypto</TabsTrigger>
                </TabsList>
                
                <TabsContent value="stocks">
                  <Card className="tactical-card h-[calc(100vh-420px)]">
                    <CardContent className="p-0 h-full">
                      <TradingViewStockHeatmap />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="forex">
                  <Card className="tactical-card h-[calc(100vh-420px)]">
                    <CardContent className="p-0 h-full">
                      <TradingViewForexHeatmap />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="crypto">
                  <Card className="tactical-card h-[calc(100vh-420px)]">
                    <CardContent className="p-0 h-full">
                      <TradingViewCryptoHeatmap />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Screeners Tab */}
          <TabsContent value="screeners" className="space-y-4">
            <Card className="tactical-card h-[calc(100vh-350px)]">
              <CardHeader className="p-3 border-b border-[#3a3a3a]">
                <CardTitle className="text-[#a0a0a0] font-mono text-sm">MARKET SCREENER</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-50px)]">
                <TradingViewScreener />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-350px)]">
              <Card className="tactical-card">
                <CardHeader className="p-3 border-b border-[#3a3a3a]">
                  <CardTitle className="text-[#a0a0a0] font-mono text-sm">SYMBOL INFO</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-50px)]">
                  <TradingViewSymbolInfo symbol={selectedSymbol} />
                </CardContent>
              </Card>
              
              <Card className="tactical-card">
                <CardHeader className="p-3 border-b border-[#3a3a3a]">
                  <CardTitle className="text-[#a0a0a0] font-mono text-sm">ECONOMIC CALENDAR</CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-50px)]">
                  <TradingViewEconomicCalendar />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-4">
            <Card className="tactical-card h-[calc(100vh-350px)]">
              <CardHeader className="p-3 border-b border-[#3a3a3a]">
                <CardTitle className="text-[#a0a0a0] font-mono text-sm">TOP STORIES</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-50px)]">
                <TradingViewTopStories />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
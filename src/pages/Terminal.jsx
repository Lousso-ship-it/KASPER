
import React, { useState, useEffect } from "react";
import { BrokerConnection } from "@/api/entities";
import { TradingBot } from "@/api/entities";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link,
  Bot,
  DollarSign,
  CheckCircle,
  Monitor,
  BarChart3,
  Activity,
  LogIn,
  Plus,
  TrendingUp
} from "lucide-react";
import BrokerConnections from "../components/exchange/BrokerConnections";
import TradingDashboard from "../components/exchange/TradingDashboard";
import BotManager from "../components/exchange/BotManager";
import Portfolio from "../components/exchange/Portfolio";
import OrderBook from "../components/exchange/OrderBook";
import TradingWorkspace from "../components/markets/TradingWorkspace";
import GlobalIndices from "../components/markets/GlobalIndices";

export default function TerminalPage() {
  const [connections, setConnections] = useState([]);
  const [tradingBots, setTradingBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      await User.me();
      setIsAuthenticated(true);
      await loadTerminalData();
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
      setLoading(false);
    }
  };

  const loadTerminalData = async () => {
    try {
      const [connectionsData, botsData] = await Promise.all([
        BrokerConnection.list(),
        TradingBot.list()
      ]);
      setConnections(connectionsData);
      setTradingBots(botsData);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Erreur connexion:", error);
    }
  };

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white font-mono tracking-wider">
            TERMINAL FINANCIER
          </h1>
          <p className="text-[#a0a0a0] text-lg font-mono max-w-2xl">
            Connectez vos brokers, gérez votre portfolio et déployez des bots de trading automatisés.
          </p>
        </div>
        
        <div className="p-16 text-center bg-[#2a2a2a] border border-[#3a3a3a]">
          <LogIn className="w-16 h-16 mx-auto mb-6 text-[#ff6b35]" />
          <h3 className="text-2xl font-bold text-white mb-4 font-mono">CONNEXION REQUISE</h3>
          <Button onClick={handleLogin} className="tactical-button h-14 px-8">
            <LogIn className="w-6 h-6 mr-3" />
            SE CONNECTER
          </Button>
        </div>
      </div>
    );
  }

  const connectedBrokers = connections.filter(c => c.connection_status === 'connected').length;
  const activeBots = tradingBots.filter(bot => bot.status === 'running').length;
  const totalPnL = tradingBots.reduce((sum, bot) => sum + (bot.performance?.total_pnl || 0), 0);

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* En-tête simplifié */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-wider">TERMINAL</h1>
          <p className="text-[#a0a0a0] font-mono">Trading automatisé et surveillance des marchés</p>
        </div>
        
        {/* Métriques compactes */}
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white font-mono">{connectedBrokers}</div>
            <div className="text-xs text-[#a0a0a0] font-mono uppercase">Brokers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white font-mono">{activeBots}</div>
            <div className="text-xs text-[#a0a0a0] font-mono uppercase">Bots</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold font-mono ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}$
            </div>
            <div className="text-xs text-[#a0a0a0] font-mono uppercase">P&L</div>
          </div>
        </div>
      </div>

      {/* Interface principale */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="markets" className="h-full flex flex-col">
          <TabsList className="bg-[#2a2a2a] p-1 w-fit">
            <TabsTrigger value="markets" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <TrendingUp className="w-4 h-4 mr-2" />
              MARCHÉS
            </TabsTrigger>
            <TabsTrigger value="trading" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <Activity className="w-4 h-4 mr-2" />
              TRADING
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <Monitor className="w-4 h-4 mr-2" />
              DASHBOARD
            </TabsTrigger>
            <TabsTrigger value="connections" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <Link className="w-4 h-4 mr-2" />
              CONNEXIONS
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <BarChart3 className="w-4 h-4 mr-2" />
              PORTFOLIO
            </TabsTrigger>
            <TabsTrigger value="bots" className="font-mono data-[state=active]:bg-[#ff6b35]">
              <Bot className="w-4 h-4 mr-2" />
              BOTS
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4">
            <TabsContent value="markets" className="h-full m-0">
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md overflow-hidden h-[calc(100vh-200px)]">
                  <div className="flex items-center gap-4 text-sm font-mono p-3 border-b border-[#3a3a3a]">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-4 h-4 text-[#ff6b35]" />
                      <span>Indices Globaux</span>
                    </div>
                  </div>
                  <div className="overflow-y-auto h-full">
                    <GlobalIndices />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="trading" className="h-full m-0">
              <TradingWorkspace />
            </TabsContent>
            <TabsContent value="dashboard" className="h-full m-0">
              <TradingDashboard connections={connections} bots={tradingBots} />
            </TabsContent>
            <TabsContent value="connections" className="h-full m-0">
              <BrokerConnections connections={connections} onUpdate={loadTerminalData} />
            </TabsContent>
            <TabsContent value="portfolio" className="h-full m-0">
              <Portfolio connections={connections} />
            </TabsContent>
            <TabsContent value="bots" className="h-full m-0">
              <BotManager bots={tradingBots} connections={connections} onUpdate={loadTerminalData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

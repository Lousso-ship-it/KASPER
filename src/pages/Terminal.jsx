
import { useState, useEffect } from "react";
import { BrokerConnection } from "@/api/entities";
import { TradingBot } from "@/api/entities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Link,
  Bot,
  CheckCircle,
  Monitor,
  BarChart3,
  Activity,
  TrendingUp
} from "lucide-react";
import BrokerConnections from "../components/exchange/BrokerConnections";
import TradingDashboard from "../components/exchange/TradingDashboard";
import BotManager from "../components/exchange/BotManager";
import Portfolio from "../components/exchange/Portfolio";
import TradingWorkspace from "../components/markets/TradingWorkspace";
import GlobalIndices from "../components/markets/GlobalIndices";

export default function TerminalPage() {
  const [connections, setConnections] = useState([]);
  const [tradingBots, setTradingBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTerminalData();
  }, []);

  const loadTerminalData = async () => {
    try {
      setLoading(true);
      const [connectionsData, botsData] = await Promise.all([
        BrokerConnection.list(),
        TradingBot.list()
      ]);
      setConnections(connectionsData);
      setTradingBots(botsData);
    } catch (error) {
      console.error("Erreur chargement données:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const connectedBrokers = connections.filter(c => c.connection_status === 'connected').length;
  const activeBots = tradingBots.filter(bot => bot.status === 'running').length;
  const totalPnL = tradingBots.reduce((sum, bot) => sum + (bot.performance?.total_pnl || 0), 0);

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* En-tête simplifié */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-wider">TERMINAL</h1>
          <p className="text-[#a0a0a0] font-mono">Trading automatisé et surveillance des marchés</p>
        </div>

        {/* Métriques compactes */}
        <div className="flex gap-6 mt-4 md:mt-0">
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
          <TabsList className="bg-[#2a2a2a] p-1 w-full overflow-x-auto md:w-fit">
            <TabsTrigger value="markets" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Marchés">
              <TrendingUp className="w-4 h-4 mr-2" />
              MARCHÉS
            </TabsTrigger>
            <TabsTrigger value="trading" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Trading">
              <Activity className="w-4 h-4 mr-2" />
              TRADING
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Dashboard">
              <Monitor className="w-4 h-4 mr-2" />
              DASHBOARD
            </TabsTrigger>
            <TabsTrigger value="connections" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Connexions">
              <Link className="w-4 h-4 mr-2" />
              CONNEXIONS
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Portfolio">
              <BarChart3 className="w-4 h-4 mr-2" />
              PORTFOLIO
            </TabsTrigger>
            <TabsTrigger value="bots" className="font-mono data-[state=active]:bg-[#ff6b35]" aria-label="Bots">
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

import React, { useState, useEffect } from "react";
import TradingDashboard from "../components/exchange/TradingDashboard";
import BrokerConnections from "../components/exchange/BrokerConnections";
import BotManager from "../components/exchange/BotManager";
import Portfolio from "../components/exchange/Portfolio";
import OrderBook from "../components/exchange/OrderBook";
import { BrokerConnection, TradingBot } from "@/api/entities";

export default function ExchangePage() {
  const [connections, setConnections] = useState([]);
  const [bots, setBots] = useState([]);

  useEffect(() => {
    loadConnections();
    loadBots();
  }, []);

  const loadConnections = async () => {
    try {
      const data = await BrokerConnection.list();
      setConnections(data);
    } catch (error) {
      console.error("Error loading connections:", error);
    }
  };

  const loadBots = async () => {
    try {
      const data = await TradingBot.list();
      setBots(data);
    } catch (error) {
      console.error("Error loading bots:", error);
    }
  };

  return (
    <div className="space-y-8">
      <TradingDashboard connections={connections} bots={bots} />
      <BrokerConnections connections={connections} onUpdate={loadConnections} />
      <BotManager bots={bots} connections={connections} onUpdate={loadBots} />
      <Portfolio connections={connections} />
      <OrderBook connections={connections} />
    </div>
  );
}


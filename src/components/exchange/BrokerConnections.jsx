
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Settings, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Wifi,
  WifiOff,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";
import { base44 } from "@/api/base44Client";

// Destructure BrokerConnection from base44.entities to allow direct usage as per the outline
const { BrokerConnection } = base44.entities;

const brokersList = [
  // Crypto Exchanges
  { id: "binance", name: "Binance", type: "crypto", logo: "🟡" },
  { id: "bitget", name: "Bitget", type: "crypto", logo: "🔵" },
  { id: "kraken", name: "Kraken", type: "crypto", logo: "🔮" },
  { id: "coinbase_pro", name: "Coinbase Pro", type: "crypto", logo: "🔷" },
  { id: "kucoin", name: "KuCoin", type: "crypto", logo: "🟢" },
  { id: "bybit", name: "Bybit", type: "crypto", logo: "🟠" },
  { id: "okx", name: "OKX", type: "crypto", logo: "⚫" },
  { id: "huobi", name: "Huobi", type: "crypto", logo: "🔴" },
  { id: "gate_io", name: "Gate.io", type: "crypto", logo: "🟣" },
  { id: "mexc", name: "MEXC", type: "crypto", logo: "🟤" },
  { id: "bitbuy", name: "Bitbuy", type: "crypto", logo: "🟨" },
  { id: "phemex", name: "Phemex", type: "crypto", logo: "⚪" },
  
  // Stock Brokers
  { id: "interactive_brokers", name: "Interactive Brokers", type: "stocks", logo: "📈" },
  { id: "robinhood", name: "Robinhood", type: "stocks", logo: "🏹" },
  { id: "td_ameritrade", name: "TD Ameritrade", type: "stocks", logo: "🏛️" },
  { id: "e_trade", name: "E*TRADE", type: "stocks", logo: "💼" },
  { id: "charles_schwab", name: "Charles Schwab", type: "stocks", logo: "🏦" },
  { id: "fidelity", name: "Fidelity", type: "stocks", logo: "🏢" },
  { id: "xtb", name: "XTB", type: "stocks", logo: "📊" },
  { id: "degiro", name: "DEGIRO", type: "stocks", logo: "🇪🇺" },
  { id: "ig_markets", name: "IG Markets", type: "stocks", logo: "🎯" }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'connected': return 'bg-green-600/20 text-green-400 border-green-500/30';
    case 'disconnected': return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    case 'error': return 'bg-red-600/20 text-red-400 border-red-500/30';
    case 'testing': return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'connected': return <CheckCircle className="w-4 h-4" />;
    case 'disconnected': return <WifiOff className="w-4 h-4" />;
    case 'error': return <XCircle className="w-4 h-4" />;
    case 'testing': return <AlertCircle className="w-4 h-4" />;
    default: return <WifiOff className="w-4 h-4" />;
  }
};

export default function BrokerConnections({ connections, onUpdate }) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    display_name: "",
    api_key: "",
    api_secret: "",
    passphrase: "",
    sandbox_mode: true
  });

  const handleAddConnection = async () => {
    if (!selectedBroker) return;
    
    try {
      const brokerInfo = brokersList.find(b => b.id === selectedBroker);
      await BrokerConnection.create({
        broker_name: selectedBroker,
        display_name: formData.display_name || brokerInfo.name,
        api_key: formData.api_key,
        api_secret: formData.api_secret,
        passphrase: formData.passphrase,
        sandbox_mode: formData.sandbox_mode,
        connection_status: 'testing'
      });
      
      setShowAddDialog(false);
      setFormData({
        display_name: "",
        api_key: "",
        api_secret: "",
        passphrase: "",
        sandbox_mode: true
      });
      setSelectedBroker("");
      onUpdate();
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  const toggleConnection = async (connection) => {
    try {
      const newStatus = connection.connection_status === 'connected' ? 'disconnected' : 'testing';
      await BrokerConnection.update(connection.id, {
        connection_status: newStatus,
        last_sync: new Date().toISOString()
      });
      onUpdate();
    } catch (error) {
      console.error("Error toggling connection:", error);
    }
  };

  const deleteConnection = async (connectionId) => {
    try {
      await BrokerConnection.delete(connectionId);
      onUpdate();
    } catch (error) {
      console.error("Error deleting connection:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white font-mono tracking-wider mb-2">
            CONNEXIONS BROKERS
          </h2>
          <p className="text-[#a0a0a0] font-mono">
            Gérez vos connexions aux exchanges et brokers
          </p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="tactical-button">
              <Plus className="w-5 h-5 mr-2" />
              AJOUTER BROKER
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono text-xl tracking-wider">
                NOUVELLE CONNEXION BROKER
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-2">
              <div>
                <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase">
                  Sélectionner un Broker
                </label>
                <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono">
                    <SelectValue placeholder="Choisir un broker..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a] max-h-[300px]">
                    {brokersList.map(broker => (
                      <SelectItem key={broker.id} value={broker.id} className="text-white font-mono">
                        <div className="flex items-center gap-2">
                          <span>{broker.logo}</span>
                          <span>{broker.name}</span>
                          <Badge variant="outline" className="ml-auto">
                            {broker.type}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedBroker && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase">
                      Nom d'affichage (optionnel)
                    </label>
                    <Input
                      value={formData.display_name}
                      onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                      placeholder="Ex: Mon compte Binance principal"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase">
                      Clé API
                    </label>
                    <div className="relative">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={formData.api_key}
                        onChange={(e) => setFormData({...formData, api_key: e.target.value})}
                        placeholder="Votre clé API"
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a0a0a0]"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase">
                      Secret API
                    </label>
                    <Input
                      type="password"
                      value={formData.api_secret}
                      onChange={(e) => setFormData({...formData, api_secret: e.target.value})}
                      placeholder="Votre secret API"
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
                    />
                  </div>

                  {['okx', 'kucoin'].includes(selectedBroker) && (
                    <div>
                      <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase">
                        Passphrase
                      </label>
                      <Input
                        type="password"
                        value={formData.passphrase}
                        onChange={(e) => setFormData({...formData, passphrase: e.target.value})}
                        placeholder="Passphrase (si requis)"
                        className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#ff6b35]" />
                      <div>
                        <p className="font-mono text-white font-bold">Mode Sandbox</p>
                        <p className="text-sm text-[#a0a0a0] font-mono">Recommandé pour les tests</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setFormData({...formData, sandbox_mode: !formData.sandbox_mode})}
                      className={`border-[#3a3a3a] font-mono ${
                        formData.sandbox_mode 
                          ? 'bg-[#ff6b35] text-white' 
                          : 'text-[#a0a0a0] hover:text-white'
                      }`}
                    >
                      {formData.sandbox_mode ? 'ACTIVÉ' : 'DÉSACTIVÉ'}
                    </Button>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddDialog(false)}
                      className="flex-1 border-[#3a3a3a] text-[#a0a0a0] hover:text-white font-mono"
                    >
                      ANNULER
                    </Button>
                    <Button 
                      onClick={handleAddConnection}
                      disabled={!formData.api_key || !formData.api_secret}
                      className="flex-1 tactical-button"
                    >
                      AJOUTER CONNEXION
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des connexions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const brokerInfo = brokersList.find(b => b.id === connection.broker_name);
          return (
            <Card key={connection.id} className="tactical-card">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{brokerInfo?.logo || '🔗'}</span>
                    <div>
                      <CardTitle className="text-white font-mono text-lg">
                        {connection.display_name}
                      </CardTitle>
                      <p className="text-[#a0a0a0] font-mono text-sm">
                        {brokerInfo?.name || connection.broker_name}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(connection.connection_status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(connection.connection_status)}
                      <span className="uppercase">
                        {connection.connection_status === 'connected' ? 'CONNECTÉ' : 
                         connection.connection_status === 'disconnected' ? 'DÉCONNECTÉ' :
                         connection.connection_status === 'testing' ? 'TEST' : 'ERREUR'}
                      </span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {connection.account_balance && (
                    <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
                      <p className="text-xs font-bold text-[#a0a0a0] font-mono uppercase mb-1">
                        Solde Total
                      </p>
                      <p className="text-xl font-bold text-white font-mono">
                        ${connection.account_balance.total_usd?.toLocaleString() || '0.00'}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-[#a0a0a0] font-mono">
                    <Shield className="w-4 h-4" />
                    <span>{connection.sandbox_mode ? 'Mode Sandbox' : 'Mode Live'}</span>
                  </div>
                  
                  {connection.last_sync && (
                    <div className="flex items-center gap-2 text-sm text-[#a0a0a0] font-mono">
                      <Wifi className="w-4 h-4" />
                      <span>Dernière sync: {new Date(connection.last_sync).toLocaleTimeString()}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleConnection(connection)}
                      className="flex-1 border-[#3a3a3a] text-[#a0a0a0] hover:text-white font-mono"
                    >
                      {connection.connection_status === 'connected' ? (
                        <>
                          <WifiOff className="w-4 h-4 mr-1" />
                          DÉCONNECTER
                        </>
                      ) : (
                        <>
                          <Wifi className="w-4 h-4 mr-1" />
                          CONNECTER
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteConnection(connection.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {connections.length === 0 && (
        <Card className="tactical-card">
          <CardContent className="p-12 text-center">
            <Wifi className="w-16 h-16 mx-auto mb-4 text-[#a0a0a0]" />
            <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wider">
              AUCUNE CONNEXION CONFIGURÉE
            </h3>
            <p className="text-[#a0a0a0] font-mono mb-6">
              Ajoutez votre premier broker pour commencer le trading automatisé.
            </p>
            <Button onClick={() => setShowAddDialog(true)} className="tactical-button">
              <Plus className="w-5 h-5 mr-2" />
              AJOUTER UN BROKER
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

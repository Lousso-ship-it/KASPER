import { CheckCircle, LineChart } from "lucide-react";
import GlobalIndices from "../components/markets/GlobalIndices";
import AdvancedAnalytics from "../components/terminal/AdvancedAnalytics";

/**
 * TerminalPage affiche les principaux indices boursiers mondiaux sans exiger
 * d'authentification. Les données sont récupérées en temps réel depuis l'API
 * publique de Yahoo Finance utilisée par le composant GlobalIndices.
 */
export default function TerminalPage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-wider">TERMINAL</h1>
          <p className="text-[#a0a0a0] font-mono">
            Surveillance des marchés en temps réel
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Tableau des indices */}
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md overflow-hidden">
          <div className="flex items-center gap-4 text-sm font-mono p-3 border-b border-[#3a3a3a]">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-4 h-4 text-[#ff6b35]" />
              <span>Indices Globaux</span>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            <GlobalIndices />
          </div>
        </div>

        {/* Analytics avancés */}
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md overflow-hidden">
          <div className="flex items-center gap-4 text-sm font-mono p-3 border-b border-[#3a3a3a]">
            <div className="flex items-center gap-2 text-white">
              <LineChart className="w-4 h-4 text-[#ff6b35]" />
              <span>Analytics Avancés</span>
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            <AdvancedAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

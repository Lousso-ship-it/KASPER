import { useState } from 'react';
import PythTickerTable from '../components/markets/PythTickerTable';
import IndicatorCatalog from '../components/explorer/IndicatorCatalog';
import WorldBankIndicatorChart from '../components/explorer/WorldBankIndicatorChart';

/**
 * ExplorationPage fusionne les fonctionnalités de l'ancien Explorer et Terminal.
 * Elle affiche les prix en temps réel via Pyth Network et permet de rechercher
 * des indicateurs World Bank avec visualisation en courbes.
 */
export default function ExplorationPage() {
  const [indicator, setIndicator] = useState(null);

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-wider">
            EXPLORATION DE DONNÉES ET MARCHÉS
          </h1>
          <p className="text-[#a0a0a0] font-mono">
            Données Pyth Network et indicateurs World Bank
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Pyth prices */}
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-md p-4 overflow-auto">
          <PythTickerTable />
        </div>

        {/* World Bank indicators */}
        <div className="lg:col-span-2 flex flex-col gap-4 overflow-hidden">
          <IndicatorCatalog onSelectIndicator={setIndicator} />
          <div className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md p-4 overflow-auto">
            {indicator ? (
              <WorldBankIndicatorChart
                countryCode="WLD"
                indicator={indicator.id}
                indicatorName={indicator.name}
              />
            ) : (
              <p className="text-[#a0a0a0] font-mono text-sm">
                Sélectionnez un indicateur pour afficher son historique mondial.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

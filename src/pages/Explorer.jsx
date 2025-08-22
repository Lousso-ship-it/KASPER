
import React, { useState } from 'react';
import InteractiveWorldMap from '../components/explorer/InteractiveWorldMap';
import CountryDataPanel from '../components/explorer/CountryDataPanel';
import ToolGDP from '../components/explorer/tools/ToolGDP';
import ToolInflation from '../components/explorer/tools/ToolInflation';
import ToolNews from '../components/explorer/tools/ToolNews';
import { AnimatePresence } from 'framer-motion';

// Convertit le code ISO2 en emoji drapeau
const getFlagEmoji = (countryCode) =>
    countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));

export default function ExplorerPage() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = async (countryName) => {
        try {
            const res = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=400');
            const data = await res.json();
            const countries = data[1] || [];
            const match = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
            if (match) {
                setSelectedCountry({
                    name: match.name,
                    code: match.id,
                    flag: getFlagEmoji(match.id)
                });
            } else {
                setSelectedCountry(null);
            }
        } catch (error) {
            console.error('Failed to fetch country data', error);
            setSelectedCountry(null);
        }
    };

    const handleClosePanel = () => {
        setSelectedCountry(null);
    };

    return (
        <div className="h-full w-full flex animate-fade-in">
            {/* Zone principale avec carte et outils */}
            <div className="flex-1 flex flex-col space-y-6 p-4">
                {/* Conteneur de la carte - taille réduite selon le périmètre défini */}
                <div className="h-[60vh] w-full bg-[#101010] rounded-lg overflow-hidden border border-[#3a3a3a] relative">
                    <InteractiveWorldMap onCountryClick={handleCountryClick} />
                </div>
                
                {/* Outils opérationnels */}
                <div className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6">
                    {selectedCountry ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                            <ToolGDP country={selectedCountry.name} />
                            <ToolInflation country={selectedCountry.name} />
                            <ToolNews country={selectedCountry.name} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-[#a0a0a0] font-mono">Sélectionnez un pays pour afficher les outils.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Panneau de données latéral */}
            <AnimatePresence>
                {selectedCountry && (
                    <CountryDataPanel
                        country={selectedCountry}
                        onClose={handleClosePanel}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

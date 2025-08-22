
import React, { useState } from 'react';
import InteractiveWorldMap from '../components/explorer/InteractiveWorldMap';
import CountryDataPanel from '../components/explorer/CountryDataPanel';
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
                
                {/* Zone étendue pour les outils futurs */}
                <div className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-6">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold text-white font-mono tracking-wider">ZONE D'OUTILS OPÉRATIONNELS</h3>
                            <p className="text-[#a0a0a0] font-mono">Espace réservé pour les outils d'analyse et contrôles tactiques.</p>
                            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
                                <div className="h-16 bg-[#3a3a3a] rounded border border-[#4a4a4a] flex items-center justify-center">
                                    <span className="text-xs text-[#a0a0a0] font-mono">OUTIL 1</span>
                                </div>
                                <div className="h-16 bg-[#3a3a3a] rounded border border-[#4a4a4a] flex items-center justify-center">
                                    <span className="text-xs text-[#a0a0a0] font-mono">OUTIL 2</span>
                                </div>
                                <div className="h-16 bg-[#3a3a3a] rounded border border-[#4a4a4a] flex items-center justify-center">
                                    <span className="text-xs text-[#a0a0a0] font-mono">OUTIL 3</span>
                                </div>
                            </div>
                        </div>
                    </div>
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

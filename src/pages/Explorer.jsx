
import React, { useState } from 'react';
import InteractiveWorldMap from '../components/explorer/InteractiveWorldMap';
import CountryDataPanel from '../components/explorer/CountryDataPanel';
import { AnimatePresence } from 'framer-motion';

// Données mock pour les détails des pays (inchangées)
const countryDetails = {
    'France': {
        name: 'France',
        flag: '🇫🇷',
        continent: 'Europe',
        socio: {
            population: '67.4M',
            life_expectancy: '82.5 ans',
            hdi: '0.903 (Très élevé)',
        },
        eco: {
            gdp: '2.94T USD',
            gdp_growth: '+0.9%',
            unemployment: '7.3%',
            main_sectors: 'Services, Industrie, Agriculture',
        },
        finance: {
            inflation: '4.1%',
            interest_rate: '4.50%',
            public_debt: '112% du PIB',
        }
    },
    'Germany': {
        name: 'Allemagne',
        flag: '🇩🇪',
        continent: 'Europe',
        socio: {
            population: '83.2M',
            life_expectancy: '81.0 ans',
            hdi: '0.942 (Très élevé)',
        },
        eco: {
            gdp: '4.26T USD',
            gdp_growth: '+1.2%',
            unemployment: '5.6%',
            main_sectors: 'Automobile, Ingénierie, Chimie',
        },
        finance: {
            inflation: '6.2%',
            interest_rate: '4.50%',
            public_debt: '68% du PIB',
        }
    },
    'United States': {
        name: 'États-Unis',
        flag: '🇺🇸',
        continent: 'Amérique du Nord',
        socio: {
            population: '331.9M',
            life_expectancy: '77.3 ans',
            hdi: '0.921 (Très élevé)',
        },
        eco: {
            gdp: '23.32T USD',
            gdp_growth: '+2.1%',
            unemployment: '3.7%',
            main_sectors: 'Technologie, Finance, Santé',
        },
        finance: {
            inflation: '3.2%',
            interest_rate: '5.50%',
            public_debt: '129% du PIB',
        }
    },
    // Ajouter plus de pays si nécessaire
};

export default function ExplorerPage() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = (countryName) => {
        const matchedCountry = Object.keys(countryDetails).find(key => 
            key.toLowerCase() === countryName.toLowerCase() || countryName.includes(key)
        );
        setSelectedCountry(countryDetails[matchedCountry] || null);
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

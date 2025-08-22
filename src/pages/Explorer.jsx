
import { useState } from 'react';
import InteractiveWorldMap from '../components/explorer/InteractiveWorldMap';
import CountryDataPanel from '../components/explorer/CountryDataPanel';
import { AnimatePresence } from 'framer-motion';

// Helper to fetch a World Bank indicator for a country
async function fetchIndicator(code, iso2) {
    const res = await fetch(
        `https://api.worldbank.org/v2/country/${iso2}/indicator/${code}?format=json&per_page=1`
    );
    const data = await res.json();
    return data?.[1]?.[0]?.value || null;
}

export default function ExplorerPage() {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleCountryClick = async (countryName) => {
        try {
            // Get ISO codes and flag from RestCountries
            const infoRes = await fetch(
                `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fields=cca2,name,flags`
            );
            const infoData = await infoRes.json();
            const countryInfo = infoData?.[0];
            const iso2 = countryInfo?.cca2?.toLowerCase();

            if (!iso2) return;

            // Fetch indicators from World Bank
            const [population, gdp, gdpGrowth, unemployment, inflation, interestRate, publicDebt] = await Promise.all([
                fetchIndicator('SP.POP.TOTL', iso2),
                fetchIndicator('NY.GDP.MKTP.CD', iso2),
                fetchIndicator('NY.GDP.MKTP.KD.ZG', iso2),
                fetchIndicator('SL.UEM.TOTL.ZS', iso2),
                fetchIndicator('FP.CPI.TOTL.ZG', iso2),
                fetchIndicator('FR.INR.RINR', iso2),
                fetchIndicator('GC.DOD.TOTL.GD.ZS', iso2)
            ]);

            // GDP time series for chart
            const seriesRes = await fetch(
                `https://api.worldbank.org/v2/country/${iso2}/indicator/NY.GDP.MKTP.CD?format=json&per_page=10`
            );
            const seriesData = await seriesRes.json();
            const gdpSeries = (seriesData?.[1] || []).map(item => ({
                year: item.date,
                value: item.value
            })).reverse();

            // News from external source (API key required)
            let news = [];
            try {
                const newsRes = await fetch(
                    `https://newsdata.io/api/1/news?apikey=${import.meta.env.VITE_NEWS_API_KEY}&country=${iso2}`
                );
                const newsJson = await newsRes.json();
                news = newsJson?.results?.slice(0, 5) || [];
            } catch (err) {
                console.error('Failed to fetch news', err);
            }

            setSelectedCountry({
                name: countryInfo?.name?.common || countryName,
                flag: countryInfo?.flags?.svg || '',
                indicators: {
                    population,
                    gdp,
                    gdp_growth: gdpGrowth,
                    unemployment,
                    inflation,
                    interest_rate: interestRate,
                    public_debt: publicDebt
                },
                news,
                gdpSeries
            });
        } catch (error) {
            console.error('Country fetch failed', error);
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
                            <h3 className="text-xl font-bold text-white font-mono tracking-wider">ZONE D&apos;OUTILS OPÉRATIONNELS</h3>
                            <p className="text-[#a0a0a0] font-mono">Espace réservé pour les outils d&apos;analyse et contrôles tactiques.</p>
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

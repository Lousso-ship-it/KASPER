import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    X,
    Users,
    TrendingUp,
    DollarSign,
    Newspaper,
    LineChart as LineChartIcon
} from 'lucide-react';
import {
    ResponsiveContainer,
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

const StatItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
        <span className="text-[#a0a0a0] font-mono text-sm">{label}</span>
        <span className="text-white font-mono font-semibold text-sm">{value ?? 'N/A'}</span>
    </div>
);

const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toLocaleString();
};

export default function CountryDataPanel({ country, onClose }) {
    const [indicators, setIndicators] = useState({});
    const [news, setNews] = useState([]);
    const [gdpSeries, setGdpSeries] = useState([]);

    useEffect(() => {
        if (!country) return;

        const fetchData = async () => {
            try {
                const [popRes, gdpRes, growthRes, inflationRes, gdpHistoryRes] = await Promise.all([
                    fetch(`https://api.worldbank.org/v2/country/${country.code}/indicator/SP.POP.TOTL?format=json&per_page=1`),
                    fetch(`https://api.worldbank.org/v2/country/${country.code}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`),
                    fetch(`https://api.worldbank.org/v2/country/${country.code}/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=1`),
                    fetch(`https://api.worldbank.org/v2/country/${country.code}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=1`),
                    fetch(`https://api.worldbank.org/v2/country/${country.code}/indicator/NY.GDP.MKTP.CD?format=json&per_page=10`)
                ]);

                const popData = await popRes.json();
                const gdpData = await gdpRes.json();
                const growthData = await growthRes.json();
                const inflationData = await inflationRes.json();
                const gdpHistoryData = await gdpHistoryRes.json();

                setIndicators({
                    population: popData[1]?.[0]?.value,
                    gdp: gdpData[1]?.[0]?.value,
                    gdp_growth: growthData[1]?.[0]?.value,
                    inflation: inflationData[1]?.[0]?.value
                });

                const series = (gdpHistoryData[1] || [])
                    .filter(item => item.value !== null)
                    .map(item => ({ year: item.date, value: item.value }))
                    .reverse();
                setGdpSeries(series);
            } catch (err) {
                console.error('Failed to fetch indicators', err);
            }

            try {
                const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?country=${country.code.toLowerCase()}&pageSize=5&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
                const newsData = await newsRes.json();
                setNews(newsData.articles || []);
            } catch (err) {
                console.error('Failed to fetch news', err);
            }
        };

        fetchData();
    }, [country]);

    if (!country) return null;

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#2a2a2a]/95 backdrop-blur-sm border-l border-[#3a3a3a] z-20"
        >
            <Card className="tactical-card h-full flex flex-col bg-transparent border-none">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-[#3a3a3a]">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">{country.flag}</span>
                        <CardTitle className="text-2xl font-bold text-white font-mono tracking-wider">
                            {country.name.toUpperCase()}
                        </CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-[#a0a0a0] hover:text-white">
                        <X className="w-6 h-6" />
                    </Button>
                </CardHeader>
                <CardContent className="p-6 overflow-y-auto space-y-8">
                    {/* Socio-démographique */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <Users className="w-5 h-5" />
                            SOCIO-DÉMOGRAPHIQUE
                        </h3>
                        <StatItem label="Population" value={formatNumber(indicators.population)} />
                    </div>

                    {/* Économique */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <TrendingUp className="w-5 h-5" />
                            ÉCONOMIQUE
                        </h3>
                        <StatItem label="PIB (USD)" value={formatNumber(indicators.gdp)} />
                        <StatItem label="Croissance PIB (%)" value={indicators.gdp_growth != null ? indicators.gdp_growth.toFixed(2) : null} />
                    </div>

                    {/* Financier */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <DollarSign className="w-5 h-5" />
                            FINANCIER
                        </h3>
                        <StatItem label="Inflation (%)" value={indicators.inflation != null ? indicators.inflation.toFixed(2) : null} />
                    </div>

                    {/* Actualités */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <Newspaper className="w-5 h-5" />
                            ACTUALITÉS
                        </h3>
                        {news.length > 0 ? (
                            <ul className="space-y-2">
                                {news.map(article => (
                                    <li key={article.url}>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#a0a0a0] underline hover:text-white"
                                        >
                                            {article.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[#a0a0a0] font-mono text-sm">Aucune actualité disponible.</p>
                        )}
                    </div>

                    {/* Graphique */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <LineChartIcon className="w-5 h-5" />
                            PIB (10 DERNIÈRES ANNÉES)
                        </h3>
                        {gdpSeries.length > 0 ? (
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ReLineChart data={gdpSeries}>
                                        <XAxis dataKey="year" stroke="#a0a0a0" />
                                        <YAxis stroke="#a0a0a0" domain={[0, 'dataMax']} />
                                        <Tooltip contentStyle={{ backgroundColor: '#171717', border: 'none' }} />
                                        <Line type="monotone" dataKey="value" stroke="#ff6b35" strokeWidth={2} dot={false} />
                                    </ReLineChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <p className="text-[#a0a0a0] font-mono text-sm">Données de graphique indisponibles.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

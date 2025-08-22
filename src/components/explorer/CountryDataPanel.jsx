import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Users, TrendingUp, DollarSign, Newspaper } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

const StatItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
        <span className="text-[#a0a0a0] font-mono text-sm">{label}</span>
        <span className="text-white font-mono font-semibold text-sm">{value}</span>
    </div>
);

StatItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default function CountryDataPanel({ country, onClose }) {
    if (!country) return null;

    const { indicators, news, gdpSeries } = country;

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
                        {country.flag && (
                            <img src={country.flag} alt={country.name} className="w-10 h-6 object-cover" />
                        )}
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
                        <StatItem label="Population" value={indicators.population?.toLocaleString()} />
                    </div>

                    {/* Économique */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <TrendingUp className="w-5 h-5" />
                            ÉCONOMIQUE
                        </h3>
                        <StatItem label="PIB (Nominal)" value={indicators.gdp?.toLocaleString()} />
                        <StatItem label="Croissance PIB" value={indicators.gdp_growth} />
                        <StatItem label="Taux de chômage" value={indicators.unemployment} />
                    </div>

                    {/* Financier */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <DollarSign className="w-5 h-5" />
                            FINANCIER
                        </h3>
                        <StatItem label="Taux d'inflation" value={indicators.inflation} />
                        <StatItem label="Taux directeur" value={indicators.interest_rate} />
                        <StatItem label="Dette publique (% PIB)" value={indicators.public_debt} />
                    </div>

                    {/* Actualités */}
                    {news?.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                                <Newspaper className="w-5 h-5" />
                                ACTUALITÉS
                            </h3>
                            <ul className="space-y-2">
                                {news.map(article => (
                                    <li key={article.link} className="text-sm text-[#a0a0a0] font-mono">
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {article.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Graphiques */}
                    {gdpSeries?.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                                <TrendingUp className="w-5 h-5" />
                                PIB - 10 DERNIÈRES ANNÉES
                            </h3>
                            <ChartContainer className="h-48" config={{ gdp: { color: '#ff6b35' } }}>
                                <LineChart data={gdpSeries} margin={{ left: 12, right: 12 }}>
                                    <XAxis dataKey="year" stroke="#a0a0a0" tickLine={false} axisLine={false} />
                                    <YAxis stroke="#a0a0a0" tickLine={false} axisLine={false} tickFormatter={v => `${v/1e9}B`} />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line dataKey="value" type="monotone" stroke="var(--color-gdp)" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

CountryDataPanel.propTypes = {
    country: PropTypes.shape({
        name: PropTypes.string.isRequired,
        flag: PropTypes.string,
        indicators: PropTypes.shape({
            population: PropTypes.number,
            gdp: PropTypes.number,
            gdp_growth: PropTypes.number,
            unemployment: PropTypes.number,
            inflation: PropTypes.number,
            interest_rate: PropTypes.number,
            public_debt: PropTypes.number
        }),
        news: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                link: PropTypes.string
            })
        ),
        gdpSeries: PropTypes.arrayOf(
            PropTypes.shape({
                year: PropTypes.string,
                value: PropTypes.number
            })
        )
    }),
    onClose: PropTypes.func.isRequired
};
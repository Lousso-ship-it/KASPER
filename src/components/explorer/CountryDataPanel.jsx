import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Users, TrendingUp, DollarSign } from 'lucide-react';

const StatItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
        <span className="text-[#a0a0a0] font-mono text-sm">{label}</span>
        <span className="text-white font-mono font-semibold text-sm">{value}</span>
    </div>
);

export default function CountryDataPanel({ country, onClose }) {
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
                        <StatItem label="Population" value={country.socio.population} />
                        <StatItem label="Espérance de vie" value={country.socio.life_expectancy} />
                        <StatItem label="Indice de Dév. Humain" value={country.socio.hdi} />
                    </div>

                    {/* Économique */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <TrendingUp className="w-5 h-5" />
                            ÉCONOMIQUE
                        </h3>
                        <StatItem label="PIB (Nominal)" value={country.eco.gdp} />
                        <StatItem label="Croissance PIB" value={country.eco.gdp_growth} />
                        <StatItem label="Taux de chômage" value={country.eco.unemployment} />
                        <StatItem label="Secteurs principaux" value={country.eco.main_sectors} />
                    </div>

                    {/* Financier */}
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-3 text-lg font-semibold text-[#ff6b35] font-mono tracking-widest">
                            <DollarSign className="w-5 h-5" />
                            FINANCIER
                        </h3>
                        <StatItem label="Taux d'inflation" value={country.finance.inflation} />
                        <StatItem label="Taux directeur" value={country.finance.interest_rate} />
                        <StatItem label="Dette publique" value={country.finance.public_debt} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
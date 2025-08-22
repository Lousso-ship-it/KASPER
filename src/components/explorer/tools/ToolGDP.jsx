import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function ToolGDP({ country }) {
  const [gdp, setGdp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;

    const fetchGDP = async () => {
      setLoading(true);
      try {
        const resCountry = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const countryData = await resCountry.json();
        const code = countryData[0]?.cca2?.toLowerCase();
        const res = await fetch(`https://api.worldbank.org/v2/country/${code}/indicator/NY.GDP.MKTP.CD?format=json`);
        const json = await res.json();
        const validEntry = json[1]?.find(item => item.value !== null);
        setGdp(validEntry ? validEntry.value : null);
      } catch (e) {
        setGdp(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGDP();
  }, [country]);

  return (
    <Card className="h-full bg-[#171717] border-[#2a2a2a]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white text-sm font-mono">
          <TrendingUp className="w-4 h-4" />
          PIB (USD)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-[#a0a0a0] text-sm">Chargement...</p>
        ) : gdp ? (
          <p className="text-2xl font-bold text-white">{Number(gdp).toLocaleString('en-US')}</p>
        ) : (
          <p className="text-[#a0a0a0] text-sm">Données indisponibles</p>
        )}
      </CardContent>
    </Card>
  );
}

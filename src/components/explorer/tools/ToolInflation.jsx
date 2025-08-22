import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Percent } from 'lucide-react';

export default function ToolInflation({ country }) {
  const [inflation, setInflation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;

    const fetchInflation = async () => {
      setLoading(true);
      try {
        const resCountry = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const countryData = await resCountry.json();
        const code = countryData[0]?.cca2?.toLowerCase();
        const res = await fetch(`https://api.worldbank.org/v2/country/${code}/indicator/FP.CPI.TOTL.ZG?format=json`);
        const json = await res.json();
        const validEntry = json[1]?.find(item => item.value !== null);
        setInflation(validEntry ? validEntry.value : null);
      } catch (e) {
        setInflation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInflation();
  }, [country]);

  return (
    <Card className="h-full bg-[#171717] border-[#2a2a2a]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white text-sm font-mono">
          <Percent className="w-4 h-4" />
          Inflation annuelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-[#a0a0a0] text-sm">Chargement...</p>
        ) : inflation !== null ? (
          <p className="text-2xl font-bold text-white">{inflation.toFixed(2)}%</p>
        ) : (
          <p className="text-[#a0a0a0] text-sm">Données indisponibles</p>
        )}
      </CardContent>
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export default function ToolNews({ country }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!country) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const resCountry = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
        const countryData = await resCountry.json();
        const code = countryData[0]?.cca2?.toLowerCase();
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?country=${code}&lang=fr&max=5&apikey=demo`);
        const json = await res.json();
        setArticles(json.articles || []);
      } catch (e) {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]);

  return (
    <Card className="h-full bg-[#171717] border-[#2a2a2a]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-white text-sm font-mono">
          <Newspaper className="w-4 h-4" />
          Actualités
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-[#a0a0a0] text-sm">Chargement...</p>
        ) : articles.length > 0 ? (
          <ul className="space-y-2 text-sm list-disc list-inside">
            {articles.map((article) => (
              <li key={article.url} className="text-[#e5e5e5]">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#a0a0a0] text-sm">Aucune actualité trouvée</p>
        )}
      </CardContent>
    </Card>
  );
}

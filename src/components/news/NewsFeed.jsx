import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, ExternalLink, TrendingUp, TrendingDown, Minus, Eye } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: "La BCE maintient ses taux directeurs malgré les pressions inflationnistes",
    source: "Reuters",
    time: "Il y a 30 minutes",
    snippet: "Christine Lagarde annonce le maintien des taux à 4.50% lors de la conférence de presse mensuelle, citant une stabilisation progressive de l'inflation dans la zone euro.",
    tags: ["BCE", "Inflation", "Zone Euro", "Politique Monétaire"],
    sentiment: "neutral",
    importance: "high",
    views: 1247,
    category: "monetary_policy"
  },
  {
    id: 2,
    title: "Wall Street termine en hausse sur fond d'optimisme technologique",
    source: "Bloomberg",
    time: "Il y a 2 heures",
    snippet: "Les indices américains clôturent dans le vert, portés par les résultats trimestriels dépassant les attentes des GAFAM, notamment Apple et Microsoft.",
    tags: ["Wall Street", "Tech", "Résultats", "GAFAM"],
    sentiment: "positive",
    importance: "medium",
    views: 856,
    category: "markets"
  },
  {
    id: 3,
    title: "Crise énergétique en Europe : les prix du gaz bondissent de 15%",
    source: "Financial Times",
    time: "Il y a 4 heures",
    snippet: "Les tensions géopolitiques en Europe de l'Est provoquent une flambée des prix énergétiques, inquiétant les marchés européens.",
    tags: ["Énergie", "Gaz", "Europe", "Géopolitique"],
    sentiment: "negative",
    importance: "high",
    views: 2103,
    category: "energy"
  },
  {
    id: 4,
    title: "L'emploi américain résiste mieux que prévu en décembre",
    source: "Wall Street Journal",
    time: "Il y a 6 heures",
    snippet: "Le taux de chômage se maintient à 3.7%, dépassant les prévisions des économistes qui tablaient sur une légère hausse.",
    tags: ["Emploi", "USA", "Statistiques", "Économie"],
    sentiment: "positive",
    importance: "medium",
    views: 634,
    category: "employment"
  },
  {
    id: 5,
    title: "La Chine assouplit sa politique zéro-COVID : impact sur les chaînes mondiales",
    source: "Les Echos",
    time: "Il y a 8 heures",
    snippet: "Pékin annonce des mesures d'assouplissement qui pourraient relancer les échanges commerciaux mais suscitent des inquiétudes sanitaires.",
    tags: ["Chine", "COVID-19", "Commerce", "Chaînes d'approvisionnement"],
    sentiment: "neutral",
    importance: "high",
    views: 1876,
    category: "trade"
  }
];

const getSentimentIcon = (sentiment) => {
  switch (sentiment) {
    case 'positive': return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'negative': return <TrendingDown className="w-4 h-4 text-red-500" />;
    default: return <Minus className="w-4 h-4 text-[#a3a3a3]" />;
  }
};

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'positive': return 'bg-green-600/20 text-green-400 border-green-500/30';
    case 'negative': return 'bg-red-600/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-600/20 text-[#a3a3a3] border-gray-500/30';
  }
};

const getImportanceColor = (importance) => {
  switch (importance) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

const NewsCard = ({ article }) => (
  <Card className="bg-[#171717] border-[#2a2a2a] hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <div className={`w-1 h-16 rounded-full ${getImportanceColor(article.importance)}`}></div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#e5e5e5] leading-tight mb-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
                <span className="font-medium">{article.source}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Badge variant="outline" className={getSentimentColor(article.sentiment)}>
            <div className="flex items-center gap-1">
              {getSentimentIcon(article.sentiment)}
              <span className="capitalize">{article.sentiment === 'positive' ? 'Positif' : article.sentiment === 'negative' ? 'Négatif' : 'Neutre'}</span>
            </div>
          </Badge>
          <Button variant="ghost" size="icon" className="text-[#a3a3a3] hover:text-[#e5e5e5]">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-[#a3a3a3] leading-relaxed mb-4">{article.snippet}</p>
      <div className="flex gap-2 flex-wrap">
        {article.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs bg-[#0D0D0D] text-[#a3a3a3] border-[#2a2a2a]">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function NewsFeed({ searchQuery, filters }) {
  const [sortBy, setSortBy] = useState("time");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "importance":
        const importanceOrder = { high: 3, medium: 2, low: 1 };
        return importanceOrder[b.importance] - importanceOrder[a.importance];
      case "views":
        return b.views - a.views;
      default:
        return 0; // Par défaut, garder l'ordre chronologique
    }
  });

  return (
    <div className="space-y-6">
      {/* Filtres et tri */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent className="bg-[#171717] border-[#2a2a2a]">
              <SelectItem value="all" className="text-[#e5e5e5] hover:bg-[#222222]">Toutes les catégories</SelectItem>
              <SelectItem value="monetary_policy" className="text-[#e5e5e5] hover:bg-[#222222]">Politique Monétaire</SelectItem>
              <SelectItem value="markets" className="text-[#e5e5e5] hover:bg-[#222222]">Marchés</SelectItem>
              <SelectItem value="energy" className="text-[#e5e5e5] hover:bg-[#222222]">Énergie</SelectItem>
              <SelectItem value="employment" className="text-[#e5e5e5] hover:bg-[#222222]">Emploi</SelectItem>
              <SelectItem value="trade" className="text-[#e5e5e5] hover:bg-[#222222]">Commerce</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-[#171717] border-[#2a2a2a] text-[#e5e5e5]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent className="bg-[#171717] border-[#2a2a2a]">
              <SelectItem value="time" className="text-[#e5e5e5] hover:bg-[#222222]">Plus récent</SelectItem>
              <SelectItem value="importance" className="text-[#e5e5e5] hover:bg-[#222222]">Importance</SelectItem>
              <SelectItem value="views" className="text-[#e5e5e5] hover:bg-[#222222]">Popularité</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-[#a3a3a3]">
          {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''} trouvé{sortedArticles.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Liste des articles */}
      <div className="space-y-4">
        {sortedArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Bouton "Charger plus" */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg" className="border-[#2a2a2a] text-[#a3a3a3] hover:bg-[#222222] bg-[#171717]">
          Charger plus d'articles
        </Button>
      </div>
    </div>
  );
}
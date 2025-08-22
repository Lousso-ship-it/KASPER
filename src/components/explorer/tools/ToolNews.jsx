import React, { useEffect, useState } from 'react';

export default function ToolNews({ country }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    setError(null);

    fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(country)}&tags=story&hitsPerPage=5`)
      .then(res => res.json())
      .then(data => setArticles(data?.hits || []))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (!country) return null;

  return (
    <div className="space-y-2 text-[#a0a0a0] font-mono">
      {loading && <p>Chargement des actualités...</p>}
      {error && <p>Erreur lors du chargement des actualités.</p>}
      {!loading && !error && articles.map(article => (
        <a
          key={article.objectID}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:underline text-sm"
        >
          {article.title}
        </a>
      ))}
    </div>
  );
}

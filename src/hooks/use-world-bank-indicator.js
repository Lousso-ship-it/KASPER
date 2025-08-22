import * as React from "react";

export function useWorldBankIndicator(country, code) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!country || !code) return;
    const controller = new AbortController();
    setLoading(true);
    fetch(`https://api.worldbank.org/v2/country/${country}/indicator/${code}?format=json`, {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        const series = Array.isArray(json) ? json[1] : [];
        setData(series);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });
    return () => controller.abort();
  }, [country, code]);

  return { data, loading, error };
}

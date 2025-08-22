import * as React from "react";

export function useIMFSeries(dataset, params = {}) {
  const { frequency = "A", country, series, startPeriod, endPeriod } = params;
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!dataset || !country || !series) return;
    const controller = new AbortController();
    setLoading(true);
    const path = `${frequency}.${country}.${series}`;
    const searchParams = new URLSearchParams();
    if (startPeriod) searchParams.set("startPeriod", startPeriod);
    if (endPeriod) searchParams.set("endPeriod", endPeriod);
    const baseUrl = "https://dataservices.imf.org/REST/SDMX_JSON.svc/CompactData";
    const url = `${baseUrl}/${dataset}/${path}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
        const seriesData = json?.CompactData?.DataSet?.Series?.Obs || [];
        setData(seriesData);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });
    return () => controller.abort();
  }, [dataset, country, series, frequency, startPeriod, endPeriod]);

  return { data, loading, error };
}

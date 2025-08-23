diff --git a//dev/null b/src/api/historicalData.js
index 0000000000000000000000000000000000000000..f7f5cf5845cb739ef035d4083f001909e7de2574 100644
--- a//dev/null
+++ b/src/api/historicalData.js
@@ -0,0 +1,18 @@
+export async function fetchHistoricalData(symbol, range = '1y', interval = '1d') {
+  // Utilise l'endpoint historique de Yahoo Finance, identique à celui employé par yfinance
+  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`;
+  const res = await fetch(url);
+  if (!res.ok) {
+    throw new Error('Failed to fetch historical data');
+  }
+  const json = await res.json();
+  const result = json.chart?.result?.[0];
+  const timestamps = result?.timestamp || [];
+  const closes = result?.indicators?.quote?.[0]?.close || [];
+  return timestamps.map((t, i) => ({
+    date: new Date(t * 1000),
+    close: closes[i],
+  }));
+}
+
+export default fetchHistoricalData;

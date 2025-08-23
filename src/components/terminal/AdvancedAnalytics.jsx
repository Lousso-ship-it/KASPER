diff --git a//dev/null b/src/components/terminal/AdvancedAnalytics.jsx
index 0000000000000000000000000000000000000000..b45b5e8a25db21de8a54b06620a3dd4e4c12832f 100644
--- a//dev/null
+++ b/src/components/terminal/AdvancedAnalytics.jsx
@@ -0,0 +1,127 @@
+import React, { useState, useEffect } from 'react';
+import {
+  LineChart,
+  Line,
+  XAxis,
+  YAxis,
+  Tooltip,
+  CartesianGrid,
+  ResponsiveContainer,
+} from 'recharts';
+import fetchHistoricalData from '../../api/historicalData';
+
+const computeSMA = (data, period) => {
+  const sma = [];
+  for (let i = 0; i < data.length; i++) {
+    if (i < period - 1) {
+      sma.push(null);
+      continue;
+    }
+    const slice = data.slice(i - period + 1, i + 1);
+    const sum = slice.reduce((acc, val) => acc + val, 0);
+    sma.push(sum / period);
+  }
+  return sma;
+};
+
+const linearRegressionPredict = (data) => {
+  const n = data.length;
+  if (n < 2) return null;
+  let sumX = 0,
+    sumY = 0,
+    sumXY = 0,
+    sumXX = 0;
+  for (let i = 0; i < n; i++) {
+    const x = i;
+    const y = data[i].close;
+    sumX += x;
+    sumY += y;
+    sumXY += x * y;
+    sumXX += x * x;
+  }
+  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
+  const intercept = (sumY - slope * sumX) / n;
+  const nextX = n;
+  return intercept + slope * nextX;
+};
+
+const AdvancedAnalytics = () => {
+  const [symbol, setSymbol] = useState('AAPL');
+  const [data, setData] = useState([]);
+  const [loading, setLoading] = useState(false);
+  const [prediction, setPrediction] = useState(null);
+
+  const loadData = async (s) => {
+    setLoading(true);
+    try {
+      const hist = await fetchHistoricalData(s);
+      const closes = hist.map((d) => d.close);
+      const sma20 = computeSMA(closes, 20);
+      const sma50 = computeSMA(closes, 50);
+      const pred = linearRegressionPredict(hist.slice(-60));
+      setPrediction(pred);
+      const merged = hist.map((d, i) => ({
+        date: d.date.toISOString().slice(0, 10),
+        close: d.close,
+        sma20: sma20[i],
+        sma50: sma50[i],
+      }));
+      setData(merged);
+    } catch (err) {
+      console.error('Failed to load historical data', err);
+      setData([]);
+      setPrediction(null);
+    } finally {
+      setLoading(false);
+    }
+  };
+
+  useEffect(() => {
+    loadData(symbol);
+  }, [symbol]);
+
+  return (
+    <div className="space-y-4 p-4">
+      <div className="flex items-center space-x-2">
+        <input
+          type="text"
+          value={symbol}
+          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
+          className="px-2 py-1 border rounded w-32"
+        />
+        <button
+          onClick={() => loadData(symbol)}
+          className="px-4 py-1 bg-primary text-primary-foreground rounded"
+        >
+          Charger
+        </button>
+      </div>
+      {loading && <p>Loading...</p>}
+      {!loading && data.length > 0 && (
+        <>
+          <div className="h-64">
+            <ResponsiveContainer width="100%" height="100%">
+              <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
+                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
+                <XAxis dataKey="date" hide />
+                <YAxis domain={["auto", "auto"]} />
+                <Tooltip />
+                <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
+                <Line type="monotone" dataKey="sma20" stroke="#82ca9d" dot={false} />
+                <Line type="monotone" dataKey="sma50" stroke="#ffc658" dot={false} />
+              </LineChart>
+            </ResponsiveContainer>
+          </div>
+          {prediction && (
+            <p className="text-sm text-[#a0a0a0] font-mono">
+              Prévision prochaine clôture: {prediction.toFixed(2)}
+            </p>
+          )}
+        </>
+      )}
+      {!loading && data.length === 0 && <p>Aucune donnée</p>}
+    </div>
+  );
+};
+
+export default AdvancedAnalytics;

import React, { useEffect, useState, useMemo } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Document } from "@/api/entities";
import prices from "@/data/prices.json";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout = [
  { i: "line", x: 0, y: 0, w: 6, h: 4, type: "line" },
  { i: "bar", x: 6, y: 0, w: 6, h: 4, type: "bar" },
  { i: "kpi", x: 0, y: 4, w: 3, h: 2, type: "kpi" },
  { i: "table", x: 3, y: 4, w: 9, h: 2, type: "table" },
];

const chartDataFromPrices = (records) => {
  const grouped = {};
  records.forEach((r) => {
    if (!grouped[r.symbol]) grouped[r.symbol] = { name: r.symbol };
    grouped[r.symbol][r.source] = r.price;
  });
  return Object.values(grouped);
};

export default function MonitorPage() {
  const [dashboards, setDashboards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [layout, setLayout] = useState(defaultLayout);
  const [title, setTitle] = useState("");
  const chartData = useMemo(() => chartDataFromPrices(prices), []);
  const firstPrice = chartData[0]?.pyth ?? chartData[0]?.yfinance ?? 0;

  useEffect(() => {
    loadDashboards();
  }, []);

  const loadDashboards = async () => {
    try {
      const docs = await Document.list();
      const dashboards = Array.isArray(docs)
        ? docs.filter((d) => d.type === "dashboard")
        : [];
      setDashboards(dashboards);
    } catch (error) {
      console.error("Erreur chargement dashboards:", error);
    }
  };

  const handleLayoutChange = (currentLayout) => {
    const updated = currentLayout.map((item) => {
      const existing = layout.find((l) => l.i === item.i);
      return { ...item, type: existing ? existing.type : item.i };
    });
    setLayout(updated);
  };

  const handleNew = () => {
    setSelected(null);
    setLayout(defaultLayout);
    setTitle("Nouveau dashboard");
  };

  const handleSelect = (doc) => {
    setSelected(doc);
    setLayout(doc.config ? JSON.parse(doc.config) : defaultLayout);
    setTitle(doc.title || "Dashboard");
  };

  const handleSave = async () => {
    try {
      if (selected && selected.id) {
        await Document.update(selected.id, {
          title: title,
          type: "dashboard",
          config: JSON.stringify(layout),
        });
      } else {
        await Document.create({
          title: title,
          type: "dashboard",
          config: JSON.stringify(layout),
        });
      }
      await loadDashboards();
    } catch (error) {
      console.error("Erreur sauvegarde dashboard:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce dashboard ?")) return;
    try {
      await Document.delete(id);
      if (selected && selected.id === id) {
        setSelected(null);
        setLayout(defaultLayout);
        setTitle("");
      }
      await loadDashboards();
    } catch (error) {
      console.error("Erreur suppression dashboard:", error);
    }
  };

  const renderWidget = (id) => {
    switch (id) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pyth" stroke="#ff6b35" />
              <Line type="monotone" dataKey="yfinance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pyth" fill="#ff6b35" />
              <Bar dataKey="yfinance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "kpi":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">KPI</div>
              <div className="text-4xl font-bold">{firstPrice.toFixed(2)}</div>
            </div>
          </div>
        );
      case "table":
        return (
          <div className="overflow-auto h-full">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-1">Nom</th>
                  <th className="text-left p-1">Valeur</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((row) => (
                  <tr
                    key={row.name}
                    className="border-t border-[var(--border-color)]"
                  >
                    <td className="p-1">{row.name}</td>
                    <td className="p-1">{(row.pyth ?? row.yfinance)?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex">
      <div className="w-64 border-r border-[#3a3a3a] p-4 space-y-4">
        <Button onClick={handleNew} className="tactical-button w-full">
          Nouveau
        </Button>
        <ul className="space-y-2 overflow-auto max-h-[calc(100%-3rem)]">
          {dashboards.map((doc) => (
            <li
              key={doc.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                selected && selected.id === doc.id
                  ? "bg-[#ff6b35] text-black"
                  : "hover:bg-[#2a2a2a]"
              }`}
              onClick={() => handleSelect(doc)}
            >
              <span className="truncate font-mono text-sm">{doc.title}</span>
              <Button
                size="icon"
                variant="ghost"
                className="text-red-500 hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(doc.id);
                }}
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        {title ? (
          <div className="space-y-4 h-full">
            <div className="flex items-center gap-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={handleSave} className="tactical-button">
                Sauvegarder
              </Button>
            </div>
            <ResponsiveGridLayout
              className="layout"
              layouts={{ lg: layout }}
              cols={{ lg: 12 }}
              rowHeight={100}
              onLayoutChange={handleLayoutChange}
              draggableHandle=".widget-header"
            >
              {layout.map((item) => (
                <div
                  key={item.i}
                  data-grid={item}
                  className="tactical-card p-2 h-full"
                >
                  <div className="widget-header font-bold mb-2 cursor-move">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                  {renderWidget(item.i)}
                </div>
              ))}
            </ResponsiveGridLayout>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-[#a0a0a0] font-mono">
              Sélectionnez ou créez un dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


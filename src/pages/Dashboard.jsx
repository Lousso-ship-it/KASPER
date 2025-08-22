import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Document } from "@/api/entities";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout = [
  { i: "line", x: 0, y: 0, w: 6, h: 4, type: "line" },
  { i: "bar", x: 6, y: 0, w: 6, h: 4, type: "bar" },
  { i: "kpi", x: 0, y: 4, w: 3, h: 2, type: "kpi" },
  { i: "table", x: 3, y: 4, w: 9, h: 2, type: "table" },
];

const sampleData = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 139 },
  { name: "Mar", value: 200, value2: 980 },
  { name: "Apr", value: 278, value2: 390 },
  { name: "May", value: 189, value2: 480 },
];

export default function Dashboard() {
  const [layout, setLayout] = useState(defaultLayout);

  const handleLayoutChange = (currentLayout) => {
    // Preserve widget type
    const updated = currentLayout.map((item) => {
      const existing = layout.find((l) => l.i === item.i);
      return { ...item, type: existing ? existing.type : item.i };
    });
    setLayout(updated);
  };

  const handleSave = async () => {
    try {
      await Document.create({
        title: "Dashboard",
        type: "dashboard",
        config: JSON.stringify(layout),
      });
    } catch (error) {
      console.error("Error saving dashboard:", error);
    }
  };

  const renderWidget = (id) => {
    switch (id) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ff6b35" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value2" fill="#ff6b35" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "kpi":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-xl font-bold mb-2">KPI</div>
              <div className="text-4xl font-bold">42</div>
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
                {sampleData.map((row) => (
                  <tr key={row.name} className="border-t border-[var(--border-color)]">
                    <td className="p-1">{row.name}</td>
                    <td className="p-1">{row.value}</td>
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
    <div className="space-y-4">
      <Button onClick={handleSave} className="tactical-button">Sauvegarder</Button>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        cols={{ lg: 12 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-header"
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item} className="tactical-card p-2 h-full">
            <div className="widget-header font-bold mb-2 cursor-move">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </div>
            {renderWidget(item.i)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}


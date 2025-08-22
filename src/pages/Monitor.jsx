import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MonitorPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="p-8 text-center">
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold font-mono">MONITOR</h1>
          <p className="text-[#a0a0a0] font-mono">
            Créateur de tableaux de bord en cours de développement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

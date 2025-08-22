import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";

export default function MonitorPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    User.me().then(u => setRole(u.role)).catch(() => {});
  }, []);

  const isAdmin = role === User.role.ADMIN;

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="p-8 text-center">
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold font-mono">MONITOR</h1>
          <p className="text-[#a0a0a0] font-mono">
            Créateur de tableaux de bord en cours de développement.
          </p>
          {isAdmin && (
            <div className="flex justify-center gap-2 pt-4">
              <Button size="sm">Éditer</Button>
              <Button size="sm" variant="destructive">Supprimer</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  MoreVertical, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  AlertTriangle,
  Calendar,
  Activity
} from "lucide-react";

const typeIcons = {
  analysis: TrendingUp,
  monitoring: Activity,
  reporting: FileText,
  alert: AlertTriangle
};

const categoryColors = {
  economic: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  financial: "bg-green-600/20 text-green-400 border-green-500/30",
  markets: "bg-purple-600/20 text-purple-400 border-purple-500/30",
  socio_demographic: "bg-orange-600/20 text-orange-400 border-orange-500/30",
  news: "bg-red-600/20 text-red-400 border-red-500/30"
};

const frequencyLabels = {
  daily: "Quotidien",
  weekly: "Hebdomadaire", 
  monthly: "Mensuel",
  quarterly: "Trimestriel"
};

export default function TaskCard({ task, onToggleStatus }) {
  const TypeIcon = typeIcons[task.type] || Activity;
  
  return (
    <Card className="tactical-card hover:border-[#ff6b35]/30 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#ff6b35]/20 border border-[#ff6b35]/30">
              <TypeIcon className="w-5 h-5 text-[#ff6b35]" />
            </div>
            <div>
              <CardTitle className="text-lg text-white font-mono">{task.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge className={categoryColors[task.category] || "bg-gray-600/20 text-gray-400"}>
                  {task.category}
                </Badge>
                <Badge variant="outline" className="border-[#3a3a3a] text-[#a0a0a0]">
                  {frequencyLabels[task.frequency]}
                </Badge>
                <Badge className={task.is_active ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}>
                  {task.is_active ? "ACTIVE" : "PAUSE"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleStatus}
              className="text-[#a0a0a0] hover:text-[#ff6b35]"
            >
              {task.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a0a0a0] hover:text-white"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-[#a0a0a0] font-mono mb-4 leading-relaxed text-base">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#a0a0a0]">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">
                {task.execution_count || 0} exécutions
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#a0a0a0]">
              <Clock className="w-4 h-4" />
              <span className="font-mono">
                Prochaine: 14h30
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
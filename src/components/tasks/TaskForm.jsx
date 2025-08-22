import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Zap } from "lucide-react";
import PipelineBuilder from "./PipelineBuilder";

export default function TaskForm({ onSubmit, onCancel, selectedTemplate }) {
  const [formData, setFormData] = useState({
    title: selectedTemplate?.title || "",
    description: selectedTemplate?.description || "",
    type: selectedTemplate?.type || "",
    category: selectedTemplate?.category || "",
    frequency: "daily",
    parameters: {
      email_notifications: true
    }
  });
  const initialNodes = [
    { id: "1", type: "source", position: { x: 0, y: 50 }, data: { label: "Source" } },
    { id: "2", type: "transform", position: { x: 200, y: 50 }, data: { label: "Transform" } },
    { id: "3", type: "output", position: { x: 400, y: 50 }, data: { label: "Output" } }
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" }
  ];
  const [pipeline, setPipeline] = useState({ nodes: initialNodes, edges: initialEdges });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.type || !formData.category) return;
    onSubmit({ ...formData, pipeline });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="tactical-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-[#3a3a3a]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white font-mono tracking-wider flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#ff6b35]" />
              NOUVELLE TÂCHE
            </CardTitle>
            <Button variant="ghost" onClick={onCancel} className="text-[#a0a0a0] hover:text-white">
              <X className="w-6 h-6" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                Titre de la tâche
              </label>
              <Input
                placeholder="Ex: Suivi quotidien du CAC 40..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                Description détaillée
              </label>
              <Textarea
                placeholder="Décrivez précisément ce que vous voulez analyser et recevoir comme rapport..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono h-32"
                required
              />
            </div>

            {/* Type et Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                  Type de tâche
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono">
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                    <SelectItem value="analysis" className="text-white font-mono">Analyse</SelectItem>
                    <SelectItem value="monitoring" className="text-white font-mono">Surveillance</SelectItem>
                    <SelectItem value="reporting" className="text-white font-mono">Rapport</SelectItem>
                    <SelectItem value="alert" className="text-white font-mono">Alerte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                  Catégorie
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono">
                    <SelectValue placeholder="Sélectionner la catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                    <SelectItem value="economic" className="text-white font-mono">Économique</SelectItem>
                    <SelectItem value="financial" className="text-white font-mono">Financier</SelectItem>
                    <SelectItem value="markets" className="text-white font-mono">Marchés</SelectItem>
                    <SelectItem value="socio_demographic" className="text-white font-mono">Socio-démographique</SelectItem>
                    <SelectItem value="news" className="text-white font-mono">Actualités</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fréquence */}
            <div>
              <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                Fréquence d&apos;exécution
              </label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectItem value="daily" className="text-white font-mono">Quotidien</SelectItem>
                  <SelectItem value="weekly" className="text-white font-mono">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly" className="text-white font-mono">Mensuel</SelectItem>
                  <SelectItem value="quarterly" className="text-white font-mono">Trimestriel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pipeline */}
            <div>
              <label className="block text-sm font-bold text-[#a0a0a0] mb-2 font-mono uppercase tracking-wider">
                Pipeline
              </label>
              <PipelineBuilder value={pipeline} onChange={setPipeline} />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-[#3a3a3a]">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-[#3a3a3a] text-[#a0a0a0] hover:text-white font-mono">
                ANNULER
              </Button>
              <Button type="submit" className="flex-1 tactical-button">
                CRÉER LA TÂCHE
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedTemplate: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
  }),
};
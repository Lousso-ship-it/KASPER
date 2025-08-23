import React, { useState, useEffect } from "react";
import { Task } from "@/api/entities";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Settings
} from "lucide-react";
import TaskForm from "../components/tasks/TaskForm";
import TaskCard from "../components/tasks/TaskCard";
import TaskTemplates from "../components/tasks/TaskTemplates";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await Task.list();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { outputDatasetId, pipeline, parameters, ...rest } = taskData;
      await Task.create({
        ...rest,
        output_dataset_id: outputDatasetId,
        parameters: { ...parameters, pipeline },
        next_execution: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
      setShowForm(false);
      setSelectedTemplate(null);
      await loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await Task.update(task.id, {
        is_active: !task.is_active
      });
      await loadTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowTemplates(false);
    setShowForm(true);
  };

  const filteredTasks = tasks.filter(task => 
    !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="h-full">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-wider">Tâches</h1>
        </div>
        <Button 
          onClick={() => {
            setShowTemplates(true);
            setSelectedTemplate(null);
          }}
          className="tactical-button flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter une nouvelle
        </Button>
      </div>

      {tasks.length === 0 && !loading ? (
        // État vide avec modèles
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-[#3a3a3a] rounded-lg flex items-center justify-center">
              <Settings className="w-8 h-8 text-[#a0a0a0]" />
            </div>
            <h3 className="text-xl font-bold text-white font-mono">
              Commencez par ajouter une tâche
            </h3>
            <p className="text-[#a0a0a0] font-mono text-base max-w-md">
              Planifier une tâche pour automatiser des actions et recevoir des rapports lorsqu'elles sont terminées.
            </p>
          </div>
          
          <TaskTemplates onSelect={handleTemplateSelect} />
        </div>
      ) : (
        // Liste des tâches existantes
        <div className="space-y-6">
          {/* Barre de recherche */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] w-4 h-4" />
            <Input
              placeholder="Rechercher des tâches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#2a2a2a] border-[#3a3a3a] text-white font-mono"
            />
          </div>

          {/* Grille des tâches */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggleStatus={() => toggleTaskStatus(task)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal des modèles */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white font-mono">Choisir un modèle</h2>
              <Button
                variant="ghost"
                onClick={() => setShowTemplates(false)}
                className="text-[#a0a0a0] hover:text-white"
              >
                ✕
              </Button>
            </div>
            <TaskTemplates onSelect={handleTemplateSelect} />
          </div>
        </div>
      )}

      {/* Modal de création */}
      {showForm && (
        <TaskForm 
          onSubmit={handleCreateTask}
          onCancel={() => {
            setShowForm(false);
            setSelectedTemplate(null);
          }}
          selectedTemplate={selectedTemplate}
        />
      )}
    </div>
  );
}

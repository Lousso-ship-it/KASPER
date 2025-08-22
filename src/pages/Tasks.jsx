
import { useState, useEffect } from "react";
import { Task } from "@/api/entities"; // Changed from base44 client to direct Task entity import
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Settings, LogIn } from "lucide-react";
import TaskForm from "../components/tasks/TaskForm";
import TaskCard from "../components/tasks/TaskCard";
import TaskTemplates from "../components/tasks/TaskTemplates";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    checkAuthAndLoadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthAndLoadTasks = async () => {
    try {
      await User.me();
      setIsAuthenticated(true);
      await loadTasks();
    } catch (error) {
      console.log("Authentication check:", error.message);
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const fetchedTasks = await Task.list(); // Changed from base44.entities.Task.list()
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      if (error.message && error.message.includes("logged in")) {
        setIsAuthenticated(false);
      }
    }
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { outputDatasetId, frequency, trigger, ...payload } = taskData;
      const [hours, minutes] = trigger.split(":").map(Number);
      const nextExecution = new Date();
      nextExecution.setHours(hours, minutes, 0, 0);
      if (nextExecution <= new Date()) {
        nextExecution.setDate(nextExecution.getDate() + 1);
      }
      const newTask = await Task.create({
        ...payload,
        output_dataset_id: outputDatasetId,
        next_execution: nextExecution.toISOString(),
      });

      if (newTask?.id) {
        await Task.schedule(newTask.id, { frequency, trigger });
      }

      setShowForm(false);
      setSelectedTemplate(null);
      await loadTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      await Task.update(task.id, { // Changed from base44.entities.Task.update()
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

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white font-mono tracking-wider">TÂCHES</h1>
          <p className="text-[#a0a0a0] text-lg font-mono max-w-2xl">
            Planifiez et automatisez vos analyses pour recevoir des rapports
          </p>
        </div>
        
        <div className="p-16 text-center bg-[#2a2a2a] border border-[#3a3a3a]">
          <LogIn className="w-16 h-16 mx-auto mb-6 text-[#ff6b35]" />
          <h3 className="text-2xl font-bold text-white mb-4 font-mono">CONNEXION REQUISE</h3>
          <Button onClick={handleLogin} className="tactical-button h-14 px-8">
            <LogIn className="w-6 h-6 mr-3" />
            SE CONNECTER
          </Button>
        </div>
      </div>
    );
  }

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
              Planifier une tâche pour automatiser des actions et recevoir des rapports lorsqu&apos;elles sont terminées.
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

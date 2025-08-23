
import React, { useState, useEffect, useRef } from "react";
import { Document } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  SortDesc,
  SortAsc,
  X
} from "lucide-react";
import DocumentList from "../components/files/DocumentList";
import FileCreationView from "../components/files/FileCreationView";
import { UploadFile, ExtractDataFromUploadedFile } from "@/api/integrations";
import TagFilter from "../components/files/TagFilter";

export default function FilesPage() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("generation_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadDocuments(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    filterAndSortDocuments();
  }, [documents, selectedCategory, selectedType, sortBy, sortOrder, selectedTags]);

  const loadDocuments = async (query = "") => {
    try {
      setLoading(true);
      const fetchedDocuments = query
        ? await Document.list({ query })
        : await Document.list();
      setDocuments(fetchedDocuments);
      const tagsSet = new Set();
      fetchedDocuments.forEach(doc => (doc.tags || []).forEach(tag => tagsSet.add(tag)));
      setAvailableTags([...tagsSet]);
      if (selectedDocument) {
        const updatedSelectedDoc = fetchedDocuments.find(doc => doc.id === selectedDocument.id);
        setSelectedDocument(updatedSelectedDoc || null);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortDocuments = () => {
    let filtered = documents.filter(doc => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      const matchesType = selectedType === "all" || doc.type === selectedType;
      const matchesTags = selectedTags.length === 0 || (doc.tags && selectedTags.every(tag => doc.tags.includes(tag)));

      return matchesCategory && matchesType && matchesTags;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'generation_date' || sortBy === 'created_date') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    setFilteredDocuments(filtered);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadResult = await UploadFile({ file });

      if (uploadResult.file_url) {
        // Créer un document dans la base de données
        const newDoc = {
          title: file.name,
          type: getFileType(file.type),
          category: "uncategorized",
          description: `Fichier téléchargé: ${file.name}`,
          file_url: uploadResult.file_url,
          file_size: file.size,
          file_format: getFileFormat(file.name),
          source: "Upload utilisateur",
          generation_date: new Date().toISOString()
        };

        const createdDoc = await Document.create(newDoc);
        await loadDocuments(searchQuery);
        setSelectedDocument(createdDoc);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateDocument = async (documentType) => {
    try {
      const newDoc = {
        title: `Nouveau ${documentType}`,
        type: documentType,
        category: "uncategorized",
        description: `Document de type ${documentType} créé par l'utilisateur.`,
        content: getTemplateContent(documentType),
        source: "Création utilisateur",
        generation_date: new Date().toISOString()
      };
      if (documentType === 'code') {
          newDoc.language = 'plaintext';
      }
      const createdDoc = await Document.create(newDoc);
      await loadDocuments(searchQuery);
      setSelectedDocument(createdDoc);
    } catch (error) {
      console.error("Document creation error:", error);
    }
  };

  const updateDocument = async (docId, data) => {
    try {
      const updatedDoc = await Document.update(docId, data);
      await loadDocuments(searchQuery);
      setSelectedDocument(updatedDoc);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const toggleFavorite = async (document) => {
    try {
      await Document.update(document.id, {
        is_favorite: !document.is_favorite
      });
      await loadDocuments(searchQuery);
    } catch (error) {
      console.error("Toggle favorite error:", error);
    }
  };

  const deleteDocument = async (documentId) => {
    try {
      await Document.delete(documentId);
      if (selectedDocument && selectedDocument.id === documentId) {
        setSelectedDocument(null);
      }
      await loadDocuments(searchQuery);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setSortBy("generation_date");
    setSortOrder("desc");
    setSearchQuery("");
    setSelectedTags([]);
  };

  // Fonctions utilitaires
  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'generic';
    if (mimeType.includes('pdf')) return 'generic';
    if (mimeType.includes('text/plain') || mimeType.includes('csv')) return 'text';
    return 'generic';
  };

  const getFileFormat = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const getTemplateContent = (type) => {
    const templates = {
      report: "# Nouveau Rapport\n\n## Section 1\n\n",
      analysis: "# Nouvelle Analyse\n\n## Données\n\n",
      code: "/*\n  Nouveau fichier de code\n  Langage: plaintext\n*/\n",
      // New templates for briefing and alert
      briefing: "# Nouveau Briefing\n\n## Contexte\n\n## Informations Clés\n\n## Conclusion\n\n",
      alert: "# Nouvelle Alerte\n\n## Sujet de l'Alerte\n\n## Description\n\n## Actions Recommandées\n\n"
    };
    return templates[type] || "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedType !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    selectedTags.length;

  return (
    <div className="h-full flex gap-4">
      {/* Colonne de gauche : Navigateur de fichiers */}
      <div className="w-full md:w-1/3 lg:w-1/4 max-w-md flex flex-col bg-[#2a2a2a] border border-[#3a3a3a] h-full">
        {/* En-tête avec contrôles */}
        <div className="p-4 border-b border-[#3a3a3a] space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white font-mono">Fichiers</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={`text-[#a0a0a0] hover:text-white ${activeFiltersCount > 0 ? 'text-[#ff6b35]' : ''}`}
              >
                <Filter className="w-5 h-5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b35] text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUploadClick}
                disabled={uploading}
                className="text-[#a0a0a0] hover:text-white"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] w-4 h-4" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-8 bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#a0a0a0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="space-y-3 p-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-[#a0a0a0] font-mono">FILTRES</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs text-[#a0a0a0] hover:text-white font-mono"
                >
                  RESET
                </Button>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white font-mono">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectItem value="all" className="text-white font-mono">Toutes</SelectItem>
                  <SelectItem value="intelligence" className="text-white font-mono">Intelligence</SelectItem>
                  <SelectItem value="economic" className="text-white font-mono">Économique</SelectItem>
                  <SelectItem value="financial" className="text-white font-mono">Financier</SelectItem>
                  <SelectItem value="project" className="text-white font-mono">Projet</SelectItem>
                  <SelectItem value="research" className="text-white font-mono">Recherche</SelectItem>
                  <SelectItem value="archive" className="text-white font-mono">Archive</SelectItem>
                  <SelectItem value="uncategorized" className="text-white font-mono">Non Catégorisé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white font-mono">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <SelectItem value="all" className="text-white font-mono">Tous</SelectItem>
                  <SelectItem value="report" className="text-white font-mono">Rapport</SelectItem>
                  <SelectItem value="analysis" className="text-white font-mono">Analyse</SelectItem>
                  <SelectItem value="briefing" className="text-white font-mono">Briefing</SelectItem>
                  <SelectItem value="alert" className="text-white font-mono">Alerte</SelectItem>
                  <SelectItem value="code" className="text-white font-mono">Code</SelectItem>
                  <SelectItem value="generic" className="text-white font-mono">Générique/Upload</SelectItem>
                </SelectContent>
              </Select>

              <TagFilter
                tags={availableTags}
                selectedTags={selectedTags}
                onChange={setSelectedTags}
              />

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-[#2a2a2a] border-[#3a3a3a] text-white font-mono">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-[#3a3a3a]">
                    <SelectItem value="generation_date" className="text-white font-mono">Date</SelectItem>
                    <SelectItem value="title" className="text-white font-mono">Titre</SelectItem>
                    <SelectItem value="access_count" className="text-white font-mono">Accès</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="border-[#3a3a3a] text-[#a0a0a0] hover:text-white"
                >
                  {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

          {/* Compteur de résultats */}
          <div className="text-xs text-[#a0a0a0] font-mono">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
            {documents.length !== filteredDocuments.length && (
              <span> sur {documents.length}</span>
            )}
          </div>
        </div>

        {/* Liste des documents */}
        <div className="flex-1 overflow-y-auto">
          <DocumentList
            documents={filteredDocuments}
            onSelect={setSelectedDocument}
            selectedId={selectedDocument?.id}
            onToggleFavorite={toggleFavorite}
            onDelete={deleteDocument}
            loading={loading}
          />
        </div>
      </div>

      {/* Colonne de droite : Création/Visualisation */}
      <div className="flex-1 h-full">
        <FileCreationView
          onUploadClick={handleUploadClick}
          onCreateDocument={handleCreateDocument}
          uploading={uploading}
          selectedDocument={selectedDocument}
          onUpdate={updateDocument}
          onDelete={deleteDocument}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.py,.js,.html,.css,.json,.md"
        />
      </div>
    </div>
  );
}

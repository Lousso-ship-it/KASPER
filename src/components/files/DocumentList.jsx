
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, Shield, AlertTriangle, Download, Star, StarOff, Trash2, FileCode } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function DocumentList({ documents, onSelect, selectedId, onToggleFavorite, onDelete, loading }) {
    
    const getTypeIcon = (type) => {
        switch (type) {
          case 'report': return FileText;
          case 'analysis': return FileText;
          case 'briefing': return FileText;
          case 'alert': return FileText;
          case 'code': return FileCode;
          default: return FileText;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
          case 'code': return 'text-green-400';
          default: return 'text-blue-400';
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    if (loading) {
        return (
            <div className="p-4 text-center">
                <div className="w-6 h-6 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-xs text-[#a0a0a0] font-mono">Chargement...</p>
            </div>
        );
    }

    if (!documents || documents.length === 0) {
        return (
            <div className="p-4 text-center text-[#a0a0a0] font-mono">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Aucun document trouvé.</p>
            </div>
        );
    }

    return (
        <div className="p-2 space-y-1">
            {documents.map(doc => {
                const TypeIcon = getTypeIcon(doc.type);
                const isSelected = doc.id === selectedId;

                return (
                    <div 
                        key={doc.id}
                        className={`group relative p-3 rounded-md cursor-pointer transition-all duration-200 border ${
                            isSelected 
                                ? 'bg-[#ff6b35]/20 border-[#ff6b35]/50' 
                                : 'border-transparent hover:bg-[#3a3a3a]/50 hover:border-[#3a3a3a]'
                        }`}
                    >
                        {/* Contenu principal */}
                        <div className="flex items-start gap-3" onClick={() => onSelect(doc)}>
                            <TypeIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getTypeColor(doc.type)}`} />
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-medium text-white font-mono truncate">{doc.title}</p>
                                    {doc.is_favorite && <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-[#a0a0a0] font-mono">
                                        {doc.generation_date 
                                            ? formatDistanceToNow(new Date(doc.generation_date), { addSuffix: true, locale: fr }) 
                                            : 'Date inconnue'
                                        }
                                    </p>
                                    {doc.file_size && (
                                        <p className="text-xs text-[#a0a0a0] font-mono">
                                            {formatFileSize(doc.file_size)}
                                        </p>
                                    )}
                                    {doc.description && (
                                        <p className="text-xs text-[#a0a0a0] font-mono line-clamp-2">
                                            {doc.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions (visibles au hover) */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(doc);
                                }}
                                className="h-6 w-6 text-[#a0a0a0] hover:text-yellow-400"
                            >
                                {doc.is_favorite ? <Star className="w-3 h-3 fill-current" /> : <StarOff className="w-3 h-3" />}
                            </Button>
                            
                            {doc.file_url && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(doc.file_url, '_blank');
                                    }}
                                    className="h-6 w-6 text-[#a0a0a0] hover:text-blue-400"
                                >
                                    <Download className="w-3 h-3" />
                                </Button>
                            )}
                            
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
                                        onDelete(doc.id);
                                    }
                                }}
                                className="h-6 w-6 text-[#a0a0a0] hover:text-red-400"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

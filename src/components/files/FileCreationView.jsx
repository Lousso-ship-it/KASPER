
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, FileCode, Upload, Loader2, Slash } from 'lucide-react';
import StrategicGlobe3D from '../common/StrategicGlobe3D';
import DocumentViewer from './DocumentViewer';

const documentTypes = [
    { 
        type: 'report', 
        icon: FileText, 
        label: 'Document', 
        color: 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10'
    },
    { 
        type: 'code', 
        icon: FileCode, 
        label: 'Code', 
        color: 'text-green-400 border-green-500/30 hover:bg-green-500/10'
    }
];

export default function FileCreationView({ onUploadClick, onCreateDocument, uploading, selectedDocument, onUpdate, onDelete }) {
    
    // Si un document est sélectionné, afficher le visualiseur
    if (selectedDocument) {
        return <DocumentViewer document={selectedDocument} onUpdate={onUpdate} onDelete={onDelete} />;
    }

    return (
        <div className="h-full flex flex-col p-8">
            {/* Globe repositionné en haut */}
            <div className="h-80 w-full max-w-lg mx-auto mt-8 mb-12">
                <StrategicGlobe3D height={320} />
            </div>
            
            {/* Zone de création centrée */}
            <div className="flex-1 flex flex-col items-center justify-start space-y-8 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-3">
                    <h2 className="text-xl font-bold text-white font-mono">
                        Créer ou télécharger
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                    {documentTypes.map(({ type, icon: Icon, label, color }) => (
                        <Button
                            key={type}
                            variant="outline"
                            onClick={() => onCreateDocument(type)}
                            className={`h-24 p-6 flex flex-col gap-2 bg-[#2a2a2a] border-[#3a3a3a] transition-all duration-200 ${color}`}
                        >
                            <Icon className="w-6 h-6" />
                            <div className="font-bold text-white font-mono">{label}</div>
                        </Button>
                    ))}
                </div>

                <Button 
                    variant="outline" 
                    size="lg"
                    onClick={onUploadClick}
                    disabled={uploading}
                    className="w-full bg-[#2a2a2a] border-[#3a3a3a] hover:bg-[#3a3a3a] text-white py-6 text-lg font-mono"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            TÉLÉCHARGEMENT...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-3 h-6 w-6" />
                            TÉLÉCHARGER
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, Trash2, X, FileCode, FileText, Image as ImageIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const QuillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
};

const getMimeType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension)) return `image/${extension}`;
    if (extension === 'pdf') return 'application/pdf';
    return 'application/octet-stream';
};

export default function DocumentViewer({ document, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(document.title);
    const [content, setContent] = useState(document.content || "");
    const [language, setLanguage] = useState(document.language || "");

    useEffect(() => {
        setTitle(document.title);
        setContent(document.content || "");
        setLanguage(document.language || "");
        setIsEditing(false); 
    }, [document]);

    const handleSave = () => {
        const updatedData = { title, content };
        if (document.type === 'code') {
            updatedData.language = language;
        }
        onUpdate(document.id, updatedData);
        setIsEditing(false);
    };
    
    const renderFilePreview = () => {
        const mimeType = getMimeType(document.file_url);
        if (mimeType.startsWith('image/')) {
            return <img src={document.file_url} alt={document.title} className="max-w-full h-auto rounded-md" />;
        }
        if (mimeType === 'application/pdf') {
            return <iframe src={document.file_url} className="w-full h-[70vh] rounded-md border border-[#3a3a3a]" title={document.title}></iframe>;
        }
        return (
            <div className="text-center p-8 bg-[#1a1a1a] rounded-md">
                <p className="text-[#a0a0a0] mb-4">Aperçu non disponible pour ce type de fichier.</p>
                <Button onClick={() => window.open(document.file_url, '_blank')}>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le fichier
                </Button>
            </div>
        );
    };

    const renderEditor = () => {
        if (document.type === 'code') {
            return (
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-full p-4 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md text-white font-mono text-sm resize-none"
                    placeholder="Saisissez votre code ici..."
                />
            );
        }
        return (
            <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                modules={QuillModules}
                className="bg-white text-black h-full"
            />
        );
    };

    return (
        <Card className="tactical-card h-full flex flex-col">
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    {isEditing ? (
                        <input 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="text-xl font-bold text-white font-mono bg-transparent border-b border-dotted border-[#3a3a3a] focus:outline-none focus:border-solid"
                        />
                    ) : (
                        <CardTitle className="text-white font-mono tracking-wide text-xl">{document.title}</CardTitle>
                    )}
                    <p className="text-xs text-[#a0a0a0] font-mono mt-1">
                        Créé le {format(new Date(document.created_date), 'd MMMM yyyy', { locale: fr })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <>
                            <Button size="sm" onClick={handleSave} className="tactical-button"><Save className="w-4 h-4 mr-2" /> Enregistrer</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}><X className="w-4 h-4" /></Button>
                        </>
                    ) : (
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="border-[#3a3a3a] text-[#a0a0a0] hover:bg-[#3a3a3a] hover:text-white">
                            <Edit className="w-4 h-4 mr-2" /> Éditer
                        </Button>
                    )}
                    <Button size="icon" variant="destructive" onClick={() => onDelete(document.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 flex flex-col">
                {isEditing ? (
                    <div className="flex-1 h-full">
                        {renderEditor()}
                    </div>
                ) : (
                    document.file_url ? renderFilePreview() : (
                        <div className="prose prose-invert max-w-none text-white font-mono whitespace-pre-wrap">
                            {document.type === 'code' ? <pre><code>{content}</code></pre> : content}
                        </div>
                    )
                )}
            </CardContent>
            <CardFooter>
                 <Badge variant="outline" className="border-[#3a3a3a] bg-[#1a1a1a] text-[#a0a0a0] font-mono">{document.type}</Badge>
                 <Badge variant="outline" className="border-[#3a3a3a] bg-[#1a1a1a] text-[#a0a0a0] font-mono ml-2">{document.category}</Badge>
            </CardFooter>
        </Card>
    );
}
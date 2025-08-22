import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DocumentVersion } from '@/api/entities';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function VersionHistory({ documentId }) {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const data = await DocumentVersion.list({ document: documentId });
        setVersions(data);
      } catch (error) {
        console.error('Failed to load version history', error);
      }
    };
    fetchVersions();
  }, [documentId]);

  return (
    <Card className="tactical-card">
      <CardHeader>
        <CardTitle className="text-white font-mono text-lg">Historique des versions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-white font-mono text-sm space-y-2">
          {versions.length === 0 && <li>Aucune version archivée.</li>}
          {versions.map(v => (
            <li key={v.id}>{format(new Date(v.created_date), 'Pp', { locale: fr })}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

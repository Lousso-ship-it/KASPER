import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Database, Activity, ShieldCheck, Power, RefreshCw, Archive, BrainCircuit } from "lucide-react";

const connections = [
  { user: 'admin@kasper.ops', ip: '192.168.1.10', time: '2 MINS AGO', status: 'success' },
  { user: 'analyst@kasper.ops', ip: '88.120.45.23', time: '5 MINS AGO', status: 'success' },
  { user: 'guest@kasper.ops', ip: '201.5.89.134', time: '10 MINS AGO', status: 'failed' },
  { user: 'operator@kasper.ops', ip: '12.23.34.45', time: '12 MINS AGO', status: 'success' },
];

export default function AdminPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      
      <div>
        <h1 className="text-4xl font-bold text-white mb-2 font-mono tracking-wider">
          ADMINISTRATION
        </h1>
        <p className="text-[#a0a0a0] text-lg font-mono">
          Surveillance système, contrôle données et opérations de gestion des accès.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="tactical-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#a0a0a0] mb-1 font-mono tracking-wider uppercase">AGENTS ACTIFS</p>
              <p className="text-3xl font-bold text-white font-mono">12</p>
            </div>
            <div className="p-4 rounded-lg bg-[#ff6b35]/20 border border-[#ff6b35]/30">
              <Users className="w-8 h-8 text-[#ff6b35]" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#a0a0a0] mb-1 font-mono tracking-wider uppercase">VOLUME DONNÉES</p>
              <p className="text-3xl font-bold text-white font-mono">2.5 TB</p>
            </div>
            <div className="p-4 rounded-lg bg-[#ff6b35]/20 border border-[#ff6b35]/30">
              <Database className="w-8 h-8 text-[#ff6b35]" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#a0a0a0] mb-1 font-mono tracking-wider uppercase">APPELS API/24H</p>
              <p className="text-3xl font-bold text-white font-mono">1.2M</p>
            </div>
            <div className="p-4 rounded-lg bg-[#ff6b35]/20 border border-[#ff6b35]/30">
              <Activity className="w-8 h-8 text-[#ff6b35]" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#a0a0a0] mb-1 font-mono tracking-wider uppercase">STATUT SYSTÈME</p>
              <p className="text-3xl font-bold text-[#00ff41] font-mono">EN LIGNE</p>
            </div>
            <div className="p-4 rounded-lg bg-[#00ff41]/20 border border-[#00ff41]/30">
              <ShieldCheck className="w-8 h-8 text-[#00ff41]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="tactical-card">
            <CardHeader className="p-6">
              <CardTitle className="text-white font-mono tracking-wide text-lg">CONNEXIONS RÉCENTES</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-[1px] border-[#3a3a3a]">
                    <TableHead className="text-[#a0a0a0] font-mono text-xs tracking-wider uppercase px-6 py-3">Agent</TableHead>
                    <TableHead className="text-[#a0a0a0] font-mono text-xs tracking-wider uppercase px-6 py-3">Adresse IP</TableHead>
                    <TableHead className="text-[#a0a0a0] font-mono text-xs tracking-wider uppercase px-6 py-3">Horodatage</TableHead>
                    <TableHead className="text-[#a0a0a0] font-mono text-xs tracking-wider uppercase px-6 py-3">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.map((conn, index) => (
                    <TableRow key={index} className="border-b-[1px] border-[#3a3a3a] last:border-b-0">
                      <TableCell className="font-mono text-white px-6 py-4">{conn.user}</TableCell>
                      <TableCell className="text-[#a0a0a0] font-mono px-6 py-4">{conn.ip}</TableCell>
                      <TableCell className="text-[#a0a0a0] font-mono px-6 py-4">{conn.time}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge className={conn.status === 'success' ? 'bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 font-mono' : 'bg-red-600/20 text-red-400 border border-red-500/30 font-mono'}>
                          {conn.status === 'success' ? 'SUCCÈS' : 'ÉCHEC'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="tactical-card">
            <CardHeader className="p-6">
              <CardTitle className="text-white font-mono tracking-wide text-lg">CONTRÔLES SYSTÈME</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              <Button className="w-full justify-start gap-3 tactical-button font-mono tracking-wider text-sm h-11">
                <RefreshCw className="w-4 h-4" />
                PURGER CACHE
              </Button>
              <Button className="w-full justify-start gap-3 tactical-button font-mono tracking-wider text-sm h-11">
                <BrainCircuit className="w-4 h-4" />
                RECALC INDICES
              </Button>
              <Button className="w-full justify-start gap-3 tactical-button font-mono tracking-wider text-sm h-11">
                <Archive className="w-4 h-4" />
                SAUVEGARDE DONNÉES
              </Button>
              <Button className="w-full justify-start gap-3 bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 font-mono tracking-wider text-sm h-11">
                <Power className="w-4 h-4" />
                REDÉMARRAGE URGENCE
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
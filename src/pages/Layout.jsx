
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  BrainCircuit,
  Plus,
  Search,
  Compass,
  LayoutGrid,
  User,
  ChevronLeft,
  Monitor as MonitorIcon,
  Settings,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "../components/common/AnimatedBackground";

const mainNavItems = [
    { title: 'CHAT', href: createPageUrl('Intelligence'), icon: Search },
    { title: 'TÂCHES', href: createPageUrl('Tasks'), icon: Settings },
    { title: 'FICHIERS', href: createPageUrl('Files'), icon: LayoutGrid },
    { title: 'TERMINAL', href: createPageUrl('Terminal'), icon: TrendingUp },
    { title: 'MONITOR', href: createPageUrl('Monitor'), icon: BarChart3 },
  ];

const secondaryNavItems = [
    { title: 'EXPLORATEUR', href: createPageUrl('Explorer'), icon: Compass },
    { title: 'ADMIN', href: createPageUrl('Admin'), icon: MonitorIcon },
];

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <div className="flex h-screen w-full bg-[#1a1a1a] relative overflow-hidden">
            <AnimatedBackground />
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
                
                :root {
                  --sidebar-bg: #2a2a2a;
                  --main-bg: #1a1a1a;
                  --text-primary: #ffffff;
                  --text-secondary: #a0a0a0;
                  --border-color: #3a3a3a;
                  --hover-bg: #3a3a3a;
                  --active-bg: #ff6b35;
                  --orange-primary: #ff6b35;
                  --orange-secondary: #ff8c5a;
                }

                body, html {
                    font-family: 'JetBrains Mono', monospace;
                    background-color: var(--main-bg);
                    color: var(--text-primary);
                    font-size: 16px;
                }

                .tactical-card {
                  background: var(--sidebar-bg);
                  border: 1px solid var(--border-color);
                  color: var(--text-primary);
                  font-family: 'JetBrains Mono', monospace;
                }

                .tactical-button {
                  background: var(--orange-primary);
                  color: white;
                  font-family: 'JetBrains Mono', monospace;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }

                .tactical-button:hover {
                  background: var(--orange-secondary);
                }
            `}</style>
            
            {/* Barre latérale tactique */}
            <aside className="relative z-10 w-72 flex flex-col bg-[var(--sidebar-bg)]/95 backdrop-blur-sm text-[var(--text-secondary)] border-r border-[var(--border-color)]">
                {/* En-tête simplifié */}
                <div className="p-4 border-b border-[var(--border-color)] text-center">
                    <div className="text-[var(--orange-primary)] font-bold text-2xl tracking-wider">
                        KASPER
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1">
                        V.0.0.1
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col flex-grow p-4">
                    {/* Main Navigation */}
                    {mainNavItems.map((item, index) => {
                        const isActive = location.pathname.startsWith(item.href.split('?')[0]);
                        const isFirstItem = index === 0;
                        
                        return (
                            <Link 
                                key={item.title} 
                                to={item.href} 
                                className={`flex items-center p-3 mb-1 text-sm font-medium tracking-wide transition-all duration-200 ${
                                    isActive || (isFirstItem && location.pathname === createPageUrl(''))
                                    ? 'bg-[var(--orange-primary)] text-white' 
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}

                    {/* Separator */}
                    <div className="my-4 border-t border-[var(--border-color)]"></div>

                    {/* Secondary Navigation */}
                    {secondaryNavItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.href.split('?')[0]);
                        
                        return (
                            <Link 
                                key={item.title} 
                                to={item.href} 
                                className={`flex items-center p-3 mb-1 text-sm font-medium tracking-wide transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-[var(--orange-primary)] text-white' 
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
                
                {/* Pied de page */}
                <div className="p-4 border-t border-[var(--border-color)]">
                     <button className="flex items-center w-full p-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] hover:text-white transition-colors">
                        <div className="w-6 h-6 flex items-center justify-center rounded bg-[var(--orange-primary)] text-white mr-3">
                            <User className="w-3 h-3" />
                        </div>
                        <span className="font-medium">CONNEXION AGENT</span>
                    </button>
                </div>
            </aside>

            {/* Contenu Principal */}
            <main className="relative z-10 flex-1 overflow-y-auto bg-transparent p-4 sm:p-6 lg:p-8">
                 {children}
            </main>
        </div>
    );
}

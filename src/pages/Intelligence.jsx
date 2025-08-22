
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Terminal,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, ComposedChart } from 'recharts';
import StrategicGlobe3D from '../components/common/StrategicGlobe3D';
import { UploadFile } from "@/api/integrations";
import { Document } from "@/api/entities";
import { chat as chatAPI } from "@/api/chat";

// Données pour différentes analyses
const analysisData = {
  "ANALYSER : Trajectoire de croissance du PIB français 2027": {
    charts: [
      [
        { year: '2019', gdp: 2.6, forecast: null, confidence_high: null, confidence_low: null },
        { year: '2020', gdp: -7.9, forecast: null, confidence_high: null, confidence_low: null },
        { year: '2021', gdp: 6.8, forecast: null, confidence_high: null, confidence_low: null },
        { year: '2022', gdp: 2.5, forecast: null, confidence_high: null, confidence_low: null },
        { year: '2023', gdp: 0.9, forecast: null, confidence_high: 1.6, confidence_low: 0.8 },
        { year: '2024', gdp: null, forecast: 1.2, confidence_high: 1.6, confidence_low: 0.8 },
        { year: '2025', gdp: null, forecast: 1.4, confidence_high: 2.0, confidence_low: 0.9 },
        { year: '2026', gdp: null, forecast: 1.6, confidence_high: 2.2, confidence_low: 1.1 },
        { year: '2027', gdp: null, forecast: 1.8, confidence_high: 2.4, confidence_low: 1.3 }
      ]
    ],
    content: `## BRIEFING INTELLIGENCE - TRAJECTOIRE PIB FRANÇAIS

**CLASSIFICATION :** RESTREINT
**OPÉRATION :** PRÉVISION ÉCONOMIQUE
**CIBLE :** TRAJECTOIRE PIB FRANCE 2027

### RÉSUMÉ EXÉCUTIF

Basé sur une modélisation économétrique complète et des renseignements multi-sources, le PIB français démontre une trajectoire de récupération progressive avec une accélération de croissance soutenue jusqu'en 2027.

### ANALYSE TACTIQUE

**RÉFÉRENTIEL HISTORIQUE (2019-2023) :**
• 2019 : Croissance de base +2,6% - Stabilité pré-crise
• 2020 : Choc pandémique -7,9% - Impact confinement européen
• 2021 : Rebond de récupération +6,8% - Reprise stimulée
• 2022 : Normalisation +2,5% - Stabilisation post-pandémique
• 2023 : Décélération +0,9% - Vents contraires crise énergétique

**PROJECTIONS AVANCÉES (2024-2027) :**
• 2024 : Initiation récupération +1,2% (IC : 0,8-1,6%)
• 2025 : Construction momentum +1,4% (IC : 0,9-2,0%)
• 2026 : Expansion soutenue +1,6% (IC : 1,1-2,2%)
• **2027 : OBJECTIF ATTEINT +1,8% (IC : 1,3-2,4%)**

### MOTEURS STRATÉGIQUES

**CATALYSEURS PRIMAIRES :**
- Investissements transformation numérique (+15Md€ annuels)
- Accélération transition verte (conformité REPowerEU)
- Récupération compétitivité export (+3,2% vs 2023)
- Optimisation marché travail (objectif chômage : 6,8%)

**VECTEURS DE RISQUE :**
- Volatilité prix énergétique (résolution conflit ukrainien)
- Cycles resserrement politique monétaire BCE
- Scénarios fragmentation commerce mondial

### ÉVALUATION RENSEIGNEMENT

France positionnée pour trajectoire croissance modérée mais durable. Réformes structurelles + fonds récupération UE créent référentiel favorable. **NIVEAU CONFIANCE : ÉLEVÉ (87%)**

**NIVEAU CLASSIFICATION :** RESTREINT`
  },

  "RAPPORT : Analyse de l'inflation en zone euro": {
    charts: [
      [
        { month: 'Jan 2023', headline: 8.5, core: 5.2, energy: 17.2, food: 14.1 },
        { month: 'Avr 2023', headline: 7.0, core: 5.6, energy: 12.5, food: 13.8 },
        { month: 'Jul 2023', headline: 5.3, core: 5.1, energy: 6.1, food: 10.9 },
        { month: 'Oct 2023', headline: 2.9, core: 4.2, energy: -4.5, food: 7.8 },
        { month: 'Jan 2024', headline: 2.8, core: 3.3, energy: -6.3, food: 6.9 },
        { month: 'Avr 2024', headline: 2.4, core: 2.7, energy: -1.2, food: 4.2 }
      ]
    ],
    content: `## RAPPORT SURVEILLANCE INFLATION ZONE EURO

**CLASSIFICATION :** CONFIDENTIEL
**MISSION :** SURVEILLANCE STABILITÉ PRIX
**PÉRIMÈTRE :** 19 ÉTATS MEMBRES ZONE EURO

### RAPPORT SITUATION

L'inflation zone euro démontre une décélération contrôlée avec persistance du cœur nécessitant vigilance continue. La volatilité composante énergétique masque pressions structurelles sous-jacentes.

### ANALYSE DÉCOMPOSITION

**TRAJECTOIRE INFLATION GLOBALE :**
• Pic atteint : 10,6% (octobre 2022)
• Statut actuel : 2,4% (avril 2024)
• Approche cible : Proximité mandat BCE 2,0% atteinte
• **Évaluation tendance : EN DÉCÉLÉRATION**

**DÉCOMPOSITION COMPOSANTES :**
• **Inflation cœur (hors alimentaire, énergie) : 2,7%** - Inflation services persistante
• **Inflation énergétique : -1,2%** - Effets base + normalisation approvisionnement
• **Inflation alimentaire : 4,2%** - Résilience chaînes approvisionnement s'améliorant
• **Inflation services : 3,7%** - Répercussion coûts travail continue

### RENSEIGNEMENT TACTIQUE

**FORCES DÉSINFLATIONNISTES :**
- Normalisation chaînes approvisionnement (+15% capacité vs 2022)
- Stabilisation marché énergétique (gaz TTF -67% annuel)
- Rééquilibrage marché travail (croissance salaires modérant)
- Engagement mécanisme transmission monétaire

**RISQUES INFLATIONNISTES :**
- Rigidité secteur services (coûts logement +4,1%)
- Potentiel spirale prix-salaires (salaires négociés +4,5%)
- Persistance prime énergétique géopolitique
- Internalisation coûts transition climatique

### PERSPECTIVE STRATÉGIQUE

Transmission politique BCE démontrant efficacité. **PROBABILITÉ ATTEINTE CIBLE : 78% T4 2024**

**NIVEAU MENACE :** MODÉRÉ - DÉCÉLÉRATION CONTENUE`
  },

  "COMPARER : Performance des marchés US vs UE": {
    charts: [
      [
        { period: 'Q1 2023', us_sp500: 7.5, eu_stoxx600: 8.2, us_gdp: 2.0, eu_gdp: 0.1 },
        { period: 'Q2 2023', us_sp500: 16.9, eu_stoxx600: 12.6, us_gdp: 2.4, eu_gdp: 0.6 },
        { period: 'Q3 2023', us_sp500: 13.1, eu_stoxx600: 8.9, us_gdp: 2.1, eu_gdp: 0.1 },
        { period: 'Q4 2023', us_sp500: 24.2, eu_stoxx600: 12.9, us_gdp: 3.4, eu_gdp: 0.5 },
        { period: 'Q1 2024', us_sp500: 29.1, eu_stoxx600: 11.8, eu_gdp: 1.6, us_gdp: 0.4 }
      ]
    ],
    content: `## RENSEIGNEMENT COMPARATIF DES MARCHÉS : US vs ZONE EURO

**CLASSIFICATION :** SECRET
**OPÉRATION :** ÉVALUATION ÉCONOMIQUE TRANSATLANTIQUE
**PÉRIODE :** ANALYSE DE PERFORMANCE 2023-2024

### RÉSUMÉ EXÉCUTIF

Divergence de performance significative détectée entre les marchés américains et européens. Surperformance américaine tirée par la domination du secteur technologique et le différentiel de politique monétaire.

### MÉTRIQUES DE PERFORMANCE DU MARCHÉ

**MARCHÉS BOURSIERS (YTD 2024) :**
• **S&P 500 : +29,1%** - Expansion tirée par la technologie
• **STOXX Europe 600 : +11,8%** - Pondération sectorielle défensive
• **Écart de Performance : 17,3 points de pourcentage**
• **Analyse Sectorielle :** Tech US +45% vs Tech UE +18%

**FONDAMENTAUX ÉCONOMIQUES :**
• **Croissance PIB US : 1,6%** (T1 2024) - Résilience de la consommation
• **Croissance PIB UE : 0,4%** (T1 2024) - Vents contraires industriels
• **Écart de Productivité :** US +2,1% vs UE +0,8% annuellement

### DÉCOMPOSITION TACTIQUE

**AVANTAGES DU MARCHÉ US :**
- Leadership révolution IA/Technologie (NVIDIA +200%, Microsoft +28%)
- Optimisation du timing du pivot de la politique de la Fed
- Dividende d'indépendance énergétique (impact sur la valorisation +2T$)
- Momentum des bénéfices des entreprises (+12,5% S&P 500)

**CONTRAINTES DU MARCHÉ EUROPÉEN :**
- Coûts de transition énergétique (besoins d'investissement -180Md€)
- Frais de conformité réglementaire (impact GDPR, DSA)
- Vulnérabilité à l'exposition à la Chine (secteurs automobile, luxe)
- Durée de la position restrictive de la BCE (+150bps au-dessus de la Fed)

### RENSEIGNEMENT PROSPECTIF

**PROBABILITÉ DE CONVERGENCE :** Modérée (34%) - Les différences structurelles persistent
**RISQUE DE DURABILITÉ US :** Valorisations élevées (P/E 21x vs 15x UE)
**CATALYSEUR DE REPRISE UE :** Activation du cycle d'investissement Green Deal

### ÉVALUATION STRATÉGIQUE

Les marchés américains affichent une surperformance axée sur le momentum avec des risques de concentration. Les marchés européens démontrent un positionnement de valeur avec des vents contraires structurels.

**RECOMMANDATION TACTIQUE :** SURVEILLER LES VALORISATIONS TECHNOLOGIQUES + LE TIMING DE REPRISE UE

**NIVEAU CLASSIFICATION :** SECRET`
  },

  "ÉVALUER : Impact économique du conflit ukrainien": {
    charts: [
      [
        { sector: 'Energy', eu_impact: -12.5, global_impact: -8.2, recovery_timeline: 24 },
        { sector: 'Agriculture', eu_impact: -8.9, global_impact: -15.6, recovery_timeline: 18 },
        { sector: 'Supply Chain', eu_impact: -6.7, global_impact: -4.3, recovery_timeline: 36 },
        { sector: 'Defense', eu_impact: 15.2, global_impact: 8.9, recovery_timeline: 12 },
        { sector: 'Finance', eu_impact: -3.4, global_impact: -2.1, recovery_timeline: 12 }
      ]
    ],
    content: `## ÉVALUATION DE L'IMPACT ÉCONOMIQUE DU CONFLIT EN UKRAINE

**CLASSIFICATION :** TOP SECRET
**OPÉRATION :** ANALYSE DE GUERRE ÉCONOMIQUE
**STATUT :** SURVEILLILLANCE CONTINUE

### ÉVALUATION DE LA MENACE

Le conflit en Ukraine génère une perturbation économique systématique à travers les chaînes d'approvisionnement mondiales, les marchés de l'énergie et la stabilité financière. Les effets secondaires s'amplifient via des systèmes interconnectés.

### ANALYSE DE L'IMPACT SECTORIEL

**PERTURBATION DU SECTEUR DE L'ÉNERGIE :**
• **Crise de la Dépendance au Gaz de l'UE :** -78% de la fin de l'approvisionnement russe
• • **Volatilité des Prix :** Pic du gaz TTF +340% (mars 2022)
• • **Dommages aux Infrastructures :** Destruction d'installations énergétiques de plus de 15Md€
• • **Délai de Récupération :** 24-36 mois pour la diversification de l'approvisionnement

**CHOC D'APPROVISIONNEMENT AGRICOLE :**
• **Perturbation des Exportations de Céréales :** Ukraine/Russie 30% de l'approvisionnement mondial en blé
• • **Menace pour la Sécurité Alimentaire :** 345M de personnes à risque de faim aiguë (+47M vs pré-conflit)
• • **Transmission des Prix :** Impact maximal des prix alimentaires mondiaux +23%
• • **Corridor de la Mer Noire :** Assurance maritime +1000% de prime

**FRAGMENTATION DE LA CHAÎNE D'APPROVISIONNEMENT :**
• **Matériaux Critiques :** Palladium (-40%), gaz Néon (-70% de l'approvisionnement)
• • **Production de Semi-conducteurs :** Extension du délai de livraison de 6 mois
• • **Secteur Automobile :** Réductions de production -2,2M d'unités (UE)
• • **Complexité de la Récupération :** Reconstruction de la chaîne d'approvisionnement sur 36 mois

### STRESS DU SYSTÈME FINANCIER

**ARCHITECTURE DES SANCTIONS :**
- 300Md€ d'actifs russes gelés (coordination G7)
- Déconnexion SWIFT : 10 grandes banques russes
- Perturbation du mécanisme de paiement de l'énergie
- Interruption des flux de capitaux transfrontaliers (-45Md€/mois)

**RISQUES SYSTÉMIQUES :**
- Exposition des banques européennes : 24Md€ d'actifs russes directs
- Perturbation du financement des matières premières
- Amplification de la volatilité des devises
- Repricing du risque de crédit sur les marchés émergents

### IMPLICATIONS STRATÉGIQUES

**EFFICACITÉ DE LA GUERRE ÉCONOMIQUE :** Élevée - PIB russe -6,0% (2022)
**IMPACT EN RETOUR DE FLAMME :** Modéré - Inflation UE +4,2pp au-dessus de la ligne de base
**DURÉE :** Probabilité de scénario de conflit prolongé 67%

### PROJECTIONS PROSPECTIVES

**MEILLEUR CAS (Résolution du Conflit 2024) :**
- Normalisation énergétique : échéance de 18 mois
- Reprise agricole : échéance de 12 mois
- Inversion de l'impact sur le PIB : échéance de 24 mois

**CAS DE BASE (Conflit Prolongé) :**
- Reconfiguration permanente de la chaîne d'approvisionnement
- Cycle d'investissement dans la sécurité énergétique (+2T€ UE)
- Augmentation structurelle des dépenses de défense (+2% du PIB)

**STATUT OPÉRATIONNEL :** SURVEILLANCE ACTIVE
**NIVEAU CLASSIFICATION :** TOP SECRET`
  },

  "SURVEILLER : Impact de la volatilité crypto sur l'inflation": {
    charts: [
      [
        { month: 'Jan 2023', bitcoin: 16800, inflation: 2.8, correlation: 0.23 },
        { month: 'Apr 2023', bitcoin: 28000, inflation: 2.1, correlation: 0.31 },
        { month: 'Jul 2023', bitcoin: 30500, inflation: 1.9, correlation: 0.18 },
        { month: 'Oct 2023', bitcoin: 35200, inflation: 2.4, correlation: 0.42 },
        { month: 'Jan 2023', bitcoin: 42800, inflation: 2.6, correlation: 0.38 },
        { month: 'Apr 2024', bitcoin: 67000, inflation: 2.3, correlation: 0.29 }
      ]
    ],
    content: `## ÉVALUATION DE L'IMPACT DE LA VOLATILITÉ DU MARCHÉ CRYPTO SUR L'INFLATION

**CLASSIFICATION :** CONFIDENTIEL
**OPÉRATION :** ANALYSE MONÉTAIRE DES ACTIFS NUMÉRIQUES
**PORTÉE :** CORRÉLATION MONDIALE CRYPTOMONNAIE-INFLATION

### RÉSUMÉ EXÉCUTIF

La volatilité du marché des cryptomonnaies démontre une corrélation émergente avec la dynamique de l'inflation, en particulier dans les régions d'adoption des paiements numériques. Les mécanismes de transmission restent limités mais évoluent.

### ANALYSE DE LA CORRÉLATION DE LA VOLATILITÉ

**DYNAMIQUE DU PRIX DU BITCOIN :**
• T1 2023 : Base à 16 800 $ - Stabilisation post-FTX
• T4 2023 : Reprise à 35 200 $ - Momentum de spéculation ETF
• T2 2024 : Hausse à 67 000 $ - Accélération de l'adoption institutionnelle
• **Indice de Volatilité :** 89% (vs 21% S&P 500)

**CANAUX DE TRANSMISSION DE L'INFLATION :**
• **Impact Direct :** Minimal (<0,02% du poids de l'IPC)
• **Effet de Richesse :** Fluctuations de la capitalisation boursière de 2,1T$
• **Consommation d'Énergie :** Coûts d'électricité du minage de Bitcoin
• **Substitution de Paiement :** Taux d'adoption des monnaies numériques

### RENSEIGNEMENT TACTIQUE

**MODÈLES DE CORRÉLATION :**
- Corrélation positive : intervalle de 0,23 à 0,42 (tendance à se renforcer)
- Corrélation maximale pendant l'incertitude de la politique monétaire
- Variations régionales : Plus élevées au Salvador, au Nigeria
- L'adoption institutionnelle amplifie les liens financiers traditionnels

**VECTEURS DE RISQUE D'INFLATION :**
- Impact du secteur de l'énergie dû aux opérations de minage
- Effets sur les dépenses de consommation via la richesse crypto
- Réponses concurrentielles des monnaies numériques des banques centrales
- Perturbation du système de paiement transfrontalier

### ÉVALUATION STRATÉGIQUE

La volatilité des cryptos maintient une transmission de l'inflation limitée mais croissante. **PRIORITÉ DE SURVEILLANCE : MOYENNE**

**NIVEAU CLASSIFICATION :** CONFIDENTIEL`
  },

  "PRÉDIRE : Tendances migratoires et évolutions du marché du travail": {
    charts: [
      [
        { year: '2020', migrants: 281, labor_participation: 73.2, skill_shortage: 15 },
        { year: '2021', migrants: 295, labor_participation: 72.8, skill_shortage: 18 },
        { year: '2022', migrants: 312, labor_participation: 74.1, skill_shortage: 22 },
        { year: '2023', migrants: 328, labor_participation: 74.6, skill_shortage: 25 },
        { year: '2024', migrants: 342, labor_participation: 75.2, skill_shortage: 28 },
        { year: '2025', migrants: 358, labor_participation: 75.8, skill_shortage: 31 }
      ]
    ],
    content: `## RENSEIGNEMENT SUR LES MODÈLES DE MIGRATION ET LE MARCHÉ DU TRAVAIL

**CLASSIFICATION :** RESTREINT
**OPÉRATION :** ANALYSE DÉMOGRAPHIQUE DE LA MAIN-D'ŒUVRE
**SOURCE :** HCR, OIT, BASE DE DONNÉES SUR LA MIGRATION DE L'OCDE

### RÉSUMÉ EXÉCUTIF

Les modèles de migration mondiaux s'accélèrent avec des implications significatives sur le marché du travail. La migration basée sur les compétences augmente tandis que les déplacements induits par le climat créent de nouvelles dynamiques de main-d'œuvre.

### ANALYSE DES FLUX MIGRATOIRES

**TENDANCES MONDIALES DE DÉPLACEMENT :**
• Total 2024 : 342M de migrants internationaux (+4,1% en glissement annuel)
• Migration climatique : 48M de déplacés (2023-2024)
• Migration de compétences : 89M de travailleurs hautement qualifiés mobiles
• **Projection 2025 :** 358M de migrants au total

**INTÉGRATION AU MARCHÉ DU TRAVAIL :**
• Amélioration du taux de participation : 73,2% → 75,8%
• Secteurs en pénurie de compétences en expansion : 28% d'écarts critiques
• Impact sur les salaires : -2,3% faible qualification, +1,8% haute qualification
• **Variations régionales :** UE (+5,2M), US (+3,1M), Canada (+1,2M)

### IMPLICATIONS STRATÉGIQUES

**TRANSFORMATION DE LA MAIN-D'ŒUVRE :**
- Dépendance du secteur technologique au talent international
- Atténuation de la pénurie de travailleurs de la santé
- Stabilisation de l'offre de main-d'œuvre agricole
- Exigences en compétences pour la transition verte

**RÉPONSES POLITIQUES :**
- Expansion des systèmes d'immigration à points
- Accords de mobilité régionale (Carte Bleue UE 2.0)
- Besoins d'investissement dans les programmes d'intégration
- Prolifération des visas pour nomades numériques

### PROJECTIONS PROSPECTIVES

**SCÉNARIOS 2025-2030 :**
- Meilleur cas : Migration gérée +45M de travailleurs qualifiés
- Cas de base : Flux mixtes +52M de déplacements totaux
- Cas de stress : Migration climatique +78M de mouvements d'urgence

**NIVEAU DE CONFIANCE :** ÉLEVÉ (84%)
**NIVEAU CLASSIFICATION :** RESTREINT`
  },

  "ÉVALUER : Effets de la transition énergétique sur le commerce": {
    charts: [
      [
        { sector: 'Fossil Fuels', trade_2020: 2100, trade_2024: 1650, trade_2030: 950 },
        { sector: 'Renewable Tech', trade_2020: 180, trade_2024: 420, trade_2030: 890 },
        { sector: 'Critical Minerals', trade_2020: 95, trade_2024: 165, trade_2030: 340 },
        { sector: 'Green Hydrogen', trade_2020: 2, trade_2024: 18, trade_2030: 85 },
        { sector: 'Carbon Credits', trade_2020: 12, trade_2024: 45, trade_2030: 120 }
      ]
    ],
    content: `## ÉVALUATION DE L'IMPACT DE LA TRANSITION ÉNERGÉTIQUE SUR LE COMMERCE

**CLASSIFICATION :** SECRET
**OPÉRATION :** TRANSFORMATION DU COMMERCE VERT
**SOURCES :** AIE, OMC, BASE DE DONNÉES OMC SUR LE COMMERCE DE L'ÉNERGIE

### RÉSUMÉ EXÉCUTIF

La transition énergétique remodèle fondamentalement les modèles de commerce mondial. Le commerce des combustibles fossiles diminue tandis que les flux de technologies renouvelables et de minéraux critiques augmentent de manière exponentielle.

### TRANSFORMATION DES FLUX COMMERCIAUX

**DÉCLIN DES COMBUSTIBLES FOSSILES :**
• Référence 2020 : 2,1T$ de commerce mondial de combustibles fossiles
• Actuel 2024 : 1,65T$ (baisse structurelle de -21%)
• Projection 2030 : 950Md$ (baisse de -55% vs référence)
• **Actifs échoués :** 450Md$ d'infrastructures pétrolières

**HAUSSE DES TECHNOLOGIES VERTES :**
• Commerce de technologies renouvelables : +133% (2020-2024)
• Minéraux critiques : +74% lithium, +89% cobalt
• Émergence de l'hydrogène vert : 2Md$ → 85Md$ (2030)
• **Concentration de la chaîne d'approvisionnement :** Chine 67% solaire, 45% batteries

### IMPLICATIONS GÉOPOLITIQUES

**CHANGEMENTS DES ROUTES COMMERCIALES :**
- Transport arctique : Nouveaux corridors de GNL
- Ceinture et Route 2.0 : Accent sur les infrastructures vertes
- Découplage US-Chine : Concurrence sur les technologies propres
- Green Deal UE : Ajustements carbone aux frontières

**VULNÉRABILITÉS DE DÉPENDANCE :**
- Risques de monopolisation des terres rares
- Fragilité de la chaîne d'approvisionnement des semi-conducteurs
- Goulots d'étranglement technologiques de stockage d'énergie
- Pénuries de matériaux pour les infrastructures de réseau

### ÉVALUATION STRATÉGIQUE

La transition énergétique crée de nouvelles dépendances commerciales tout en éliminant les traditionnelles. **PRIORITÉ DE SÉCURITÉ : CRITIQUE**

**NIVEAU CLASSIFICATION :** SECRET`
  }
};

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [conversation, setConversation] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const getFileType = (mimeType) => {
    if (mimeType.startsWith('image/')) return 'generic';
    if (mimeType.includes('pdf')) return 'generic';
    if (mimeType.includes('text/plain') || mimeType.includes('csv')) return 'text';
    return 'generic';
  };

  const getFileFormat = (filename) => filename.split('.').pop().toLowerCase();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    try {
      const uploadResult = await UploadFile({ file });
      if (uploadResult.file_url) {
        const newDoc = {
          title: file.name,
          type: getFileType(file.type),
          category: "uncategorized",
          description: `Fichier téléchargé: ${file.name}`,
          file_url: uploadResult.file_url,
          file_size: file.size,
          file_format: getFileFormat(file.name),
          source: "Upload chat",
          generation_date: new Date().toISOString()
        };
        await Document.create(newDoc);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleSearch = async (queryText = query) => {
    if (!queryText.trim()) return;

    setIsSearching(true);
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: queryText
    };

    setConversation((prev) => [...prev, userMessage]);
    setQuery('');
    try {
      const apiRes = await chatAPI(queryText);
      const analysisKey = Object.keys(analysisData).find((key) =>
        queryText.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(queryText.toLowerCase())
      );
      const response = {
        id: Date.now() + 1,
        type: 'assistant',
        content: apiRes?.content || (analysisKey ? analysisData[analysisKey].content : generateGenericResponse(queryText)),
        charts: apiRes?.charts || (analysisKey ? analysisData[analysisKey].charts : null)
      };
      setConversation((prev) => [...prev, response]);
    } catch (error) {
      console.error("Chat error:", error);
      const response = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateGenericResponse(queryText),
        charts: null
      };
      setConversation((prev) => [...prev, response]);
    } finally {
      setIsSearching(false);
    }
  };

  const generateGenericResponse = (query) => {
    return `## BRIEFING INTELLIGENCE

**CLASSIFICATION :** CONFIDENTIEL
**SOURCE :** Analyse multi-agences
**DATE :** ${new Date().toLocaleDateString('fr-FR')}
**REQUÊTE :** ${query}

### RÉSUMÉ EXÉCUTIF

Évaluation renseignement initiée pour analyse demandée. Évaluation complète des sources de données disponibles et implications stratégiques en cours de révision.

### CONCLUSIONS PRÉLIMINAIRES

Basé sur les capacités actuelles de collecte de renseignements, l'évaluation initiale indique une confiance modérée dans la disponibilité des données pour le périmètre d'analyse demandé.

**FACTEURS CLÉS IDENTIFIÉS :**
- Corrélation données multi-sources en cours
- Réseaux renseignement régionaux activés
- Cadre évaluation impact stratégique déployé
- Paramètres analyse temporelle établis

### STATUT OPÉRATIONNEL

**COLLECTE RENSEIGNEMENT :** ACTIVE
**NIVEAU CONFIANCE :** MODÉRÉ (73%)
**PROCHAINE MISE À JOUR :** 24 HEURES

**NIVEAU CLASSIFICATION :** RESTREINT`;
  };

  const renderChart = (chartData, title = "VISUALISATION DE L'ANALYSE") => {
    if (!chartData || !chartData.length) return null;

    const firstItem = chartData[0];
    // eslint-disable-next-line no-unused-vars
    const keys = Object.keys(firstItem).filter((key) => key !== 'year' && key !== 'month' && key !== 'period' && key !== 'sector');

    // Different chart types based on data structure
    if (firstItem.forecast !== undefined) {
      // GDP trajectory with forecasts
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">{title}</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="year" fontSize={14} stroke="#a0a0a0" />
                <YAxis fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="gdp" stroke="#ff6b35" strokeWidth={3} name="PIB Historique (%)" connectNulls={false} />
                <Line type="monotone" dataKey="forecast" stroke="#4ade80" strokeWidth={3} strokeDasharray="5 5" name="Prévision (%)" connectNulls={false} />
                <Area type="monotone" dataKey="confidence_high" stackId="1" stroke="none" fill="#4ade80" fillOpacity={0.1} connectNulls={false} />
                <Area type="monotone" dataKey="confidence_low" stackId="1" stroke="none" fill="#4ade80" fillOpacity={0.1} connectNulls={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.headline !== undefined) {
      // Inflation components
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">ANALYSE DES COMPOSANTES DE L'INFLATION</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="month" fontSize={14} stroke="#a0a0a0" />
                <YAxis fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Line type="monotone" dataKey="headline" stroke="#ff6b35" strokeWidth={3} name="Globale (%)" />
                <Line type="monotone" dataKey="core" stroke="#4ade80" strokeWidth={2} name="Cœur (%)" />
                <Line type="monotone" dataKey="energy" stroke="#f59e0b" strokeWidth={2} name="Énergie (%)" />
                <Line type="monotone" dataKey="food" stroke="#8b5cf6" strokeWidth={2} name="Alimentaire (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.us_sp500 !== undefined) {
      // Market comparison
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">PERFORMANCE DES MARCHÉS US vs UE</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="period" fontSize={14} stroke="#a0a0a0" />
                <YAxis fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="us_sp500" fill="#ff6b35" name="S&P 500 (%)" />
                <Bar dataKey="eu_stoxx600" fill="#4ade80" name="STOXX 600 (%)" />
                <Line type="monotone" dataKey="us_gdp" stroke="#f59e0b" strokeWidth={2} name="PIB US (%)" />
                <Line type="monotone" dataKey="eu_gdp" stroke="#8b5cf6" strokeWidth={2} name="PIB UE (%)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.eu_impact !== undefined) {
      // Sector impact analysis
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">ÉVALUATION DE L'IMPACT SECTORIEL</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={chartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis type="number" fontSize={14} stroke="#a0a0a0" />
                <YAxis dataKey="sector" type="category" fontSize={14} stroke="#a0a0a0" width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="eu_impact" fill="#ff6b35" name="Impact UE (%)" />
                <Bar dataKey="global_impact" fill="#4ade80" name="Impact Mondial (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.bitcoin !== undefined) {
      // Crypto correlation analysis
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">CORRÉLATION CRYPTO-INFLATION</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="month" fontSize={14} stroke="#a0a0a0" />
                <YAxis yAxisId="left" fontSize={14} stroke="#a0a0a0" />
                <YAxis yAxisId="right" orientation="right" fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Bar yAxisId="left" dataKey="bitcoin" fill="#f59e0b" name="Prix Bitcoin ($)" />
                <Line yAxisId="right" type="monotone" dataKey="inflation" stroke="#ff6b35" strokeWidth={3} name="Inflation (%)" />
                <Line yAxisId="right" type="monotone" dataKey="correlation" stroke="#4ade80" strokeWidth={2} name="Corrélation" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.migrants !== undefined) {
      // Migration and labor analysis
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">TENDANCES MIGRATOIRES & TRAVAIL</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="year" fontSize={14} stroke="#a0a0a0" />
                <YAxis yAxisId="left" fontSize={14} stroke="#a0a0a0" />
                <YAxis yAxisId="right" orientation="right" fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Bar yAxisId="left" dataKey="migrants" fill="#8b5cf6" name="Migrants (M)" />
                <Line yAxisId="right" type="monotone" dataKey="labor_participation" stroke="#4ade80" strokeWidth={3} name="Participation Travail (%)" />
                <Line yAxisId="right" type="monotone" dataKey="skill_shortage" stroke="#ff6b35" strokeWidth={2} name="Pénurie Compétences (%)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>);

    } else if (firstItem.trade_2020 !== undefined) {
      // Energy trade transformation
      return (
        <div className="mt-10 p-6 bg-[#1a1a1a] rounded-lg border border-[#3a3a3a]">
          <h4 className="text-[#a0a0a0] font-bold mb-6 font-mono text-base uppercase tracking-wider">TRANSFORMATION DU COMMERCE D'ÉNERGIE</h4>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(160, 160, 160, 0.2)" />
                <XAxis dataKey="sector" fontSize={12} stroke="#a0a0a0" angle={-45} textAnchor="end" height={80} />
                <YAxis fontSize={14} stroke="#a0a0a0" />
                <Tooltip contentStyle={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', fontFamily: 'JetBrains Mono' }} />
                <Bar dataKey="trade_2020" fill="#a0a0a0" name="2020 (Md$)" />
                <Bar dataKey="trade_2024" fill="#ff6b35" name="2024 (Md$)" />
                <Bar dataKey="trade_2030" fill="#4ade80" name="Proj. 2030 (Md$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>);

    }

    return null;
  };

  return (
    <div
      className="relative h-full"
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 border-2 border-dashed border-[#ff6b35] text-white font-mono pointer-events-none">
          {isUploading ? 'Téléchargement...' : 'Déposez le fichier pour l\'uploader'}
        </div>
      )}
      <div className="h-full flex flex-col">
      {conversation.length === 0 ? (
        // Interface d'accueil simplifiée
        <div className="flex-1 flex flex-col justify-center items-center space-y-10 max-w-5xl mx-auto px-6">
          
          <div className="h-80 w-full">
             <StrategicGlobe3D height={320} />
          </div>

          <div className="text-center space-y-4 -mt-12 relative z-10">
            <h1 className="text-[120px] font-bold text-white tracking-wider font-mono">KASPER</h1>
            <p className="text-[#a0a0a0] text-lg font-mono">
              Interrogez, analysez et découvrez des insights exploitables
            </p>
          </div>

          {/* Interface de recherche */}
          <div className="w-full max-w-3xl relative">
            <Terminal className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#a0a0a0] w-6 h-6" />
            <Input
              ref={inputRef}
              placeholder="Saisissez votre requête de renseignement..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-16 pr-16 h-16 text-xl bg-[#2a2a2a] border-[#3a3a3a] focus:border-[#ff6b35] text-white font-mono"
            />
            <Button
              onClick={() => handleSearch()}
              disabled={!query.trim() || isSearching}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 tactical-button h-12 w-12 p-0">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        // Mode conversation
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-8 px-6 py-8">
            {conversation.map((message) => (
              <div key={message.id}>
                {message.type === 'user' ? (
                  <div className="flex justify-end">
                    <div className="bg-[#ff6b35] text-white px-6 py-4 max-w-4xl font-mono">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Card className="tactical-card max-w-none">
                      <CardContent className="p-8">
                        <div className="whitespace-pre-wrap text-white font-mono leading-relaxed">
                          {message.content}
                        </div>
                        {message.charts && message.charts.map((chartData, index) =>
                          renderChart(chartData, `VISUALISATION ${index + 1}`)
                        )}
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#3a3a3a]">
                          <div className="flex gap-3">
                            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-green-400 font-mono">
                              <ThumbsUp className="w-4 h-4 mr-2" /> Bon
                            </Button>
                            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-red-400 font-mono">
                              <ThumbsDown className="w-4 h-4 mr-2" /> Mauvais
                            </Button>
                            <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-white font-mono">
                              <Copy className="w-4 h-4 mr-2" /> Copier
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#a0a0a0] hover:text-white font-mono">
                            <Share2 className="w-4 h-4 mr-2" /> Partager
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
            {isSearching && (
              <Card className="tactical-card">
                <CardContent className="p-8 flex items-center gap-4">
                  <div className="w-6 h-6 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[#a0a0a0] font-mono">TRAITEMENT RENSEIGNEMENT...</span>
                </CardContent>
              </Card>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Barre de recherche fixe */}
          <div className="border-t border-[#3a3a3a] p-4">
            <div className="relative max-w-4xl mx-auto">
              <Input
                placeholder="Continuer l'analyse..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-6 pr-16 h-12 bg-[#2a2a2a] border-[#3a3a3a] focus:border-[#ff6b35] text-white font-mono"
              />
              <Button
                onClick={() => handleSearch()}
                disabled={!query.trim() || isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 tactical-button h-8 w-8 p-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

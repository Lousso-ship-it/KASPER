import Layout from "./Layout.jsx";

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const Intelligence = lazy(() => import('./Intelligence'));
const Admin = lazy(() => import('./Admin'));
const SocioDemographic = lazy(() => import('./SocioDemographic'));
const Economic = lazy(() => import('./Economic'));
const Financial = lazy(() => import('./Financial'));
const Markets = lazy(() => import('./Markets'));
const News = lazy(() => import('./News'));
const Tasks = lazy(() => import('./Tasks'));
const Files = lazy(() => import('./Files'));
const Exploration = lazy(() => import('./Exploration'));
const Monitor = lazy(() => import('./Monitor'));
const Dashboard = lazy(() => import('./Dashboard'));
const Exchange = lazy(() => import('./Exchange'));

const PAGES = {

    Intelligence: Intelligence,

    Admin: Admin,

    SocioDemographic: SocioDemographic,

    Economic: Economic,

    Financial: Financial,

    Markets: Markets,

    News: News,

    Exploration: Exploration,

    Tasks: Tasks,

    Files: Files,

    Exchange: Exchange,

    Monitor: Monitor,
    Dashboard: Dashboard,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Intelligence />} />
                    <Route path="/Intelligence" element={<Intelligence />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/SocioDemographic" element={<SocioDemographic />} />
                    <Route path="/Economic" element={<Economic />} />
                    <Route path="/Financial" element={<Financial />} />
                    <Route path="/Markets" element={<Markets />} />
                    <Route path="/News" element={<News />} />
                    <Route path="/Exploration" element={<Exploration />} />
                    <Route path="/Tasks" element={<Tasks />} />
                    <Route path="/Files" element={<Files />} />
                    <Route path="/Exchange" element={<Exchange />} />
                    <Route path="/Monitor" element={<Monitor />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
import Layout from "./Layout.jsx";

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

const PAGES = {
    Intelligence: lazy(() => import('./Intelligence')),
    Admin: lazy(() => import('./Admin')),
    SocioDemographic: lazy(() => import('./SocioDemographic')),
    Economic: lazy(() => import('./Economic')),
    Financial: lazy(() => import('./Financial')),
    Markets: lazy(() => import('./Markets')),
    News: lazy(() => import('./News')),
    Explorer: lazy(() => import('./Explorer')),
    Tasks: lazy(() => import('./Tasks')),
    Files: lazy(() => import('./Files')),
    Terminal: lazy(() => import('./Terminal')),
    Monitor: lazy(() => import('./Monitor')),
    Dashboard: lazy(() => import('./Dashboard')),
};

function useCurrentPage() {
    const { pathname } = useLocation();
    const segment = pathname.split('/').filter(Boolean)[0] || '';
    const match = Object.keys(PAGES).find(
        page => page.toLowerCase() === segment.toLowerCase()
    );
    return match || Object.keys(PAGES)[0];
}

function PagesContent() {
    const currentPage = useCurrentPage();
    const defaultPage = Object.keys(PAGES)[0];

    return (
        <Layout currentPageName={currentPage}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {Object.entries(PAGES).map(([name, Component]) => (
                        <Route key={name} path={`/${name}`} element={<Component />} />
                    ))}
                    <Route
                        path="/"
                        element={<Navigate to={`/${defaultPage}`} replace />}
                    />
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

import Layout from "./Layout.jsx";

import Intelligence from "./Intelligence";

import Admin from "./Admin";

import SocioDemographic from "./SocioDemographic";

import Economic from "./Economic";

import Financial from "./Financial";

import Markets from "./Markets";

import News from "./News";

import Explorer from "./Explorer";

import Tasks from "./Tasks";

import Files from "./Files";

import Terminal from "./Terminal";
import Monitor from "./Monitor";
import Dashboard from "./Dashboard";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Intelligence: Intelligence,
    
    Admin: Admin,
    
    SocioDemographic: SocioDemographic,
    
    Economic: Economic,
    
    Financial: Financial,
    
    Markets: Markets,
    
    News: News,
    
    Explorer: Explorer,
    
    Tasks: Tasks,
    
    Files: Files,
    
    Terminal: Terminal,
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
            <Routes>            
                
                    <Route path="/" element={<Intelligence />} />
                
                
                <Route path="/Intelligence" element={<Intelligence />} />
                
                <Route path="/Admin" element={<Admin />} />
                
                <Route path="/SocioDemographic" element={<SocioDemographic />} />
                
                <Route path="/Economic" element={<Economic />} />
                
                <Route path="/Financial" element={<Financial />} />
                
                <Route path="/Markets" element={<Markets />} />
                
                <Route path="/News" element={<News />} />
                
                <Route path="/Explorer" element={<Explorer />} />
                
                <Route path="/Tasks" element={<Tasks />} />
                
                <Route path="/Files" element={<Files />} />
                
                <Route path="/Terminal" element={<Terminal />} />
                <Route path="/Monitor" element={<Monitor />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                
            </Routes>
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
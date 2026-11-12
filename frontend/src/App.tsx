
import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Overview from "./pages/Overview";
import LiveMonitor from "./pages/LiveMonitor";
import VisitorHistory from "./pages/VisitorHistory";
import SecurityEvents from "./pages/SecurityEvents";
import EvidenceGallery from "./pages/EvidenceGallery";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./App.css";

const pageRoutes: Record<string, string> = {
  Overview: "/",
  "Live Monitor": "/live-monitor",
  "Visitor History": "/visitor-history",
  "Security Events": "/security-events",
  "Evidence Gallery": "/evidence-gallery",
  Reports: "/reports",
  Settings: "/settings",
};

const routePages: Record<string, string> = Object.fromEntries(
  Object.entries(pageRoutes).map(([page, path]) => [path, page])
);


function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const activePage = routePages[location.pathname] ?? "Overview";

  const handleNavigate = (page: string) => {
    const path = pageRoutes[page];

    if (path) {
      navigate(path);
    }

    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`sidebar-container ${sidebarOpen ? "sidebar-open" : ""}`}>
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
        />
      </div>

      <main className="main-layout">
        <Header
          pageTitle={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/live-monitor" element={<LiveMonitor />} />
          <Route path="/visitor-history" element={<VisitorHistory />} />
          <Route path="/security-events" element={<SecurityEvents />} />
          <Route path="/evidence-gallery" element={<EvidenceGallery />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;


import {
  LayoutDashboard,
  Camera,
  Users,
  ShieldAlert,
  Images,
  ChartNoAxesCombined,
  Settings,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Live Monitor", icon: Camera },
  { label: "Visitor History", icon: Users },
  { label: "Security Events", icon: ShieldAlert },
  { label: "Evidence Gallery", icon: Images },
  { label: "Reports", icon: ChartNoAxesCombined },
];

type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

export default function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <ShieldCheck size={21} />
        </div>
        <div>
          <h2>SentinelAI</h2>
          <span>SMART SECURITY</span>
        </div>
      </div>

      <div className="workspace">
        <div className="workspace-avatar">S</div>
        <div className="workspace-info">
          <strong>Home Security</strong>
          <span>Personal workspace</span>
        </div>
        <ChevronDown size={16} className="muted-icon" />
      </div>

      <p className="nav-heading">PLATFORM</p>

      <nav className="nav-list">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.label;

          return (
            <button
              key={item.label}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => onNavigate(item.label)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <p className="nav-heading">PREFERENCES</p>
        <button
          className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => onNavigate("Settings")}
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <div className="sidebar-footer">
          <div className="footer-status">
            <span className="status-dot" />
            System operational
          </div>
          <span>SentinelAI v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}

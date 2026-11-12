
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

type HeaderProps = {
  pageTitle: string;
  onMenuClick: () => void;
};

export default function Header({
  pageTitle,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="top-header">
      <button
        className="mobile-menu"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>

      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <strong>{pageTitle}</strong>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search dashboard"
          />
          <kbd>⌘ K</kbd>
        </div>

        <button
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <div className="profile">
          <div className="profile-avatar">R</div>

          <div className="profile-info">
            <strong>Owner</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}

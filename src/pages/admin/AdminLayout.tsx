import React, { useState, useEffect } from 'react';
import './main-dashboard.css';
import { MetaDashboard } from './MetaDashboard';
import { BlogDashboard } from './BlogDashboard';
import { SettingsDashboard } from './SettingsDashboard';
import {
  Layers,
  Sparkles,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Search,
} from 'lucide-react';

interface AdminLayoutProps {
  initialTab?: 'meta' | 'blogs' | 'settings';
  onNavigate?: (route: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ initialTab = 'meta', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'blogs' | 'settings'>(initialTab);
  const [username, setUsername] = useState('Admin');

  // Authenticate on mount
  useEffect(() => {
    const token = localStorage.getItem('revlytics_admin_token');
    if (!token) {
      if (onNavigate) onNavigate('login');
      else window.location.href = '/login';
      return;
    }

    const user = localStorage.getItem('revlytics_admin_user');
    if (user) setUsername(user);

    async function verifyAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = (await res.json()) as any;
          if (data.username) setUsername(data.username);
        }
      } catch (e) {
        console.warn('Auth check fallback:', e);
      }
    }
    verifyAuth();
  }, [onNavigate]);

  const handleLogout = () => {
    localStorage.removeItem('revlytics_admin_token');
    localStorage.removeItem('revlytics_admin_user');
    if (onNavigate) onNavigate('login');
    else window.location.href = '/login';
  };

  return (
    <div className="admin-shell">
      {/* Top Navigation Bar */}
      <header className="admin-header">
        {/* Brand */}
        <div className="admin-brand">
          <div className="admin-brand-icon">
            R
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="admin-brand-title">Revlytics</span>
            <span className="admin-badge admin-badge-purple">Admin D1</span>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'meta' ? 'active' : ''}`}
            onClick={() => setActiveTab('meta')}
          >
            <Search size={14} /> Page Meta & Services
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
            onClick={() => setActiveTab('blogs')}
          >
            <BookOpen size={14} /> Blogs & AI Studio
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={14} /> Settings
          </button>
        </div>

        {/* Right Actions */}
        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-pill-link"
          >
            <ExternalLink size={13} /> View Website
          </a>

          <div className="admin-user-tag">
            <div className="admin-status-dot" />
            <span>{username}</span>
          </div>

          <button
            onClick={handleLogout}
            className="admin-logout-btn"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="admin-main">
        {activeTab === 'meta' && <MetaDashboard />}
        {activeTab === 'blogs' && <BlogDashboard />}
        {activeTab === 'settings' && <SettingsDashboard />}
      </main>
    </div>
  );
};

export default AdminLayout;

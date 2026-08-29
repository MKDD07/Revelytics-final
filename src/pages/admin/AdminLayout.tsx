import React, { useState, useEffect } from 'react';
import { MetaDashboard } from './MetaDashboard';
import { BlogDashboard } from './BlogDashboard';
import { SettingsDashboard } from './SettingsDashboard';
import { TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/input';
import {
  Layers,
  Sparkles,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Database,
  Search,
} from 'lucide-react';

interface AdminLayoutProps {
  initialTab?: 'meta' | 'blogs' | 'settings';
  onNavigate?: (route: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ initialTab = 'meta', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'blogs' | 'settings'>(initialTab);
  const [username, setUsername] = useState('Admin');
  const [hasGroq, setHasGroq] = useState(false);

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
          setHasGroq(!!data.hasGroqKey);
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation Bar */}
      <header
        style={{
          height: '68px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(12, 12, 16, 0.95)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >
        {/* Brand & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              R
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Revlytics
              </span>
              <span style={{ fontSize: '12px', color: '#818cf8', fontWeight: 500, marginLeft: '6px' }}>
                Admin
              </span>
            </div>
          </div>

          <Badge variant="purple" style={{ fontSize: '10px' }}>
            Cloudflare D1 & Groq AI
          </Badge>
        </div>

        {/* Center Tabs */}
        <TabsList>
          <TabsTrigger
            active={activeTab === 'meta'}
            onClick={() => setActiveTab('meta')}
          >
            <Search size={14} /> Page Meta & Services
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === 'blogs'}
            onClick={() => setActiveTab('blogs')}
          >
            <BookOpen size={14} /> Blogs & AI Studio
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={14} /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#a1a1aa',
              textDecoration: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.15s ease',
            }}
          >
            <ExternalLink size={12} /> View Live Website
          </a>

          <div
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#d4d4d8',
              backgroundColor: '#18181b',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#4ade80' }} />
            <span>{username}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            style={{ color: '#f87171', padding: '6px 10px' }}
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px', maxWidth: '1440px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {activeTab === 'meta' && <MetaDashboard />}
        {activeTab === 'blogs' && <BlogDashboard />}
        {activeTab === 'settings' && <SettingsDashboard />}
      </main>
    </div>
  );
};

export default AdminLayout;

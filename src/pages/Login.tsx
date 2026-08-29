import React, { useState } from 'react';
import './admin/main-dashboard.css';
import { Lock, User, Key, Sparkles, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: () => void;
  onNavigate?: (route: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showGroqSetup, setShowGroqSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (showGroqSetup && groqKey) {
        try {
          const res = await fetch('/api/auth/setup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, groqApiKey: groqKey }),
          });
          let data: any = null;
          try {
            data = await res.json();
          } catch {
            data = null;
          }
          if (data && data.success) {
            localStorage.setItem('revlytics_admin_token', data.token || 'admin_token');
            localStorage.setItem('revlytics_admin_user', data.username || username);
            setSuccessMsg('Admin credentials & Groq API key saved!');
            setTimeout(() => {
              if (onLoginSuccess) onLoginSuccess();
              else if (onNavigate) onNavigate('admin');
              else window.location.href = '/admin';
            }, 500);
            return;
          }
        } catch {
          // Continue to fallback
        }
      }

      let resData: any = null;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        try {
          resData = await res.json();
        } catch {
          resData = null;
        }
      } catch {
        resData = null;
      }

      if (resData && resData.success && resData.token) {
        localStorage.setItem('revlytics_admin_token', resData.token);
        localStorage.setItem('revlytics_admin_user', resData.username || username);
        setSuccessMsg('Authentication successful. Redirecting...');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
        }, 500);
        return;
      }

      // Master fallback check if running in local dev without worker or offline DB
      if (username === 'admin' && password === 'revlytics2026!') {
        localStorage.setItem('revlytics_admin_token', 'temp_master_token');
        localStorage.setItem('revlytics_admin_user', 'admin');
        setSuccessMsg('Signed in successfully.');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
        }, 500);
        return;
      }

      throw new Error(resData?.error || 'Invalid credentials. (Default: admin / revlytics2026!)');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-root" style={{ alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            className="icon-tile icon-tile--indigo"
            style={{ width: '48px', height: '48px', margin: '0 auto 12px', borderRadius: '12px' }}
          >
            <ShieldCheck size={24} />
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 500, color: 'var(--color-text)', margin: '0 0 4px' }}>
            Revlytics Admin Portal
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--color-text-faint)', margin: 0 }}>
            Cloudflare D1 Database & Groq AI Content Studio
          </p>
        </div>

        {/* Card */}
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Sign In</h2>
            <p className="card__description">
              Manage SEO metadata for all pages and generate AI blogs using Groq API.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="card__content stack-4">
              {error && (
                <div className="alert alert--error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="alert alert--success">
                  <CheckCircle2 size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="field">
                <label className="field__label">Username</label>
                <div className="search-field">
                  <User size={14} />
                  <input
                    type="text"
                    className="input input--sm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="field__label">Password</label>
                <div className="search-field">
                  <Lock size={14} />
                  <input
                    type="password"
                    className="input input--sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                </div>
              </div>

              {/* Optional Groq API Key Setup */}
              <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  onClick={() => setShowGroqSetup(!showGroqSetup)}
                  className="btn btn--ghost btn--sm"
                  style={{ padding: '4px 0', color: 'var(--color-indigo-text)', fontSize: '12px' }}
                >
                  <Sparkles size={13} />
                  <span>{showGroqSetup ? 'Hide Groq API Key Setup' : '+ Setup / Update Groq API Key (Optional)'}</span>
                </button>

                {showGroqSetup && (
                  <div className="field" style={{ marginTop: '10px' }}>
                    <label className="field__label">Groq API Key (`gsk_...`)</label>
                    <div className="search-field">
                      <Key size={14} color="var(--color-indigo-text)" />
                      <input
                        type="password"
                        className="input input--sm input--mono"
                        value={groqKey}
                        onChange={(e) => setGroqKey(e.target.value)}
                        placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                      />
                    </div>
                    <span className="field__hint">
                      Saved securely in Cloudflare D1 `credentials` table.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="card__footer" style={{ flexDirection: 'column', gap: '12px' }}>
              <button
                type="submit"
                className="btn btn--primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? <span className="btn__spinner" /> : null}
                <span>Sign In to Dashboard</span>
                <ArrowRight size={14} />
              </button>

              <p style={{ fontSize: '11px', color: 'var(--color-text-faint)', margin: 0, textAlign: 'center' }}>
                Default: <code className="text-mono">admin</code> / <code className="text-mono">revlytics2026!</code>
              </p>
            </div>
          </form>
        </div>

        {/* Back to website */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
              else window.location.href = '/';
            }}
            className="link"
            style={{ fontSize: '12px', color: 'var(--color-text-faint)', textDecoration: 'none' }}
          >
            ← Back to Revlytics Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
